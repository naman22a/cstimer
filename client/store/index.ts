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

    headerVisible: boolean;
    toggleHeader: () => void;

    listVisible: boolean;
    toggleList: () => void;

    toolBoxVisible: boolean;
    toggleToolBox: () => void;

    aboutModalOpen: boolean;
    toggleAboutModal: () => void;
}

export const useStore = createStore<State>(set => ({
    scramble: 'Loading...',
    setScramble: scramble => set(() => ({ scramble })),

    puzzleType: PuzzleType.THREE,
    setPuzzleType: newPuzzleType => set(() => ({ puzzleType: newPuzzleType })),

    scrambleList: [],
    addScrambleList: scramble =>
        set(state => ({ scrambleList: [...state.scrambleList, scramble] })),
    resetScrambleList: () => set(() => ({ scrambleList: [] })),

    headerVisible: true,
    toggleHeader: () => set(state => ({ headerVisible: !state.headerVisible })),

    toolBoxVisible: false,
    toggleToolBox: () =>
        set(state => ({ toolBoxVisible: !state.toolBoxVisible })),

    listVisible: true,
    toggleList: () => set(state => ({ listVisible: !state.listVisible })),

    aboutModalOpen: false,
    toggleAboutModal: () =>
        set(state => ({ aboutModalOpen: !state.aboutModalOpen }))
}));
