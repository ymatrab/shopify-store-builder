import { ShopifyClientFactory } from './shopifyClientFactory';
import { CatalogProfile } from '../domain/models/discoveryTypes';

export class ShopifyProductService {
    constructor(private clientFactory: ShopifyClientFactory) { }

    async getCatalogProfile(shopId: number): Promise<CatalogProfile> {
        const client = await this.clientFactory.createClient(shopId);

        // Stub implementation: Query products to analyze catalog
        // const response = await client.query({ data: `{ products(first: 10) { edges { node { tags totalInventory } } } }` });

        return {
            numProducts: 10,
            hasImages: true,
            mainTags: ['t-shirts', 'accessories'],
        };
    }
}
