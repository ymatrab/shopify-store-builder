import prisma from './prismaClient';
import { StoreBlueprint } from '../../domain/models/storeBlueprint';

export class BlueprintRepository {
    async saveBlueprint(generationId: string, blueprint: StoreBlueprint): Promise<void> {
        await prisma.storeBlueprint.create({
            data: {
                generationId,
                data: blueprint as any, // Prisma Json type
            },
        });
    }

    async getBlueprint(generationId: string): Promise<StoreBlueprint | null> {
        const record = await prisma.storeBlueprint.findUnique({
            where: { generationId },
        });
        if (!record) return null;
        return record.data as unknown as StoreBlueprint;
    }
}
