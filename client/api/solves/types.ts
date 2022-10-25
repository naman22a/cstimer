export enum Status {
    OK = 'OK',
    PLUS2 = 'PLUS2',
    DNF = 'DNF'
}

export enum PuzzleType {
    THREE = 'THREE',
    TWO = 'TWO',
    FOUR = 'FOUR',
    FIVE = 'FIVE',
    SIX = 'SIX',
    SEVEN = 'SEVEN'
}

export interface Solve {
    id: number;
    time: string;
    scramble: string;
    status: Status;
    puzzleType: PuzzleType;
    userId: number;
    sessionId: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSolveDto {
    time: string;
    scramble: string;
    status?: any;
    puzzleType?: any;
}
