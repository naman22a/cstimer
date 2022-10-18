import React from 'react';

const SelectMenu: React.FC = () => {
    return (
        <>
            <h5 className="text-sm md:text-base text-Neon-200 dark:text-Neon-100">
                Session
            </h5>
            <select name="session" className="md:mx-4">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="new">new</option>
                <option value="delete">delete</option>
            </select>
        </>
    );
};

export default SelectMenu;
