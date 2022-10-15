import React from 'react';
import Head from 'next/head';

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Head>
                <title>
                    csTimer - Professional Rubik's Cube Speedsolving/Training
                    Timer
                </title>
                <meta name="description" content="cs timer clone" />
                <link rel="icon" href="/logo.png" />
            </Head>
            {children}
        </>
    );
};

export default Layout;
