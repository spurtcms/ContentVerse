import Blog_Header_Component from '@/components/Header/Blog_Header';
import CheckoutPlan from '@/components/Membership_page/checkoutPlan';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Page = () => {
    const router = useRouter()
    console.log(router?.query?.checkout, "vhfdg")
    const id = router?.query?.checkout
    return (
        <>
            <Head>
                <title>Blog</title>
                <meta name="description" content="Welcome to our blog. Stay updated with our latest posts." />
                <meta property="og:title" content="Blog" />
                <meta property="og:description" content="Welcome to our blog. Stay updated with our latest posts." />
                <meta property="og:type" content="website" />
            </Head>
            <CheckoutPlan id={id} />
        </>
    );
};

export default Page;
