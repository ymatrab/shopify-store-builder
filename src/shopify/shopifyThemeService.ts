import { ShopifyClientFactory } from './shopifyClientFactory';
import { ThemeInfo } from '../domain/models/discoveryTypes';

export class ShopifyThemeService {
    constructor(private clientFactory: ShopifyClientFactory) { }

    async getThemeInfo(shopId: number): Promise<ThemeInfo> {
        const client = await this.clientFactory.createRestClient(shopId);

        // Stub: Fetch themes via REST API
        // const themes = await client.get({ path: 'themes' });

        return {
            liveThemeId: 123456789,
            baseTheme: 'dawn',
        };
    }

    async duplicateTheme(shopId: number, baseThemeId: number): Promise<number> {
        const client = await this.clientFactory.createRestClient(shopId);

        // Stub: POST /themes.json with { theme: { name: "AI Generated", role: "unpublished", src: "..." } }
        // For now, return a fake new theme ID
        return 987654321;
    }

    async getSettingsData(shopId: number, themeId: number): Promise<any> {
        // Stub: Fetch assets/settings_data.json
        return {
            current: {
                colors_solid_button_labels: "#ffffff",
                colors_accent_1: "#121212"
            }
        };
    }

    async updateSettingsData(shopId: number, themeId: number, newSettings: any): Promise<void> {
        // Stub: PUT assets/settings_data.json
        console.log(`Updating settings for theme ${themeId}`, newSettings);
    }

    async getTemplate(shopId: number, themeId: number, templatePath: string): Promise<any> {
        // Stub: Fetch templates/index.json
        return {
            sections: {},
            order: []
        };
    }

    async updateTemplate(shopId: number, themeId: number, templatePath: string, json: any): Promise<void> {
        // Stub: PUT templates/index.json
        console.log(`Updating template ${templatePath} for theme ${themeId}`, json);
    }
}
