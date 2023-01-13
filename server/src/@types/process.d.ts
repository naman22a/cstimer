declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT: string;
            DATABASE_URL: string;
            SESSION_SECRET: string;
            CORS_ORIGIN: string;
            REDIS_URL: string;
            COOKIE_DOMAIN: string;
        }
    }
}

export {};
