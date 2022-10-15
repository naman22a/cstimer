import { Test, TestingModule } from '@nestjs/testing';
import { SolvesController } from './solves.controller';

describe('SolvesController', () => {
    let controller: SolvesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SolvesController],
        }).compile();

        controller = module.get<SolvesController>(SolvesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
