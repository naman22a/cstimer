export interface IUser {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export type User = IUser | null;
