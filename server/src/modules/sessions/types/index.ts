import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export interface FindOneByIdOptions {
    id: number;
    userId: number;
}

export class CreateSessionDto {
    @ApiProperty({
        example: 'cfop',
        description: 'The name of the session',
    })
    @IsNotEmpty()
    name: string;
}

export interface DeleteOneByIdOptions {
    id: number;
    userId: number;
}

export class RenameSessionDto {
    @ApiProperty({
        example: 'roux',
        description: 'The new name of the session',
    })
    @IsNotEmpty()
    name: string;
}

export interface RenameOneByIdOptions {
    id: number;
    name: string;
}
