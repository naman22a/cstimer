import React from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '@api';

const SelectMenu: React.FC = () => {
    const {
        data: sessions,
        isLoading: sIsLoading,
        isError: sError
    } = useQuery(['sessions'], api.sessions.sessions);
    const {
        data: session,
        isLoading: cIsLoading,
        isError: cError
    } = useQuery(['sessions', 'current'], api.sessions.currentSession);

    // loading state
    if (sIsLoading || cIsLoading) {
        return <p>Loading...</p>;
    }

    // error state
    if (sError || cError || !sessions || !session) {
        return <p>Something went wrong</p>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const id = parseInt(e.target.value, 10);

        if (value === 'new') {
            console.log('new clicked');
        } else if (value === 'delete') {
            console.log('delete clicked');
        } else if (value === 'rename') {
            console.log('rename clicked');
        } else {
            console.log('something else clicked');
        }
    };

    return (
        <>
            <h5 className="text-sm md:text-base text-Neon-200 dark:text-Neon-100">
                Session
            </h5>
            <select
                className="md:mx-4"
                value={session?.id}
                onChange={handleChange}
            >
                {sessions.map(session => (
                    <option key={session.id} value={session.id}>
                        {session.name}
                    </option>
                ))}
                <option value="new">new</option>
                <option value="delete">delete</option>
                <option value="rename">rename</option>
            </select>
        </>
    );
};

export default SelectMenu;
