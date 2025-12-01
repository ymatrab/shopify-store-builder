import { Router } from 'express';
import { GenerationController } from '../controllers/generationController';
import { GenerateStoreService } from '../domain/services/generateStoreService';
import { DiscoveryAgent } from '../agents/discoveryAgent';
import { PlannerAgent } from '../agents/plannerAgent';
import { ImplementationAgent } from '../agents/implementationAgent';
import { GenerationSessionRepository } from '../infra/db/generationSessionRepository';
import { BlueprintRepository } from '../infra/db/blueprintRepository';
import { ShopRepository } from '../infra/db/shopRepository';
import { ShopifyClientFactory } from '../shopify/shopifyClientFactory';
import { ShopifyShopService } from '../shopify/shopifyShopService';
import { ShopifyProductService } from '../shopify/shopifyProductService';
import { ShopifyThemeService } from '../shopify/shopifyThemeService';
import { ShopifyNavigationService } from '../shopify/shopifyNavigationService';
import { LlmClient } from '../infra/llm/llmClient';

// Dependency Injection Wiring (Manual for v1)
const shopRepo = new ShopRepository();
const sessionRepo = new GenerationSessionRepository();
const blueprintRepo = new BlueprintRepository();
const clientFactory = new ShopifyClientFactory(shopRepo);

const shopService = new ShopifyShopService(clientFactory);
const productService = new ShopifyProductService(clientFactory);
const themeService = new ShopifyThemeService(clientFactory);
const navService = new ShopifyNavigationService(clientFactory);

const discoveryAgent = new DiscoveryAgent(shopService, productService, themeService, navService);
const llmClient = new LlmClient();
const plannerAgent = new PlannerAgent(llmClient);
const implementationAgent = new ImplementationAgent(themeService, navService);

const generateStoreService = new GenerateStoreService(
    discoveryAgent,
    plannerAgent,
    implementationAgent,
    sessionRepo,
    blueprintRepo,
    shopRepo
);

const controller = new GenerationController(generateStoreService);

const router = Router();

router.post('/generation', controller.startGeneration);
router.get('/generation/:id', controller.getGenerationStatus);

export default router;
