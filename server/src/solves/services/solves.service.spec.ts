import { Test, TestingModule } from '@nestjs/testing';
import { SolvesService } from './solves.service';

describe('SolvesService', () => {
    let service: SolvesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SolvesService],
        }).compile();

        service = module.get<SolvesService>(SolvesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
