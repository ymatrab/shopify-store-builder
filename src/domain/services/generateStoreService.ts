import { DiscoveryAgent } from '../../agents/discoveryAgent';
import { PlannerAgent } from '../../agents/plannerAgent';
import { ImplementationAgent } from '../../agents/implementationAgent';
import { GenerationSessionRepository } from '../../infra/db/generationSessionRepository';
import { BlueprintRepository } from '../../infra/db/blueprintRepository';
import { ShopRepository } from '../../infra/db/shopRepository';
import { UserInputs } from '../models/userInputs';
import { GenerationSession } from '../models/generationSession';

export class GenerateStoreService {
    constructor(
        private discoveryAgent: DiscoveryAgent,
        private plannerAgent: PlannerAgent,
        private implementationAgent: ImplementationAgent,
        private sessionRepo: GenerationSessionRepository,
        private blueprintRepo: BlueprintRepository,
        private shopRepo: ShopRepository
    ) { }

    async startGeneration(shopDomain: string, inputs: UserInputs): Promise<{ generationId: string }> {
        // 1. Resolve shop
        const shop = await this.shopRepo.getShopByDomain(shopDomain);
        if (!shop) {
            throw new Error(`Shop not found for domain: ${shopDomain}`);
        }

        // 2. Create session
        const session = await this.sessionRepo.createSession(shop.id);

        // 3. Start async process (fire and forget from API perspective, but we await here for simplicity in v1 or use setImmediate)
        // In a real production app, this would be a background job (BullMQ, etc.)
        this.runGenerationFlow(session.id, shop.id, inputs).catch(err => {
            console.error('Generation failed', err);
            this.sessionRepo.updateSession(session.id, {
                status: 'FAILED',
                currentStep: 'ERROR',
                errorMessage: err.message
            });
        });

        return { generationId: session.id };
    }

    private async runGenerationFlow(sessionId: string, shopId: number, inputs: UserInputs) {
        try {
            // Step: Discovery
            await this.sessionRepo.updateSession(sessionId, { currentStep: 'DISCOVERY' });
            const discoveryOutput = await this.discoveryAgent.run(shopId);

            // Step: Planner
            await this.sessionRepo.updateSession(sessionId, { currentStep: 'PLANNER' });
            const blueprint = await this.plannerAgent.run({ userInputs: inputs, discovery: discoveryOutput });
            await this.blueprintRepo.saveBlueprint(sessionId, blueprint);

            // Step: Implementation
            await this.sessionRepo.updateSession(sessionId, { currentStep: 'IMPLEMENTATION' });
            const result = await this.implementationAgent.run({ shopId, blueprint, discovery: discoveryOutput });

            // Done
            await this.sessionRepo.updateSession(sessionId, {
                status: 'DONE',
                currentStep: 'DONE',
            });

            // We might want to store the previewUrl somewhere, e.g., in the session or a separate result table.
            // For now, we'll assume it's retrieved dynamically or stored in a generic field if we added one.
            console.log('Generation complete. Preview URL:', result.previewUrl);

        } catch (error: any) {
            console.error('Error in generation flow:', error);
            await this.sessionRepo.updateSession(sessionId, {
                status: 'FAILED',
                currentStep: 'ERROR',
                errorMessage: error.message
            });
        }
    }

    async getGenerationStatus(id: string): Promise<GenerationSession & { previewUrl?: string }> {
        const session = await this.sessionRepo.getSessionById(id);
        if (!session) {
            throw new Error('Session not found');
        }

        // In v1, we don't persist previewUrl in DB, but let's pretend or return null
        return {
            ...session,
            previewUrl: session.status === 'DONE' ? '/?preview_theme_id=987654321' : undefined // Mock
        };
    }
}
