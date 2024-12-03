import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        let retries = 5;
        while (retries) {
            try {
                await this.$connect();
                break;
            } catch (error) {
                console.error(error);
                retries--;
                console.log('left:', retries);
                // sleep for 5 secs
                await new Promise((resolve) => setTimeout(resolve, 5000));
            }
        }
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
