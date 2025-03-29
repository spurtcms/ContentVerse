import React, { useEffect, useState } from 'react'
import Blog_Header_Component from '../Header/Blog_Header'
import { fetchGraphQl } from '@/pages/api/graphicql';
import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_LIST_QUERY } from '@/pages/api/query';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';
import { Home_skeletonLoader } from '../skeleton/home_skeletonLoader';
import { useRouter } from 'next/router';
import { channelName } from '@/pages/api/url';

const Blog_Index_component = () => {

    const [homePageDescription, setHomePageDescription] = useState(null);
    const [Total_blogs_apiresult, setTotal_blogs_apiresult] = useState(null); // Hydration state
    const [Best_stories_api_result, setBest_stories_api_result] = useState(null); // Hydration state

    const [page_loader, setpage_loader] = useState(false)
    const [Recomended_blogs_apiresult, setRecomended_blogs_apiresult] = useState(null); // Hydration state

    const router = useRouter()
    const { categorySlug } = router.query;

    const [visibleCount, setVisibleCount] = useState(5); // Initially show 5 blogs

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5); // Load next 5
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                let variable_home_des = {
                    categoryFilter: {
                        categoryGroupSlug: "blog",
                        hierarchyLevel: 1,
                    },
                };

                const data = await fetchGraphQl(GET_POSTS_CHANNELLIST_QUERY, variable_home_des);
                setHomePageDescription(data); // Set the fetched data into state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run on component mount

    useEffect(() => {
        const fetchData = async () => {
            try {
                let variable_list = {
                    "entryFilter": {
                        "categorySlug": categorySlug || "blog",
                        "ChannelName": channelName
                    },
                    "commonFilter": {
                        "limit": 10,
                        "offset": 0
                    },
                    "AdditionalData": {
                        "categories": true,
                        "authorDetails": true
                    },
                    "sort": {
                        "sortBy": "en.created_on",
                    }

                }

                const data = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list);
                setRecomended_blogs_apiresult(data?.ChannelEntriesList?.channelEntriesList); // Set the fetched data into state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [categorySlug]); // Empty dependency array to run on component mount



    useEffect(() => {

        const fetchData = async () => {

            const variable_list = {
                "entryFilter": {
                    // "categorySlug": categorySlug || "blog"
                    "categorySlug": categorySlug || "blog",
                    "ChannelName": channelName

                },
                "commonFilter": {
                    // "limit": 10,
                    // "offset": 0
                },
                "AdditionalData": {
                    "categories": true,
                    "authorDetails": true
                }
            };

            try {
                const Best_stories = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list);

                setTotal_blogs_apiresult(Best_stories?.ChannelEntriesList?.channelEntriesList);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, [categorySlug]);

    useEffect(() => {

        const fetchData = async () => {

            setpage_loader(true)
            const variable_list = {
                "entryFilter": {
                    "categorySlug": "best-stories",
                    "ChannelName": channelName

                },
                "commonFilter": {
                    // "limit": 10,
                    // "offset": 0
                },
                "AdditionalData": {
                    "categories": true,
                    "authorDetails": true
                }
            };

            try {
                const Best_stories = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list);

                setBest_stories_api_result(Best_stories?.ChannelEntriesList?.channelEntriesList);

                setpage_loader(false)
            } catch (error) {
                console.error("Error fetching data:", error);
                setpage_loader(false)
            }
        };

        fetchData();

    }, []);



    return (
        <>
            <div>
                <Blog_Header_Component />
                <section>
                    <div class="mx-auto mb-[105px] max-[998px]:mb-[28px] px-[16px] max-w-[1295px]">
                        <h2 class="font-normal text-[66px] max-[500px]:text-[28px] max-[998px]:text-[48px]">
                            {/* <span class="font-[700]">This is SpurtCMS.</span> We are a community
                            that celebrates contemporary <span class="font-[700]">culture
                                focused</span> on technology, design, art and
                            web. */}
                            <span class="font-[700]">{homePageDescription?.CategoryList?.categorylist?.[0]?.description}</span>
                        </h2>
                    </div>
                    {page_loader ? <>
                        <Home_skeletonLoader />
                    </> : <>
                        <div class="bg-[#EFFC06]">
                            <div class="mx-auto px-[16px] max-w-[1295px]">
                                <div class="flex max-[550px]:flex-col items-start gap-[45px] pb-[77px] max-[700px]:pb-[38px]">

                                    <div class="flex flex-col pr-[15px] w-full max-w-[541px]">
                                        <div class="mb-[14px] w-full max-w-[526px]">
                                            {/* <img src="/img/block-banner5.png" alt="" /> */}

                                            <img src={Best_stories_api_result?.[0]?.coverImage || "/img/no-image.png"} alt={Best_stories_api_result?.[0]?.title}
                                                class="group-hover:scale-[1.1] rounded-[24px] w-full h-auto transition-all h-[418px]"
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                    currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                }}
                                                style={{ width: "526px", height: "420px" }}
                                            />

                                        </div>
                                        <div class="flex flex-col items-start">
                                            <p class="mb-[14px] text-[#120B14] text-[18px] text-normal">{moment(Best_stories_api_result?.[0]?.createdOn).format("MMM DD, YYYY")} by @{`${Best_stories_api_result?.[0]?.authorDetails?.firstName} ${Best_stories_api_result?.[0]?.authorDetails?.lastName}`} {" "}
                                                in
                                                #{Best_stories_api_result?.[0]?.categories?.[0]?.[0]?.categoryName}</p>
                                            <Link href={`/blogs/${Best_stories_api_result?.[0]?.slug}`} legacyBehavior>

                                                <a
                                                    class="mb-[24px] font-medium text-[#120B14] text-[44px] max-[500px]:text-[28px] hover:underline leading-[54px] max-[500px]:leading-normal">
                                                    {Best_stories_api_result?.[0]?.title}
                                                </a>
                                            </Link>
                                            {Best_stories_api_result?.[0]?.description ? (
                                                <h6
                                                    class="font-normal text-[#120B14] text-[22px]"
                                                    dangerouslySetInnerHTML={{
                                                        __html: Best_stories_api_result?.[0]?.description
                                                            ?.replaceAll("<br>", " ") // Replace <br> tags with spaces
                                                            .replaceAll(/<div class="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
                                                            .replaceAll(/<img[^>]*>/g, "") // Remove all <img> tags
                                                            .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
                                                            .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
                                                            .split(/\s+/) // Split text into words
                                                            .slice(0, 35) // Limit to the first 100 words
                                                            .join(" ") // Join the words back into a string
                                                            .concat("...") // Add ellipsis if text is truncated
                                                        // .substring(0, 100) // Take the first 1000 characters (approx. for 100 words)

                                                    }}
                                                ></h6>

                                            ) : (
                                                <></>
                                            )}

                                            {/* <h6 class="font-normal text-[#120B14] text-[22px]">Discover how artificial intelligence
                                            is reshaping the employment landscape. Explore the
                                            impact of AI on job markets, from automation to the emergence of new roles.</h6> */}
                                        </div>
                                    </div>

                                    <div class="gap-[60px] gap-y-[58px] max-[500px]:gap-y-[28px] grid grid-cols-2 max-[800px]:grid-cols-1 pt-[4.0625rem] max-[800px]:pt-0">

                                        {Best_stories_api_result?.slice(1, 5)?.map((val, i) => (
                                            <>
                                                <div class="flex flex-col items-start">
                                                    <div class="mb-[12px] max-w-[326px] max-[550px]:max-w-full">
                                                        {/* <img src="/img/block-banner4.png" alt="" /> */}

                                                        <img src={val?.coverImage || "/img/no-image.png"} alt={val?.title}
                                                            // class="group-hover:scale-[1.1] rounded-[24px] w-full h-auto transition-all h-[418px]"
                                                            onError={({ currentTarget }) => {
                                                                currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                                currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                            }}
                                                            style={{ width: "309px", height: "209px" }}
                                                        />

                                                    </div>
                                                    <p class="font-normal text-[#120B14] text-[18px]">
                                                        {moment(val?.createdOn).format("MMM DD, YYYY")} in
                                                        #{val?.categories?.[0]?.[0]?.categoryName}
                                                    </p>
                                                    <a href={`/blogs/${val?.slug}`} class="font-medium text-[#120B14] text-[26px] hover:underline">
                                                        {val?.title}
                                                    </a>
                                                </div>

                                            </>
                                        ))}
                                    </div>


                                </div>
                            </div>
                        </div>

                    </>}
                    <div class="relative bg-image">
                        <div class="top-0 left-0 absolute bg-[#120b1461] w-full h-full"></div>
                        <div
                            class="relative z-20 flex max-[800px]:flex-col justify-between items-end gap-[18px] mx-auto px-[16px] max-[500px]:py-[32px] pt-[69px] pb-[58px] max-w-[1295px]">
                            <div>
                                <h4 class="mb-[47px] font-medium text-[46px] text-white max-[500px]:text-[28px]">Join <span
                                    class="font-[700]">spurtcms</span> Register for free, and upgrade when you love
                                    it.</h4>

                                <div class="w-full max-w-[545px] ">
                                    <ul class="gap-[40px] gap-y-[5px] grid grid-cols-2 max-[550px]:grid-cols-1 max-[550px]:pl-[2rem] list-disc list-inside">
                                        <li class="text-[#120B14] hover:text-white group">
                                            <a href="#"
                                                class="group-hover:text-white font-normal text-[#120B14] text-[18px] no-underline">Join
                                                1000+ happy
                                                members.</a>
                                        </li>
                                        <li class="text-[#120B14] hover:text-white group">
                                            <a href="#"
                                                class="group-hover:text-white font-normal text-[#120B14] text-[18px] no-underline">Weekly
                                                email
                                                newsletter</a>
                                        </li>
                                        <li class="text-[#120B14] hover:text-white group">
                                            <a href="#"
                                                class="group-hover:text-white font-normal text-[#120B14] text-[18px] no-underline">Access
                                                to
                                                comments</a>
                                        </li>
                                        <li class="text-[#120B14] hover:text-white group">
                                            <a href="#"
                                                class="group-hover:text-white font-normal text-[#120B14] text-[18px] no-underline">Free
                                                forever</a>
                                        </li>
                                        <li class="text-[#120B14] hover:text-white group">
                                            <a href="#"
                                                class="group-hover:text-white font-normal text-[#120B14] text-[18px] no-underline">Access
                                                to
                                                comments</a>
                                        </li>
                                        <li class="text-[#120B14] hover:text-white group">
                                            <a href="#"
                                                class="group-hover:text-white font-normal text-[#120B14] text-[18px] no-underline">No
                                                spam ever, we
                                                promise!</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="pb-[8px]">
                                <Link href="/membership"
                                    class="flex items-center bg-[#F33151] hover:bg-[#f15e76] px-[46px] max-[500px]:px-[23px] rounded-[50px] max-w-[465px] h-[79px] font-medium text-[24px] text-white max-[500px]:text-[18px] whitespace-nowrap">
                                    Sign up for free
                                </Link>
                            </div>

                        </div>
                    </div>
                    <div class="mx-auto mb-[105px] px-[16px] pt-[85px] max-w-[1295px]">
                        <div class="border-[#1516183D] pb-[37px] border-b border-solid">
                            <h3 class="font-[700] text-[#120B14] text-[46px]">What’s New?</h3>
                        </div>
                        {
                            Total_blogs_apiresult?.length == 0 ? <>

                                <div className="no-data-avl flexx">
                                    <img src="/img/no-data.svg" alt="" />
                                </div>
                                <h3 className="heading36">Sorry, No results found.</h3>




                            </> : <>
                                <div class="mb-[99px] max-[500px]:mb-[38px]">
                                    {Total_blogs_apiresult?.slice(0, visibleCount)?.map((val, i) => (<>



                                        <div
                                            class="flex max-[600px]:flex-col-reverse justify-between items-start gap-[16px] border-[#1516183D] py-[40px] last:pb-0 border-b last:border-b-0 border-solid max-w-[500px]:mb-[32px]">

                                            <div class="flex flex-col items-start max-w-[832px] max-[600px]:max-w-full max-[600px]:max-w-full">
                                                <p>
                                                    {/* September 9, 2023 by @breana in #innovation */}

                                                    {moment(val?.createdOn).format("MMM DD, YYYY")} by  {`${val?.authorDetails?.firstName} ${" "} ${val?.authorDetails?.lastName}`} in
                                                    #{val?.categories?.[0]?.[0]?.categoryName}
                                                </p>
                                                <Link href={`/blogs/${val?.slug}`} class="my-[10px] font-medium text-[#120B14] text-[60px] max-[998px]:text-[32px] hover:underline">
                                                    {val?.title}
                                                </Link>
                                                {val?.description ? (
                                                    <h6
                                                        class="font-normal text-[#120B14] text-[22px]"
                                                        dangerouslySetInnerHTML={{
                                                            __html: val?.description
                                                                ?.replaceAll("<br>", " ") // Replace <br> tags with spaces
                                                                .replaceAll(/<div class="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
                                                                .replaceAll(/<img[^>]*>/g, "") // Remove all <img> tags
                                                                .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
                                                                .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
                                                                .split(/\s+/) // Split text into words
                                                                .slice(0, 35) // Limit to the first 100 words
                                                                .join(" ") // Join the words back into a string
                                                                .concat("...") // Add ellipsis if text is truncated
                                                            // .substring(0, 100) // Take the first 1000 characters (approx. for 100 words)

                                                        }}
                                                    ></h6>

                                                ) : (
                                                    <></>
                                                )}

                                                {/* <h6 class="font-normal text-[#120B14] text-[20px]">
                                            In the age of technological innovation,
                                            mobile applications have become gateways to virtual
                                            realms, offering users immersive experiences that often blur the lines between reality
                                            and
                                            the digital landscape.
                                        </h6> */}
                                            </div>
                                            <div class="w-full max-w-[306px] max-[600px]:max-w-full max-[600px]:max-w-full">
                                                {/* <img src="/img/block-list-banner-5.png" alt="" class="w-full h-auto" /> */}

                                                <img src={val?.coverImage || "/img/no-image.png"} alt={val?.title}
                                                    class="w-full h-auto"
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                        currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                    }}
                                                    style={{ width: "306px", height: "243px" }}
                                                />

                                            </div>
                                        </div>

                                    </>))}
                                </div>
                                {visibleCount < Total_blogs_apiresult?.length && <>

                                    <div class="flex justify-center items-center mb-[149px] max-[500px]:mb-[32px] cursor-pointer">
                                        <a onClick={(e) => loadMore(e)}
                                            class="flex items-center bg-[#F33151] hover:bg-[#f15e76] px-[46px] max-[500px]:px-[23px] rounded-[50px] max-w-[465px] h-[79px] font-medium text-[24px] text-white max-[500px]:text-[18px] whitespace-nowrap">
                                            Load more</a>

                                    </div>


                                </>}
                                <div class="gap-[27px] grid grid-cols-4 max-[500px]:grid-cols-1 max-[800px]:grid-cols-2 mb-[119px] ">
                                    {Recomended_blogs_apiresult?.slice(0, 4)?.map((val, i) => (
                                        <>
                                            <a href={`/blogs/${val?.slug}`} class="flex flex-col items-start group">
                                                <div class="mb-[30px] w-full h-[271px]">
                                                    {/* <img src="/img/block-list-banner-1.png" alt="" class="w-full h-full object-cover" /> */}

                                                    <img src={val?.coverImage || "/img/no-image.png"} alt={val?.title}
                                                        class="w-full h-full object-cover"
                                                        onError={({ currentTarget }) => {
                                                            currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                                            currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                                        }}
                                                        style={{ width: "296px", height: "271px" }}
                                                    />

                                                </div>
                                                <p class="font-normal text-[#151618] text-[24px] group-hover:underline no-underline">
                                                    {val?.title}
                                                </p>
                                            </a>

                                        </>
                                    ))}
                                    {/* <a href="#" class="flex flex-col items-start group">
                                <div class="mb-[30px] w-full h-[271px]">
                                    <img src="/img/block-list-banner-2.png" alt="" class="w-full h-full object-cover" />
                                </div>
                                <p class="font-normal text-[#151618] text-[24px] group-hover:underline no-underline">Understanding the power of bitcoin and blockchain</p>
                            </a>
                            <a href="#" class="flex flex-col items-start group">
                                <div class="mb-[30px] w-full h-[271px]">
                                    <img src="/img/block-list-banner-3.png" alt="" class="w-full h-full object-cover" />
                                </div>
                                <p class="font-normal text-[#151618] text-[24px] group-hover:underline no-underline">New frontiers in the job market and adaptive careers for the future</p>
                            </a>
                            <a href="#" class="flex flex-col items-start group">
                                <div class="mb-[30px] w-full h-[271px]">
                                    <img src="/img/block-list-banner-5.png" alt="" class="w-full h-full object-cover" />
                                </div>
                                <p class="font-normal text-[#151618] text-[24px] group-hover:underline no-underline">I believe the world is one big family</p>
                            </a> */}
                                </div>


                            </>

                        }

                        {/* {[0, undefined, null].includes(remainingData?.length - currentIndex) ? <></> : 
                        <> */}



                        {/* </>} */}


                    </div>
                    <div class="relative bg-image">
                        <div class="top-0 left-0 absolute bg-[#120b1461] w-full h-full"></div>
                        <div class="relative z-20 flex max-[800px]:flex-col justify-between items-end gap-[18px] mx-auto px-[16px] max-[500px]:py-[32px] pt-[83px] pb-[122px] max-w-[1295px]">
                            <div class="flex flex-col items-start">
                                <h3 class="font-normal text-[24px] text-white">Membership</h3>
                                <p class="font-normal text-[40px] text-white max-[500px]:text-[28px]">Unlock full access to <span class="font-medium">spurtcms</span> and see the entire library of <span class="font-medium">paid-members</span> only posts</p>
                            </div>
                            <Link href="/membership" class="flex items-center bg-[#F33151] hover:bg-[#f15e76] px-[46px] max-[500px]:px-[23px] rounded-[50px] max-w-[465px] h-[79px] font-medium text-[24px] text-white max-[500px]:text-[18px] whitespace-nowrap">Sign up for free</Link>
                        </div>
                    </div>
                    <div class="mx-auto px-[16px] pt-[109px] max-[500px]:pt-[48px] max-w-[1295px]">
                        <div class="flex max-[600px]:flex-col justify-between items-end gap-[16px] border-[#1516183D] mb-[62px] pb-[2.625rem] border-b border-solid">
                            <div class="flex flex-col items-start max-w-[587px]">
                                <h4 class="mb-[50px] font-[700] text-[#151515] text-[54px] max-[500px]:text-[32px]">SpurtCMS</h4>
                                <p class="font-normal text-[#211F1F] text-[20px]">Versatile and functional theme for running a free or paid-membership publication on Ghost.</p>
                            </div>
                            <div class="flex items-center gap-[30px]">
                                <a href="#" class="flex justify-center items-center w-[40px] h-[40px] hover:opacity-[0.8]">
                                    <img src="/img/fb.svg" alt="" />
                                </a>
                                <a href="#" class="flex justify-center items-center w-[40px] h-[40px] hover:opacity-[0.8]">
                                    <img src="/img/youtube.svg" alt="" />
                                </a>
                                <a href="#" class="flex justify-center items-center w-[40px] h-[40px] hover:opacity-[0.8]">
                                    <img src="/img/insta.svg" alt="" />
                                </a>
                                <a href="#" class="flex justify-center items-center w-[40px] h-[40px] hover:opacity-[0.8]">
                                    <img src="/img/v.svg" alt="" />
                                </a>
                            </div>
                        </div>
                        {/* <div class="gap-[24px] grid grid-cols-5 max-[500px]:grid-cols-2 max-[800px]:grid-cols-3 mb-[50px]">
                            <div class="flex flex-col items-start">
                                <h3 class="mb-[28px] font-[600] text-[#211F1F] text-[24px]">About</h3>
                                <ul class="flex flex-col gap-[24px]">
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Style Guide</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Features</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Contact</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">404</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Get Theme</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="flex flex-col items-start">
                                <h3 class="mb-[28px] font-[600] text-[#211F1F] text-[24px]">Features</h3>
                                <ul class="flex flex-col gap-[24px]">
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Demos</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Authors</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Tags</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Light version</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Dark version</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Sepia version</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">404</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Search</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="flex flex-col items-start">
                                <h3 class="mb-[28px] font-[600] text-[#211F1F] text-[24px]">Members</h3>
                                <ul class="flex flex-col gap-[24px]">
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Account</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Membership</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Subscriber</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Tags</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Author</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="flex flex-col items-start">
                                <h3 class="mb-[28px] font-[600] text-[#211F1F] text-[24px]">Contact</h3>
                                <ul class="flex flex-col gap-[24px]">
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Account</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Membership</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Subscriber</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Tags</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Author</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="flex flex-col items-start">
                                <h3 class="mb-[28px] font-[600] text-[#211F1F] text-[24px]">Resource</h3>
                                <ul class="flex flex-col gap-[24px]">
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Demos</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Docs</a>
                                    </li>
                                    <li>
                                        <a href="#" class="font-medium text-[#211F1FC2] text-base hover:text-black">Showcase</a>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </section>

            </div>

        </>
    )
}
export default Blog_Index_component