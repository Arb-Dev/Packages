import { Pool, PoolConfig } from 'pg';

export { Pool, QueryResult } from 'pg';

/**
 * Creates a pg connection pool from a DATABASE_URL. Automatically enables
 * SSL with self-signed cert support when the URL contains "supabase" or
 * when DB_SSL=true is set — both common for Supabase hosted databases.
 */
export function createPool(connectionString: string, config?: Partial<PoolConfig>): Pool {
  const ssl =
    connectionString.includes('supabase') || process.env.DB_SSL === 'true'
      ? { rejectUnauthorized: false }
      : undefined;

  return new Pool({ connectionString, ssl, ...config });
}
