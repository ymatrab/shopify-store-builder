import { ShopifyClientFactory } from './shopifyClientFactory';
import { ShopInfo } from '../domain/models/discoveryTypes';

export class ShopifyShopService {
    constructor(private clientFactory: ShopifyClientFactory) { }

    async getShopInfo(shopId: number): Promise<ShopInfo> {
        const client = await this.clientFactory.createClient(shopId);

        // Stub implementation: In a real app, query the Shop object via GraphQL
        // const response = await client.query({ data: `{ shop { name currencyCode primaryDomain { url } } }` });

        // Returning mock data for v1 scaffolding
        return {
            name: 'Test Shop',
            currency: 'USD',
            locale: 'en',
        };
    }
}
