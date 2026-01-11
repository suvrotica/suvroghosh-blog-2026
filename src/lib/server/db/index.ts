import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { building } from '$app/environment';

// Initialize with a placeholder or null if building and env is missing
// to prevent build-time crashes for static assets.
let client;

if (!building) {
    // Runtime check: Crash only if we are actually running the server
    if (!env.POSTGRES_URL) {
        throw new Error('POSTGRES_URL is not set in environment variables');
    }
    client = postgres(env.POSTGRES_URL);
} else {
    // Build time check: Mock client to allow static generation to pass
    client = postgres({ 
        host: 'localhost',
        port: 5432 
    });
}

export const db = drizzle(client, { schema });
