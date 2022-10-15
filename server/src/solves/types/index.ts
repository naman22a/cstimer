import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { PuzzleType, Status } from '@prisma/client';

export class FindSolveOptions {
    userId: number;
    sessionId: number;
}

export class CreateSolveDto {
    @IsNotEmpty()
    time: string;

    @IsNotEmpty()
    scramble: string;

    @IsOptional()
    @IsEnum(Status)
    status?: Status;

    @IsOptional()
    @IsEnum(PuzzleType)
    puzzleType?: PuzzleType;
}

export class DeleteSolveOptions extends FindSolveOptions {
    id: number;
}

export interface CreateSolveOptions extends CreateSolveDto, FindSolveOptions {}

export class UpdateSolveDto {
    @IsEnum(Status)
    status: Status;
}

export interface UpdateSolveOptions extends UpdateSolveDto, FindSolveOptions {}
