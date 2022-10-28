import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { PuzzleType, Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FindSolveOptions {
    userId: number;
    sessionId: number;
}

export class CreateSolveDto {
    @ApiProperty({
        example: '12.03',
        description: 'The time of the new solve',
    })
    @IsNotEmpty()
    time: string;

    @ApiProperty({
        example:
            "F' D' B2 R' D' U' L' R L2 B' R F R B' R D F D L F' U' B2 L2 R' L'",
        description: 'The time of the new solve',
    })
    @IsNotEmpty()
    scramble: string;

    @ApiProperty({
        example: 'OK | PLUS2 | DNF',
        description: 'The status of the new solve',
    })
    @IsOptional()
    @IsEnum(Status)
    status?: Status;

    @ApiProperty({
        example: 'THREE | TWO | FOUR | FIVE | SIX | SEVEN ',
        description: 'The puzzle type of the new solve',
    })
    @IsOptional()
    @IsEnum(PuzzleType)
    puzzleType?: PuzzleType;
}

export class DeleteSolveOptions extends FindSolveOptions {
    id: number;
}

export interface CreateSolveOptions extends CreateSolveDto, FindSolveOptions {}

export class UpdateSolveDto {
    @ApiProperty({
        example: 'OK | PLUS2 | DNF',
        description: 'The updated status of the solve',
    })
    @IsEnum(Status)
    status: Status;
}

export interface UpdateSolveOptions extends UpdateSolveDto, FindSolveOptions {}
