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

const puzzleTypeObject = [
    {
        length: 15,
        range: [1, 6],
        type: '2x2'
    },
    {
        length: 25,
        range: [1, 6],
        type: '3x3'
    },
    {
        length: 30,
        range: [1, 12],
        type: '4x4'
    },
    {
        length: 35,
        range: [1, 12],
        type: '5x5'
    },
    {
        length: 40,
        range: [1, 18],
        type: '6x6'
    },
    {
        length: 45,
        range: [1, 18],
        type: '7x7'
    }
];

export let puzzleTypeMap = new Map();

for (const puzzleObj of puzzleTypeObject) {
    puzzleTypeMap.set(puzzleObj.type, puzzleObj);
}
