export type GenerationStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'FAILED';

export interface GenerationSession {
    id: string;
    shopId: number;
    status: GenerationStatus;
    currentStep: string;
    errorMessage?: string;
    createdAt: Date;
    updatedAt: Date;
}
