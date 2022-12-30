import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as api from '@api';
import { useQuery } from '@tanstack/react-query';
import { Header, List, Loading, Settings, Timer, ToolBox } from '../components';
import styles from '../styles/index.module.scss';

const Index: NextPage = () => {
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
            <ToolBox />
        </div>
    );
};

export default Index;
