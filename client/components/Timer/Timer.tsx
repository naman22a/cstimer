import React, { useState } from 'react';
import styles from './Timer.module.scss';
import Avg from './Avg/Avg';
import useKeypress from 'react-use-keypress';
import { useStore } from '@store';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { scrambleGenrator, showError } from '@utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '@api';
import toast from 'react-hot-toast';
dayjs.extend(utc);

const Timer: React.FC = () => {
    const { mutateAsync: createSolve } = useMutation(
        ['solves', 'create'],
        api.solves.createSolve
    );
    const queryClient = useQueryClient();

    const scramble = useStore(state => state.scramble);
    const puzzleType = useStore(state => state.puzzleType);
    const setScramble = useStore(state => state.setScramble);
    const addScrambleList = useStore(state => state.addScrambleList);

    const [time, setTime] = useState(new Date());
    const [currentTimer, setCurrentTimer] = useState(0);
    const [interval, setMyInterval] = useState<number | NodeJS.Timer>(0);
    const [started, setStarted] = useState(false);
    let lastUpdateTime = new Date().getTime();

    const update = () => {
        let now = new Date().getTime();
        let dt = now - lastUpdateTime;

        setCurrentTimer(prev => prev + dt);
        setTime(new Date(currentTimer));

        lastUpdateTime = now;
    };

    const startTimer = () => {
        if (!interval) {
            setMyInterval(setInterval(update, 1));
            lastUpdateTime = new Date().getTime();
        }
    };

    const stopTimer = () => {
        clearInterval(interval);
        setMyInterval(0);
    };

    const resetTimer = () => {
        stopTimer();

        setCurrentTimer(0);
        setTime(new Date(0));
    };

    useKeypress(' ', async () => {
        if (!started) {
            resetTimer();
            startTimer();
        } else {
            stopTimer();

            const newSolve = {
                time:
                    dayjs(currentTimer).utc().minute() > 0
                        ? dayjs(currentTimer).utc().format('m:ss.SSS')
                        : dayjs(currentTimer).utc().format('ss.SSS'),
                scramble,
                status: 'OK',
                puzzleType
            };

            const toastId = toast.loading('Loading...');

            try {
                // post solve
                await createSolve(newSolve);
                await queryClient.invalidateQueries(['solves']);
            } catch (error) {
                showError();
            } finally {
                toast.dismiss(toastId);
            }

            // -- make new scramble
            const newScramble = scrambleGenrator(puzzleType);
            addScrambleList(newScramble);
            setScramble(newScramble);
        }
        setStarted(prev => !prev);
    });

    return (
        <div className={styles.container}>
            <h1>
                {dayjs(currentTimer).utc().minute() > 0
                    ? dayjs(currentTimer)
                          .utc()
                          .format('m:ss.SSS')
                          .slice(
                              0,
                              dayjs(currentTimer).utc().format('m:ss.SSS')
                                  .length - 1
                          )
                    : dayjs(currentTimer)
                          .utc()
                          .format('s.SSS')
                          .slice(
                              0,
                              dayjs(currentTimer).utc().format('s.SSS').length -
                                  1
                          )}
            </h1>
            <div className="mt-5">
                <Avg n={5} />
                <Avg n={12} />
            </div>
        </div>
    );
};

export default Timer;
