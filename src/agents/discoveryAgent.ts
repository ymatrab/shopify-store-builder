import { ShopifyShopService } from '../shopify/shopifyShopService';
import { ShopifyProductService } from '../shopify/shopifyProductService';
import { ShopifyThemeService } from '../shopify/shopifyThemeService';
import { ShopifyNavigationService } from '../shopify/shopifyNavigationService';
import { DiscoveryOutput } from '../domain/models/discoveryTypes';

export class DiscoveryAgent {
    constructor(
        private shopService: ShopifyShopService,
        private productService: ShopifyProductService,
        private themeService: ShopifyThemeService,
        private navService: ShopifyNavigationService
    ) { }

    async run(shopId: number): Promise<DiscoveryOutput> {
        const shopInfo = await this.shopService.getShopInfo(shopId);
        const catalogProfile = await this.productService.getCatalogProfile(shopId);
        const themeInfo = await this.themeService.getThemeInfo(shopId);
        const navigationSnapshot = await this.navService.getMainMenu(shopId);

        return { shopInfo, catalogProfile, themeInfo, navigationSnapshot };
    }
}
