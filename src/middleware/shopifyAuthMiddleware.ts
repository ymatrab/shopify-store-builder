import { Request, Response, NextFunction } from 'express';

export const shopifyAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Stub: In a real app, verify session token from header (Authorization: Bearer <token>)
    // and extract shop domain.

    // For v1 development, we'll hardcode a test shop domain or extract from a header if provided for testing.
    const testShopDomain = req.headers['x-test-shop-domain'] as string || 'test-shop.myshopify.com';

    (req as any).shopDomain = testShopDomain;

    console.log(`[Auth] Authenticated request for shop: ${testShopDomain}`);
    next();
};
