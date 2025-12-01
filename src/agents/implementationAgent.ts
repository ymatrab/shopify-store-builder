import { ShopifyThemeService } from '../shopify/shopifyThemeService';
import { ShopifyNavigationService } from '../shopify/shopifyNavigationService';
import { StoreBlueprint } from '../domain/models/storeBlueprint';
import { DiscoveryOutput } from '../domain/models/discoveryTypes';

export interface ImplementationResult {
    newThemeId: number;
    previewUrl: string;
}

export class ImplementationAgent {
    constructor(
        private themeService: ShopifyThemeService,
        private navService: ShopifyNavigationService,
    ) { }

    async run(args: {
        shopId: number;
        blueprint: StoreBlueprint;
        discovery: DiscoveryOutput;
    }): Promise<ImplementationResult> {
        const { shopId, blueprint, discovery } = args;

        // 1. Pick base theme
        const baseThemeId = discovery.themeInfo.liveThemeId || 0; // Fallback or use a known ID

        // 2. Duplicate theme
        const newThemeId = await this.themeService.duplicateTheme(shopId, baseThemeId);

        // 3. Merge settings
        const currentSettings = await this.themeService.getSettingsData(shopId, newThemeId);
        // TODO: Deep merge logic here using blueprint.designLayoutPlan.designSystem
        // For now, just a log
        console.log('Merging design system into settings...', blueprint.designLayoutPlan.designSystem);
        await this.themeService.updateSettingsData(shopId, newThemeId, currentSettings);

        // 4. Build templates/index.json
        const homeLayout = blueprint.designLayoutPlan.layouts['home'];
        if (homeLayout) {
            // Construct Shopify template JSON structure
            const templateJson = {
                sections: {},
                order: [] as string[]
            };

            // ... logic to populate sections from homeLayout ...
            // For v1 stub:
            console.log('Building home template from layout...', homeLayout);

            await this.themeService.updateTemplate(shopId, newThemeId, 'templates/index.json', templateJson);
        }

        // 6. Update navigation
        await this.navService.updateMainMenu(shopId, blueprint.iaPlan.navigationPlan);

        // 7. Return result
        // Assuming we can construct a preview URL. In reality, it might need a shop domain.
        const previewUrl = `/?preview_theme_id=${newThemeId}`;

        return {
            newThemeId,
            previewUrl,
        };
    }
}
