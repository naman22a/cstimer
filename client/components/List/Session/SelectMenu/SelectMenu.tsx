import React from 'react';
import * as api from '@api';
import { showError } from '@utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const SelectMenu: React.FC = () => {
    const queryClient = useQueryClient();
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

    // adding a new session
    const { mutateAsync: createSession } = useMutation(
        ['sessions', 'create'],
        api.sessions.createSession,
        {
            onSuccess: async data => {
                if (data) {
                    await queryClient.invalidateQueries(['sessions']);
                    await queryClient.invalidateQueries([
                        'sessions',
                        'current'
                    ]);
                }
            }
        }
    );

    // delete session
    const { mutateAsync: deleteSession } = useMutation(
        ['sessions', 'delete'],
        api.sessions.deleteSession,
        {
            onSuccess: async data => {
                if (data.ok) {
                    await queryClient.invalidateQueries(['sessions']);
                    await queryClient.invalidateQueries([
                        'sessions',
                        'current'
                    ]);
                }
            }
        }
    );

    // change session
    const { mutateAsync: changeSession } = useMutation(
        ['sessions', 'change'],
        api.sessions.changeSession,
        {
            onSuccess: async data => {
                if (data.ok) {
                    await queryClient.invalidateQueries([
                        'sessions',
                        'current'
                    ]);
                }
            }
        }
    );

    // rename a session
    const { mutateAsync: renameSession } = useMutation(
        ['sessions', 'rename'],
        api.sessions.renameSession,
        {
            onSuccess: async data => {
                if (data.ok) {
                    await queryClient.invalidateQueries(['sessions']);
                    await queryClient.invalidateQueries([
                        'sessions',
                        'current'
                    ]);
                }
            }
        }
    );

    // loading state
    if (sIsLoading || cIsLoading) {
        return <p>Loading...</p>;
    }

    // error state
    if (sError || cError) {
        return <p>Something went wrong</p>;
    }

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const id = parseInt(e.target.value, 10);

        if (value === 'new') {
            const name = prompt('Enter session name');
            await createSession(name!);
        } else if (value === 'delete') {
            if (sessions?.length! <= 1) {
                showError("Can't delete session");
            } else {
                const yes = confirm('Do you want to delete this session ?');
                if (yes) {
                    await deleteSession(session?.id!);
                }
            }
        } else if (value === 'rename') {
            const name = prompt('Enter the new name');
            await renameSession(name!);
        } else {
            await changeSession(id);
        }

        await queryClient.invalidateQueries(['solves']);
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
                {sessions?.map(session => (
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
