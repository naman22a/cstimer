import React from 'react';
import { Solve as ISolve, Status } from '../../../../api/solves/types';
import { useQuery } from '@tanstack/react-query';
import * as api from '@api';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

interface Props extends ISolve {
    index: number;
}

const Solve: React.FC<Props> = ({ index, time, status }) => {
    const { data: solves } = useQuery(['solves'], api.solves.getSolves);

    return (
        <tr>
            <td>{solves?.length! - index}</td>
            {status === Status.DNF && <td>DNF</td>}
            {status === Status.PLUS2 && (
                <td>
                    {dayjs(time, 'ss.SSS').isValid() &&
                    dayjs(time, 'ss.SSS').add(2, 'seconds').minute() === 0
                        ? dayjs(time, 'ss.SSS')
                              .add(2, 'seconds')
                              .format('s.SSS')
                              .slice(
                                  0,
                                  dayjs(time, 's.SSS').format('s.SSS').length -
                                      1
                              )
                        : dayjs(time, 'ss.SSS')
                              .add(2, 'seconds')
                              .format('m:ss.SSS')
                              .slice(
                                  0,
                                  dayjs(time, 'ss.SSS')
                                      .add(2, 'seconds')
                                      .format('m:ss.SSS').length - 1
                              )}
                    +
                </td>
            )}
            {status === Status.OK && (
                <td>
                    {dayjs(time, 'ss.SSS').isValid() &&
                    isNaN(dayjs(time).minute())
                        ? dayjs(time, 'ss.SSS')
                              .format('ss.SSS')
                              .slice(
                                  0,
                                  dayjs(time, 'ss.SSS').format('ss.SSS')
                                      .length - 1
                              )
                        : dayjs(time, 'm:ss.SSS')
                              .format('m:ss.SSS')
                              .slice(
                                  0,
                                  dayjs(time, 'm:ss.SSS').format('m:ss.SSS')
                                      .length - 1
                              )}
                </td>
            )}
            <td>-</td>
            <td>-</td>
        </tr>
    );
};

export default Solve;
