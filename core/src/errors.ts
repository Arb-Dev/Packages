export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number = 400,
    public readonly code: string = 'ERROR',
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const notFound = (msg: string) => new AppError(msg, 404, 'NOT_FOUND');
export const conflict = (msg: string) => new AppError(msg, 409, 'CONFLICT');
export const invalid  = (msg: string) => new AppError(msg, 400, 'VALIDATION_ERROR');
