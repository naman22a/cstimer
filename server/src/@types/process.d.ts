declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT: string;
            DATABASE_URL: string;
            SESSION_SECRET: string;
            WEBSITE_DOMAIN: string;
            REDIS_URL: string;
            COOKIE_DOMAIN: string;
        }
    }
}

export {};
