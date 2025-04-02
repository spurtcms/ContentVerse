import React from 'react';
import MembershipPage from '@/components/Membership_page/membershipPage';
import Head from 'next/head';

const Page = () => {

    return (
        <>
            <Head>
                <title>Blog</title>
                <meta name="description" content="Welcome to our blog. Stay updated with our latest posts." />
                <meta property="og:title" content="Blog" />
                <meta property="og:description" content="Welcome to our blog. Stay updated with our latest posts." />
                <meta property="og:type" content="website" />
            </Head>
            <MembershipPage />
        </>
    );
};

export default Page;
