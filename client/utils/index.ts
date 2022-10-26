import { FieldError } from '../api/types';
import toast from 'react-hot-toast';
import { PuzzleType, Solve, Status } from '../api/solves/types';
import { notationMatrix, puzzleTypeMap } from '@global';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
dayjs.extend(customParseFormat);
dayjs.extend(utc);

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

export const mean = (solves: Solve[]): string => {
    const count = solves.filter(solve => solve.status !== Status.DNF).length;
    if (solves.length === 0) {
        return dayjs(0)
            .format('ss.SSS')
            .slice(0, dayjs(0).format('ss.SSS').length - 1);
    }

    let total = dayjs()
        .utc()
        .set('milliseconds', 0)
        .set('seconds', 0)
        .set('minutes', 0);

    for (const solve of solves) {
        const time =
            dayjs(solve.time, 'ss.SSS').isValid() &&
            isNaN(dayjs(solve.time, 'm:ss.SSS').minute())
                ? dayjs(solve.time, 'ss.SSS')
                : dayjs(solve.time, 'm:ss.SSS');

        switch (solve.status) {
            case Status.OK:
                total = total
                    .add(time.millisecond(), 'milliseconds')
                    .add(time.second(), 'seconds')
                    .add(time.minute(), 'minutes');
                break;

            case Status.PLUS2:
                total = total
                    .add(time.millisecond(), 'milliseconds')
                    .add(time.second(), 'seconds')
                    .add(time.minute(), 'minutes')
                    .add(2, 'seconds');
                break;
            case Status.DNF:
                break;
            default:
                showError();
                break;
        }
    }

    const inMillisecs = isNaN(total.minute())
        ? total.millisecond() + total.second() * 1000
        : total.millisecond() +
          total.second() * 1000 +
          total.minute() * 60 * 1000;

    const avg = Math.round(inMillisecs / count);
    const ms = avg % 1000;
    const secs = (avg - ms) / 1000;
    const mins = Math.floor(secs / 60);

    const avgtime = dayjs()
        .set('milliseconds', ms)
        .set('seconds', secs - mins * 60)
        .set('minutes', mins);

    return avgtime.minute() === 0
        ? avgtime.format('ss.SSS').slice(0, avgtime.format('ss.SSS').length - 1)
        : avgtime
              .format('m:ss.SSS')
              .slice(0, avgtime.format('m:ss.SSS').length - 1);
};
