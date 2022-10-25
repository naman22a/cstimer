import { Variants } from 'framer-motion';
import { PuzzleType } from '../api/solves/types';

export const notationMatrix = [
    ['U', "U'", 'U2'],
    ['D', "D'", 'D2'],
    ['R', "R'", 'R2'],
    ['L', "L'", 'L2'],
    ['F', "F'", 'F2'],
    ['B', "B'", 'B2'],
    ['Uw', "Uw'", 'Uw2'],
    ['Dw', "Dw'", 'Dw2'],
    ['Rw', "Rw'", 'Rw2'],
    ['Lw', "Lw'", 'Lw2'],
    ['Fw', "Fw'", 'Fw2'],
    ['Bw', "Bw'", 'Bw2'],
    ['3Uw', "3Uw'", '3Uw2'],
    ['3Dw', "3Dw'", '3Dw2'],
    ['3Rw', "3Rw'", '3Rw2'],
    ['3Lw', "3Lw'", '3Lw2'],
    ['3Fw', "3Fw'", '3Fw2'],
    ['3Bw', "3Bw'", '3Bw2']
] as const;

const puzzleTypeObject: {
    length: number;
    range: [number, number];
    type: PuzzleType;
}[] = [
    {
        length: 15,
        range: [1, 6],
        type: PuzzleType.TWO
    },
    {
        length: 25,
        range: [1, 6],
        type: PuzzleType.THREE
    },
    {
        length: 30,
        range: [1, 12],
        type: PuzzleType.FOUR
    },
    {
        length: 35,
        range: [1, 12],
        type: PuzzleType.FIVE
    },
    {
        length: 40,
        range: [1, 18],
        type: PuzzleType.SIX
    },
    {
        length: 45,
        range: [1, 18],
        type: PuzzleType.SEVEN
    }
];

export let puzzleTypeMap = new Map<
    PuzzleType,
    {
        length: number;
        range: [number, number];
        type: PuzzleType;
    }
>();

for (const puzzleObj of puzzleTypeObject) {
    puzzleTypeMap.set(puzzleObj.type, puzzleObj);
}

// animations
export const fade: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.1
        }
    },
    exit: {
        opacity: 0
    }
};
