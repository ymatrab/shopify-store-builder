import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { shopifyAuthMiddleware } from './middleware/shopifyAuthMiddleware';
import { errorMiddleware } from './middleware/errorMiddleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Apply Auth Middleware to API routes
app.use('/api', shopifyAuthMiddleware);

// Mount Routes
app.use(routes);

// Error Handling
app.use(errorMiddleware);

export default app;
