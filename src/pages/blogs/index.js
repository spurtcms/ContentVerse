import Blog_Index_component from '@/components/Blogs/Blog_Index_component';
import Head from 'next/head';
import React from 'react';
import { fetchGraphQl } from '../api/graphicql';
import { GET_POSTS_CHANNELLIST_QUERY } from '../api/query';

export default  function Blog_index_page() {


    return (
        <>
            <Head>
                <title>Blog</title>
                <meta name="description" content="Welcome to our blog. Stay updated with our latest posts." />
                <meta property="og:title" content="Blog" />
                <meta property="og:description" content="Welcome to our blog. Stay updated with our latest posts." />
                <meta property="og:type" content="website" />
            </Head>
            <Blog_Index_component />
        </>
    );
};

