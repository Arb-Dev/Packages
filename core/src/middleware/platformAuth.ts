import { Request, Response, NextFunction } from 'express';

/**
 * Reads the headers injected by Traefik's ForwardAuth and attaches a
 * PlatformUser to req.user. Two kinds of caller are supported:
 *  - a logged-in session: X-User-Id, X-User-Email, X-Roles
 *  - an API-key caller (script/service): X-Client-Id, X-Client-Roles
 *    (no email — req.user.email is set to '')
 *
 * Bypassed automatically in test environments (NODE_ENV=test) or when
 * SKIP_PLATFORM_AUTH=true — a default dev user is set so route handlers
 * work without the platform running locally.
 */
export function platformAuth(req: Request, res: Response, next: NextFunction): void {
  const skip =
    process.env.NODE_ENV === 'test' ||
    process.env.SKIP_PLATFORM_AUTH === 'true';

  if (skip) {
    req.user = {
      userId: (req.headers['x-user-id'] as string) || 'dev-user',
      email:  (req.headers['x-user-email'] as string) || 'dev@local',
      roles:  ((req.headers['x-roles'] as string) || 'admin').split(',').filter(Boolean),
    };
    return next();
  }

  const userId = req.headers['x-user-id'] as string;
  const email  = req.headers['x-user-email'] as string;
  const roles  = req.headers['x-roles'] as string;

  if (userId && email) {
    req.user = {
      userId,
      email,
      roles: roles ? roles.split(',').filter(Boolean) : [],
    };
    return next();
  }

  const clientId    = req.headers['x-client-id'] as string;
  const clientRoles = req.headers['x-client-roles'] as string;

  if (clientId) {
    req.user = {
      userId: clientId,
      email: '',
      roles: clientRoles ? clientRoles.split(',').filter(Boolean) : [],
    };
    return next();
  }

  res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Request not authenticated by platform' } });
}

/**
 * Middleware factory. Rejects requests where req.user does not have at least
 * one of the specified roles.
 */
export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Unauthenticated' } });
      return;
    }
    if (!roles.some(r => req.user!.roles.includes(r))) {
      res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } });
      return;
    }
    next();
  };
}
