import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as api from '../api';
import { Loading } from '../components';

const index: NextPage = () => {
    const {
        data: user,
        isLoading,
        isError
    } = useQuery(['users', 'me'], api.user.me);
    const router = useRouter();

    if (isLoading) {
        return <Loading />;
    }

    if (isError || !user) {
        router.push('/login');
    }

    return (
        <div>
            <h1>index</h1>
            {user?.name}
        </div>
    );
};

export default index;
