import React from 'react';
import ResetButton from './ResetButton/ResetButton';
import SelectMenu from './SelectMenu/SelectMenu';

const Session: React.FC = () => {
    return (
        <div className="flex items-center justify-center px-4 text-xs md:text-base">
            <SelectMenu />
            <ResetButton />
        </div>
    );
};

export default Session;
