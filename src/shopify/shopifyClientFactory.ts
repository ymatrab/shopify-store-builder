import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION, Session } from '@shopify/shopify-api';
import { ShopRepository } from '../infra/db/shopRepository';

const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY || 'test_key',
    apiSecretKey: process.env.SHOPIFY_API_SECRET || 'test_secret',
    scopes: (process.env.SHOPIFY_SCOPES || '').split(','),
    hostName: (process.env.SHOPIFY_APP_URL || '').replace(/https?:\/\//, ''),
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: true,
});

export class ShopifyClientFactory {
    constructor(private shopRepository: ShopRepository) { }

    async createClient(shopId: number) {
        const shop = await this.shopRepository.getShopById(shopId);
        if (!shop) {
            throw new Error(`Shop with ID ${shopId} not found`);
        }

        const session = new Session({
            id: `offline_${shop.shopDomain}`,
            shop: shop.shopDomain,
            state: 'state',
            isOnline: false,
            accessToken: shop.accessToken,
        });

        return new shopify.clients.Graphql({ session });
    }

    // Helper for REST client if needed
    async createRestClient(shopId: number) {
        const shop = await this.shopRepository.getShopById(shopId);
        if (!shop) {
            throw new Error(`Shop with ID ${shopId} not found`);
        }

        const session = new Session({
            id: `offline_${shop.shopDomain}`,
            shop: shop.shopDomain,
            state: 'state',
            isOnline: false,
            accessToken: shop.accessToken,
        });

        return new shopify.clients.Rest({ session });
    }
}
