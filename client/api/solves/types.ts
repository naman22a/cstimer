export enum Status {
    OK,
    PLUS2,
    DNF
}

export enum PuzzleType {
    THREE,
    TWO,
    FOUR,
    FIVE,
    SIX,
    SEVEN
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
