import Blog_detail_component from '@/components/Blogs/Blog_detail_component';
import NotFound from '@/pages/404';
import { fetchGraphQl } from '@/pages/api/graphicql';
import { GET_POSTS_LIST_QUERY, GET_POSTS_SLUG_QUERY } from '@/pages/api/query';
import { channelName } from '@/pages/api/url';
import Head from 'next/head';


const Blog_detail_page = ({ postes, Total_Blogs_api_result, params }) => {
    return (
        <>
            <Head>
                <title>Blog</title>
                <meta name="description" content="Welcome to our blog. Stay updated with our latest posts." />
                <meta property="og:title" content="Blog" />
                <meta property="og:description" content="Welcome to our blog. Stay updated with our latest posts." />
                <meta property="og:type" content="website" />
            </Head>
            <Blog_detail_component postes={postes} Total_Blogs_api_result={Total_Blogs_api_result} params={params.detail} />
        </>
    );
};

export default Blog_detail_page;


export async function getServerSideProps({ params }) {
    let variable_slug = { "slug": params?.detail, "AdditionalData": { "authorDetails": true, "categories": true } };

    const postes = await fetchGraphQl(GET_POSTS_SLUG_QUERY, variable_slug);
    console.log(postes, "jhdssddh")
    let variable_lists = {
        "entryFilter": {
            "categorySlug": "blog",
            "ChannelName": channelName
        },
        "commonFilter": {
            "limit": 10,
            "offset": 0
        },
        "AdditionalData": {
            "categories": true,
            "authorDetails": true
        }
    };

    const Total_Blogs_api_result = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_lists);

    return {
        props: {
            postes,
            Total_Blogs_api_result,
            params
        }
    };
}
