import { Router } from 'express';
import generationRoutes from './generationRoutes';

const router = Router();

router.use('/api', generationRoutes);

export default router;
