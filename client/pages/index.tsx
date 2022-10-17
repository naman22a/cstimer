import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as api from '../api';
import { Header, List, Loading, Settings, Timer } from '../components';
import styles from '../styles/index.module.scss';

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
        <div className={styles.container}>
            <Settings />
            <Header />
            <List />
            <Timer />
        </div>
    );
};

export default index;
