import React from 'react';

const Stats: React.FC = () => {
    return (
        <div className="my-3 flex flex-col justify-center items-center text-sm md:text-base">
            <h4 className="font-semibold md:font-bold">Mean: {11.56}</h4>
            <h4 className="font-semibold md:font-bold">
                Solves: {11}/{12}
            </h4>
        </div>
    );
};

export default Stats;
