import prisma from './prismaClient';
import { GenerationSession, GenerationStatus } from '../../domain/models/generationSession';

export class GenerationSessionRepository {
    async createSession(shopId: number): Promise<GenerationSession> {
        const session = await prisma.generationSession.create({
            data: {
                shopId,
                status: 'IN_PROGRESS',
                currentStep: 'STARTED',
            },
        });
        return session as unknown as GenerationSession;
    }

    async updateSession(id: string, data: Partial<GenerationSession>): Promise<GenerationSession> {
        const session = await prisma.generationSession.update({
            where: { id },
            data: {
                status: data.status,
                currentStep: data.currentStep,
                errorMessage: data.errorMessage,
            },
        });
        return session as unknown as GenerationSession;
    }

    async getSessionById(id: string): Promise<GenerationSession | null> {
        const session = await prisma.generationSession.findUnique({
            where: { id },
        });
        return session as unknown as GenerationSession | null;
    }
}
