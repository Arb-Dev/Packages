import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';

/**
 * Express error handler. Handles AppError instances and PostgreSQL constraint
 * violations; falls back to 500 for everything else.
 *
 * Response shape: { error: { code, message } }
 */
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    res.status(err.status).json({ error: { code: err.code, message: err.message } });
    return;
  }

  if (typeof err === 'object' && err !== null && (err as Record<string, unknown>)['code'] === '23505') {
    res.status(409).json({ error: { code: 'CONFLICT', message: 'A record with that value already exists' } });
    return;
  }

  console.error(err);
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } });
}
