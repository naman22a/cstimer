export interface ISession {
    id: number;
    name: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export type Session = ISession | null;
export type Sessions = ISession[] | null;
