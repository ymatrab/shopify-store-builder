import { Request, Response, NextFunction } from 'express';
import { GenerateStoreService } from '../domain/services/generateStoreService';
import { UserInputs } from '../domain/models/userInputs';

export class GenerationController {
    constructor(private generateStoreService: GenerateStoreService) { }

    startGeneration = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const inputs: UserInputs = req.body.inputs;
            // Assume shopDomain is attached to req by auth middleware
            const shopDomain = (req as any).shopDomain;

            if (!shopDomain) {
                res.status(401).json({ error: 'Unauthorized: Shop domain missing' });
                return;
            }

            const result = await this.generateStoreService.startGeneration(shopDomain, inputs);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    };

    getGenerationStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const status = await this.generateStoreService.getGenerationStatus(id);
            res.json(status);
        } catch (error) {
            next(error);
        }
    };
}
