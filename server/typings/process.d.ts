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
            GITHUB_CLIENT_ID: string;
            GITHUB_CLIENT_SECRET: string;
            SERVER_URL: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
        }
    }
}

export {};
