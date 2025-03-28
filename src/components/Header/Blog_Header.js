import { fetchGraphQl } from '@/pages/api/graphicql';
import { GET_HEADER_LOGO_QUERY, GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_LIST_QUERY } from '@/pages/api/query';
import { logo_url } from '@/pages/api/url';
import { Header_api_result_redux_function } from '@/StoreConfiguration/slices/customer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Blog_Header_Component = () => {

    const [header_api_result, setheader_api_result] = useState([]);
    const [header_categorySlug, setheader_categorySlug] = useState()
    const [blog_keyword, setblog_keyword] = useState(""); // Error state
    const dispatch = useDispatch()
    const header_slug = useSelector((s) => s?.customerRedux?.header_slug)
    // const headerapi_result_redux = useSelector((s) => s.customerRedux.header_api_result_redux)
    const router = useRouter()
    const [Blogs_list_api_result, setBlogs_list_api_result] = useState([]); // To store fetched data
    const [error, setError] = useState("");      // To handle errors
    const [header_logo_result, setheader_logo_result] = useState(null);
    const [clickedValue, setClickedValue] = useState(""); // Stores event value
    const divRef = useRef(null); // Reference for the div
    const tenantId = useSelector((s) => s?.customerRedux?.Header_api_result_redux_function)
    console.log(header_api_result?.[0]?.tenantId, "cdbjfbsdnfj")
    console.log(Blogs_list_api_result, "djncjbshc")
    const id = header_api_result?.[0]?.tenantId


    useEffect(() => {
        const fetchCategoryList = async () => {
            let variable_category = {
                categoryFilter: {
                    categoryGroupSlug: "blog",
                    excludeGroup: true,
                    hierarchyLevel: 2

                }
            }

            try {
                const res = await fetchGraphQl(GET_POSTS_CHANNELLIST_QUERY, variable_category);
                dispatch(Header_api_result_redux_function(res?.CategoryList?.categorylist?.[0]))
                setheader_api_result(res?.CategoryList?.categorylist);
                console.log(res?.CategoryList?.categorylist?.[0], "sbdhsc")
            } catch (error) {
                console.error("Error fetching category list:", error);
            }
        };

        fetchCategoryList();
    }, []);


    useEffect(() => {
        const fetchLogoData = async () => {
            let variable = {
                tenantId: header_api_result?.[0]?.tenantId
            };
            try {
                if (header_api_result?.[0]?.tenantId !== 0 && header_api_result?.[0]?.tenantId !== null && header_api_result?.[0]?.tenantId !== undefined) {
                    const result = await fetchGraphQl(GET_HEADER_LOGO_QUERY, variable);
                    setheader_logo_result(result);
                    console.log(result, "dbjfhvbdfv")
                } else {
                    setheader_logo_result()
                }

            } catch (err) {
                console.error("Error fetching category list:", err);
                setError(err.message);
            }
        }
        fetchLogoData();
    }, [header_api_result]);


    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setClickedValue(false);
            } else {
                // setClickedValue(false);
            }
        };

        // Attach event listener
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };


    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let variable_list = {
                entryFilter: {
                    categorySlug: "blog",
                },
                commonFilter: {
                    // limit: 10,
                    // offset: 0,
                    keyword: blog_keyword
                },
                AdditionalData: {
                    categories: true,
                    authorDetails: true,
                },
            };

            try {

                const data = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list);
                setBlogs_list_api_result(data?.ChannelEntriesList?.channelEntriesList); // Update state with fetched data

            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err); // Handle errors
            }
        };

        fetchData();
    }, [blog_keyword]); // Empty dependency array ensures this runs only once after the component mounts






    const handleClick_headerlist = (e, val) => {

        e.preventDefault();
        console.log("ewewe223", val.categorySlug)

        setheader_categorySlug(val?.categorySlug)
        router.push({
            pathname: '/',
            query: { categorySlug: val?.categorySlug }
        });

    }

    const handleclick_logoimage = (e) => {
        e.preventDefault();
        setheader_categorySlug("blog")
        router.push({
            pathname: '/',
            query: { categorySlug: 'blog' }
        });

    }

    const handleclick_searchbar_div = (e) => {
        e.preventDefault()
        setClickedValue(true)
    }
    const handlechange_keyword_inModal = (e) => {
        setblog_keyword(e.target.value)
    }

    const handleClick_keyword_list = (e, val) => {
        router.push(`/blogs/${val.slug}`);
        setClickedValue(false)
    }

    return (
        <>
            <header>
                <div
                    class="flex justify-between items-center gap-[1rem] mx-auto px-[16px] max-w-[1295px] h-[120px] max-[1280px]:h-[60px]">
                    <div class="flex items-center space-x-6 w-full">
                        {/* <Link href={"/"} legacyBehavior> */}

                        <a onClick={(e) => handleclick_logoimage(e)} style={{ cursor: "pointer" }}>
                            {/* <img src="/img/SpurtCMS.svg" alt="" /> */}

                            <img src={logo_url + header_logo_result?.GeneralInformation?.logoPath}
                                alt={"companylogo"}

                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                    currentTarget.src = "/img/no-image.png";    // Fallback to a default image
                                }}
                                style={{ width: "120px", height: "30px" }}

                            />

                        </a>
                        {/* </Link> */}
                        <div class="relative w-full max-w-[623px] h-[47px]">
                            <input type="text"
                                class="border-[#0000002B] focus:border-[#0000002B] focus:shadow-[unset] px-8 border border-solid rounded-[50px] focus:ring-[transparent] w-full h-full font-normal text-[#0000008F] text-base focus:outline-[transparent]"
                                placeholder="search"
                                value={""}
                                onClick={(e) => setClickedValue(true)}
                            />
                        </div>
                    </div>
                    <div class="flex items-center space-x-[36px] max-[700px]:space-x-4">
                        <div
                            class="top-0 left-[-100%] z-10 lg:z-0 lg:static lg:static fixed flex flex-col lg:items-center gap-[1.5vw] bg-white lg:bg-[transparent] px-5 lg:px-0 py-5 lg:py-0 w-[50%] lg:w-auto max-[600px]:w-full h-full lg:h-auto duration-500 navLinks">
                            <ul class="flex lg:flex-row flex-col gap-[30px] lg:py-[20px] w-full lg:w-auto">
                                <li class="flex justify-end lg:hidden w-full">
                                    <a onclick="onMenuToggle(this)" class="ml-auto w-4 text-[30px] cursor-pointer">
                                        <img src="/img/modal-close.svg" alt="" />
                                    </a>
                                </li>

                                {header_api_result?.map((val, i) => (
                                    <>

                                        {val?.categoryName == "Best stories" ? <></> : <>
                                            <li >

                                                <a onClick={(e) => handleClick_headerlist(e, val)}
                                                    class={val?.categorySlug == header_categorySlug ? "font-medium text-[#120B14] text-base leading-[27px] whitespace-nowrap text-[#F33151] active cursor-pointer" : "font-medium text-[#120B14] text-base leading-[27px] whitespace-nowrap hover:text-[#F33151] cursor-pointer"}
                                                >
                                                    {val?.categoryName}
                                                </a>
                                            </li>
                                        </>}

                                    </>
                                ))}

                            </ul>
                        </div>
                        <Link href="/auth/signin"
                            class="flex justify-center items-center bg-[#F33151] hover:bg-[#f15e76] px-[32px] max-[700px]:px-4 rounded-[50px] h-[47px] font-[700] text-base text-white whitespace-nowrap">
                            join now
                        </Link>
                        <a onclick="onMenuToggle(this)"
                            class="lg:hidden mr-[20px] w-[24px] max-[500px]:w-[16px] text-[30px] cursor-pointer">
                            <img src="/img/menu-black.svg" alt="" />
                        </a>
                    </div>
                </div>
            </header>

            {clickedValue && <>

                <div >
                    <div
                        class="absolute top-0 bottom-0 left-0 right-0 block backdrop-blur-[2px] animate-fadein z-0 bg-gradient-to-br from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.1)]"
                    >


                    </div>
                    <div className='max-w-[95vw] sm:max-w-lg m-auto ' ref={divRef}>
                        <div class="bg-white w-full max-w-[95vw] sm:max-w-lg rounded-lg shadow-xl m-auto relative translate-z-0 animate-popup"
                            onClick={(e) => handleclick_searchbar_div(e)} >

                            <div class="z-10 relative flex items-center py-5 px-4 sm:px-7 bg-white rounded-lg" >

                                <div class="flex items-center justify-center w-4 h-4 mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16" class="text-neutral-900" alt="Search">
                                        <path d="M23.38,21.62l-6.53-6.53a9.15,9.15,0,0,0,1.9-5.59,9.27,9.27,0,1,0-3.66,7.36l6.53,6.53a1.26,1.26,0,0,0,1.76,0A1.25,1.25,0,0,0,23.38,21.62ZM2.75,9.5A6.75,6.75,0,1,1,9.5,16.25,6.76,6.76,0,0,1,2.75,9.5Z" fill="currentColor"></path>
                                    </svg>
                                </div>
                                <input
                                    class="grow -my-5 py-5 -ml-3 pl-3 focus-visible:outline-none placeholder:text-gray-400 outline-none truncate"
                                    placeholder="Search posts, tags and authors"
                                    onChange={(e) => handlechange_keyword_inModal(e)}

                                />
                            </div>
                        </div>
                        <div className='w-full z-[999] relative min-h-[64px] border border-[#cdcdcd70]  mt-2 rounded  p-[16px] flex flex-col items-center justify-start shadow-xl max-h-[300px] overflow-auto bg-white ' >
                            <ul className='rounded '>

                                {Blogs_list_api_result.length > 0 ? <>
                                    <li className='text-[12px] text-[#919090] mb-[10px]'>BLOGS</li>
                                    {Blogs_list_api_result?.map((val, i) => (
                                        <>
                                            {/* <Link href={`/blog/${val?.slug}`} legacyBehavior> */}

                                            <li className='text-[14px] mb-[10px] cursor-pointer'
                                                onClick={(e) => handleClick_keyword_list(e, val)}
                                            >{val?.title}</li>
                                            {/* </Link> */}
                                        </>
                                    ))}
                                </> : <>
                                    <li className='text-[12px] text-[#919090] mb-[10px] text-center flex items-center space-x-2'>No data found</li>
                                </>}
                            </ul>
                            {/* <p className='text-[#555555] text-center flex items-center space-x-2'> No data found</p> */}
                        </div>

                    </div>
                </div>
            </>}
            {console.log("clicked", clickedValue)}
        </>
    )
}
export default Blog_Header_Component