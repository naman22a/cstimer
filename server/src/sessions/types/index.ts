import { IsNotEmpty } from 'class-validator';

export interface FindOneByIdOptions {
    id: number;
    userId: number;
}

export class CreateSessionDto {
    @IsNotEmpty()
    name: string;
}

export interface DeleteOneByIdOptions {
    id: number;
    userId: number;
}

export class RenameSessionDto {
    @IsNotEmpty()
    name: string;
}

export interface RenameOneByIdOptions {
    id: number;
    name: string;
}
