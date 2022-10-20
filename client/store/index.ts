import createStore from 'zustand';
import { PuzzleType } from '../api/solves/types';

interface State {
    scramble: string;
    setScramble: (scramble: string) => void;

    puzzleType: PuzzleType;
    setPuzzleType: (newPuzzleType: PuzzleType) => void;

    scrambleList: string[];
    addScrambleList: (scramble: string) => void;
    resetScrambleList: () => void;
}

export const useStore = createStore<State>(set => ({
    scramble: 'Loading...',
    setScramble: scramble => set(() => ({ scramble })),

    puzzleType: PuzzleType.THREE,
    setPuzzleType: newPuzzleType => set(() => ({ puzzleType: newPuzzleType })),

    scrambleList: [],
    addScrambleList: scramble =>
        set(state => ({ scrambleList: [...state.scrambleList, scramble] })),
    resetScrambleList: () => set(() => ({ scrambleList: [] }))
}));
