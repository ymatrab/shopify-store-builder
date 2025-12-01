import prisma from './prismaClient';

export class ShopRepository {
    async getShopByDomain(shopDomain: string) {
        return prisma.shop.findUnique({
            where: { shopDomain },
        });
    }

    async getShopById(id: number) {
        return prisma.shop.findUnique({
            where: { id },
        });
    }

    async createOrUpdateShop(shopDomain: string, accessToken: string) {
        return prisma.shop.upsert({
            where: { shopDomain },
            update: { accessToken },
            create: { shopDomain, accessToken },
        });
    }
}
