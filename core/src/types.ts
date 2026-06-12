export interface PlatformUser {
  userId: string;
  email: string;
  roles: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: PlatformUser;
    }
  }
}
