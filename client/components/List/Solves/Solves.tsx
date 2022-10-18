import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const solves: any[] = [];

for (let i = 1; i <= 25; i++) {
    solves.push({
        id: i,
        time: '12.45',
        scramble: `L2 B2 R2 B2 R2 U' L2 B2 U2 F2 D U' F' R' F2 D2 L F D' L F'`,
        status: 'OK'
    });
}

const Solves: React.FC = () => {
    return (
        // table container
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>
                            <AiOutlineSearch />
                        </th>
                        <th>time</th>
                        <th>ao5</th>
                        <th>ao12</th>
                    </tr>
                </thead>
                <tbody>
                    {solves.map((solve, index) => (
                        <tr key={solve.id}>
                            <td>{index + 1}</td>
                            <td>{solve.time}</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Solves;
