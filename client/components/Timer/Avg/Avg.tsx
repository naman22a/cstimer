import React from 'react';

const Avg: React.FC<{ n: number }> = ({ n }) => {
    return (
        <div className="text-xl">
            <span className="text-Neon-100 font-semibold">Ao{n}: </span>
            {12.09}
        </div>
    );
};

export default Avg;
