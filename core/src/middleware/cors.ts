import { Request, Response, NextFunction } from 'express';

export function cors(req: Request, res: Response, next: NextFunction): void {
  const requestOrigin = req.headers.origin as string | undefined;
  const allowed = process.env.CORS_ORIGIN;

  // Allow if origin matches CORS_ORIGIN, or permissively in non-production dev.
  if (requestOrigin && (requestOrigin === allowed || (!allowed && process.env.NODE_ENV !== 'production'))) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-source');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.status(204).end();
    return;
  }

  next();
}
