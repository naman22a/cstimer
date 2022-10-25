import { FieldError } from '../api/types';
import toast from 'react-hot-toast';
import { PuzzleType } from '../api/solves/types';
import { notationMatrix, puzzleTypeMap } from '@global';

export const mapToErrors = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};
    for (const error of errors) {
        errorMap[error.field] = error.message;
    }
    return errorMap;
};

export const notify = (text: string) =>
    toast.success(text, {
        duration: 2000,
        position: 'top-center',
        className: 'toast'
    });

export const showError = (text: string = 'Something went wrong') =>
    toast.error(text, {
        duration: 2000,
        position: 'top-center',
        className: 'toast'
    });

export const isEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const convertNumberType = (type: string) => {
    const map: Record<string, PuzzleType> = {
        '3x3': PuzzleType.THREE,
        '2x2': PuzzleType.TWO,
        '4x4': PuzzleType.FOUR,
        '5x5': PuzzleType.FIVE,
        '6x6': PuzzleType.SIX,
        '7x7': PuzzleType.SEVEN
    };

    return map[type];
};

export function scrambleGenrator(type: PuzzleType): string {
    const { length, range } = puzzleTypeMap.get(type)!;

    const notations: string[] = [];

    // returns a random integer from interval [a,b]
    function randint(a: number, b: number): number {
        return Math.round(a + (b - a) * Math.random());
    }

    let i = 1;

    let lastIndex: number | null = null; // null is to avoid the typescript compliation error null will be never used 😅

    while (length >= i) {
        if (i === 1) {
            // making to 2 random integers for 2 indices of notationMatrix
            const ran1 = randint(range[0] - 1, range[1] - 1);
            const ran2 = randint(0, 2);

            let notation = notationMatrix[ran1][ran2];
            notations.push(notation);

            lastIndex = ran1; // to not repeat the same notation type like R R2 , should not come together

            i++;
            continue;
        }

        // making to 2 random integers for 2 indices of notationMatrix
        const ran1 = randint(range[0] - 1, range[1] - 1);
        const ran2 = randint(0, 2);

        // to not repeat the same notation type like R R2 , should not come together
        if (lastIndex !== ran1) {
            let notation = notationMatrix[ran1][ran2];
            notations.push(notation);

            lastIndex = ran1;
        } else {
            continue;
        }

        i++;
    }

    // to convert array to notations to a single string
    return notations.join(' ');
}
