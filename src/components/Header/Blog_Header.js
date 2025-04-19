import { fetchGraphQl } from "@/pages/api/graphicql";
import {
  GET_HEADER_LOGO_QUERY,
  GET_POSTS_CHANNELLIST_QUERY,
  GET_POSTS_LIST_QUERY,
  GET_USER_DETAILS,
} from "@/pages/api/query";
import { channelName, image_url, logo_url } from "@/pages/api/url";
import { Header_api_result_redux_function } from "@/StoreConfiguration/slices/customer";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav_skeletonLoader } from "../skeleton/nav_skeleton";
import { nameString, uniqueId } from "@/pages/api/clientAction";

const Blog_Header_Component = () => {
  const [header_api_result, setheader_api_result] = useState([]);
  const [header_categorySlug, setheader_categorySlug] = useState();
  const [blog_keyword, setblog_keyword] = useState(""); // Error state
  const dispatch = useDispatch();
  const header_slug = useSelector((s) => s?.customerRedux?.header_slug);
  // const headerapi_result_redux = useSelector((s) => s.customerRedux.header_api_result_redux)
  const router = useRouter();
  const [Blogs_list_api_result, setBlogs_list_api_result] = useState([]); // To store fetched data
  const [error, setError] = useState(""); // To handle errors
  const [header_logo_result, setheader_logo_result] = useState(null);
  const [clickedValue, setClickedValue] = useState(""); // Stores event value
  const [loader, setLoader] = useState(true);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const divRef = useRef(null); // Reference for the div
  const tenantId = useSelector(
    (s) => s?.customerRedux?.Header_api_result_redux_function
  );
  const [errorMessage, setErrorMessage] = useState("");
  const imagUrl = image_url;
  const nameStringData = nameString();
  const id = header_api_result?.[0]?.tenantId;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const user_id = useSelector((s) => s?.customerRedux?.get_user_id_Redux_func);
  const [registered, setRegistered] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const Id = uniqueId();
  useEffect(() => {
    const fetchData = async () => {
      let variable = {
        id: Id,
      };
      try {
        if (Id !== null) {
          const data = await fetchGraphQl(GET_USER_DETAILS, variable);
          setUserDetails(data?.MemberProfileDetails?.profileImagePath);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setErrorMessage(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchLogoData = async () => {
      let variable = {
        tenantId: header_api_result?.[0]?.tenantId,
      };
      try {
        if (
          header_api_result?.[0]?.tenantId !== 0 &&
          header_api_result?.[0]?.tenantId !== null &&
          header_api_result?.[0]?.tenantId !== undefined
        ) {
          const result = await fetchGraphQl(GET_HEADER_LOGO_QUERY, variable);
          setheader_logo_result(result);
          console.log(result, "dbjfhvbdfv");
        } else {
          setheader_logo_result();
        }
      } catch (err) {
        console.error("Error fetching category list:", err);
        setError(err.message);
      }
    };
    fetchLogoData();
  }, [header_api_result]);

  const token = localStorage.getItem("token");
  console.log(token, "ncbhdjhj");
  useEffect(() => {
    setRegistered(token);
  }, []);

  useEffect(() => {
    const fetchCategoryList = async () => {
      let variable_category = {
        categoryFilter: {
          categoryGroupSlug: "blog",
          excludeGroup: true,
          hierarchyLevel: 2,
        },
      };

      try {
        const res = await fetchGraphQl(
          GET_POSTS_CHANNELLIST_QUERY,
          variable_category
        );
        dispatch(
          Header_api_result_redux_function(res?.CategoryList?.categorylist?.[0])
        );
        setheader_api_result(res?.CategoryList?.categorylist);
        setLoader(false);
        console.log(res?.CategoryList?.categorylist?.[0], "sbdhsc");
      } catch (error) {
        console.error("Error fetching category list:", error);
      }
    };

    fetchCategoryList();
  }, []);

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
          ChannelName: channelName,
        },
        commonFilter: {
          // limit: 10,
          // offset: 0,
          keyword: blog_keyword,
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
    setheader_categorySlug(val?.categorySlug);
    router.push({
      pathname: "/",
      query: { categorySlug: val?.categorySlug },
    });
  };

  const handleclick_logoimage = (e) => {
    e.preventDefault();
    setheader_categorySlug("blog");
    // router.push({
    //     pathname: '/',
    //     query: { categorySlug: 'blog' }
    // });
    router?.push("/");
  };

  // const handleclick_searchbar_div = (e) => {
  //   e.preventDefault();
  //   setClickedValue(true);
  // };

  // const handlechange_keyword_inModal = (e) => {
  //   setblog_keyword(e.target.value);
  // };

  const handleSearch = (e) => {
    setblog_keyword(e.target.value);
    setClickedValue(true);
  };

  const handleClick_keyword_list = (e, val) => {
    router.push(`/blogs/${val.slug}`);
    setClickedValue(false);
  };

  // const enterKeyValue = (e) => {

  //     if (e.key == "Enter") {
  //         if (e.target.placeholder == "search") {
  //             handleclick_searchbar_div()
  //         }
  //     }
  // }
  const onMenuToggle = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleClick_signup = (e) => {
    router.push("/auth/signup");
  };

  const handleProfile = () => {
    router.push("/auth/my-profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setRegistered("");
    localStorage.removeItem("Id");
    localStorage.removeItem("NameString");
    router.push("/");
  };
  return (
    <>
      <header>
        <div className="flex justify-between items-center gap-[1rem] mx-auto px-[16px] max-w-[1295px] h-[120px] max-[1280px]:h-[60px]">
          <div className="flex items-center space-x-6 w-full">
            {/* <Link href={"/"} legacyBehavior> */}

            <a
              onClick={(e) => handleclick_logoimage(e)}
              style={{ cursor: "pointer" }}
            >
              {/* <img src="/img/SpurtCMS.svg" alt="" /> */}

              <img
                src={
                  logo_url + header_logo_result?.GeneralInformation?.logoPath
                }
                alt={"companylogo"}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // Prevent infinite loop if fallback fails
                  currentTarget.src = "/img/no-image.png"; // Fallback to a default image
                }}
                style={{ width: "120px", height: "30px" }}
              />
            </a>
            {/* </Link> */}
            {/* <div className="relative w-full max-w-[623px] h-[47px]">
              <input
                type="text"
                className="border-[#0000002B] focus:border-[#0000002B] focus:shadow-[unset] px-8 border border-solid rounded-[50px] focus:ring-[transparent] w-full h-full font-normal text-[#0000008F] text-base focus:outline-[transparent]"
                placeholder="search"
                // value={""}
                onClick={(e) => setClickedValue(true)}
              />
            </div> */}

            <div
              className="relative w-full max-w-[623px] h-[47px]"
              ref={divRef}
            >
              <input
                type="text"
                className="border-[#0000002B] focus:border-[#0000002B] focus:shadow-[unset] px-8 border border-solid rounded-[50px] focus:ring-[transparent] w-full h-full font-normal text-[#0000008F] text-base focus:outline-[transparent]"
                placeholder="search"
                value={blog_keyword}
                onClick={(e) => setClickedValue(true)}
                onChange={(e) => {
                  handleSearch(e);
                }}
              />
              {clickedValue && (
                <div className="w-full z-[999] relative min-h-[64px] border border-[#cdcdcd70]  mt-2 rounded  p-[16px]   justify-start shadow-xl max-h-[300px] overflow-auto bg-white ">
                  <ul className="rounded m-auto">
                    {Blogs_list_api_result.length > 0 ? (
                      <>
                        <li className="text-[12px] text-[#919090] mb-[10px]">
                          BLOGS
                        </li>
                        {Blogs_list_api_result?.map((val, i) => (
                          <Fragment key={i}>
                            <li
                              className="text-[14px] mb-[10px] cursor-pointer"
                              onClick={(e) => handleClick_keyword_list(e, val)}
                            >
                              <Link href={`/blogs/${val?.slug}`} legacyBehavior>
                                {val?.title}
                              </Link>
                            </li>
                          </Fragment>
                        ))}
                      </>
                    ) : (
                      <>
                        <li className="text-[12px] text-[#919090] mb-[10px] text-center flex items-center space-x-2">
                          No data found
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-[36px] max-[700px]:space-x-4">
            <div className="top-0 left-[-100%] z-10 lg:z-0  lg:static fixed flex flex-col lg:items-center gap-[1.5vw] bg-white lg:bg-[transparent] px-5 lg:px-0 py-5 lg:py-0 w-[50%] lg:w-auto max-[600px]:w-full h-full lg:h-auto duration-500 navLinks">
              <ul className="flex lg:flex-row flex-col gap-[30px] lg:py-[20px] w-full lg:w-auto">
                <li className="flex justify-end lg:hidden w-full">
                  <a
                    onClick={onMenuToggle}
                    className="ml-auto w-4 text-[30px] cursor-pointer"
                  >
                    <img src="/img/modal-close.svg" alt="" />
                  </a>
                </li>
                {loader ? (
                  <>
                    <Nav_skeletonLoader />
                  </>
                ) : (
                  <>
                    {header_api_result?.map((val, i) => (
                      <Fragment key={i}>
                        {val?.categoryName == "Best stories" ? (
                          <></>
                        ) : (
                          <>
                            <li>
                              <a
                                onClick={(e) => handleClick_headerlist(e, val)}
                                className={
                                  val?.categorySlug == header_categorySlug
                                    ? "font-medium text-[#120B14] text-base leading-[27px] whitespace-nowrap text-[#F33151] active cursor-pointer"
                                    : "font-medium text-[#120B14] text-base leading-[27px] whitespace-nowrap hover:text-[#F33151] cursor-pointer"
                                }
                              >
                                {val?.categoryName}
                              </a>
                            </li>
                          </>
                        )}
                      </Fragment>
                    ))}
                  </>
                )}
              </ul>
            </div>
            {/* <div className='w-[50px] h-[50px] min-w-[50px] bg-[#DD5B15] rounded-full text-[30px] font-semibold leading-[48px] text-white grid place-items-center'>
                            K
                        </div> */}
            {registered == "" ||
            registered == null ||
            registered == undefined ? (
              <>
                {" "}
                <button
                  onClick={handleClick_signup}
                  className="flex justify-center items-center bg-[#F33151] hover:bg-[#f15e76] px-[32px] max-[700px]:px-4 rounded-[50px] h-[47px] font-[700] text-base text-white whitespace-nowrap"
                >
                  Join Now
                </button>
              </>
            ) : (
              <>
                {userDetails ? (
                  <>
                    <button className="w-12 h-12 rounded-full text-2xl font-semibold text-white flex items-center justify-center">
                      <img
                        src={imagUrl + userDetails}
                        alt="profile"
                        className="w-12 h-12 rounded-full "
                        onClick={() => setPopoverVisible((prev) => !prev)}
                      />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="w-12 h-12 bg-[#DD5B15] hover:bg-[#823e19] rounded-full text-2xl font-semibold text-white flex items-center justify-center"
                      onClick={() => setPopoverVisible((prev) => !prev)}
                    >
                      {nameStringData}
                    </button>
                  </>
                )}
                {isPopoverVisible && (
                  <div
                    className="absolute inline-block w-[150px] text-sm duration-1000 border border-gray-200 rounded-lg"
                    style={{ top: "90px", right: "60px" }}
                  >
                    <div className="px-3 py-2 bg-gray-50 border-gray-700 rounded-lg">
                      <button
                        onClick={handleProfile}
                        className="flex items-center space-x-2 mb-4 w-full h-full text-left text-[14px] font-normal leading-[17px] text-[#120B14] hover:bg-[#F1F1F1] rounded-lg"
                      >
                        <img src="/img/profile1.svg" alt="profile" />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center ml-1 space-x-2 w-full h-full text-left text-[14px] font-normal leading-[17px] text-[#120B14] hover:bg-[#F1F1F1] rounded-lg"
                      >
                        <img src="/img/logout.svg" alt="logout" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            <a
              onClick={onMenuToggle}
              className="lg:hidden mr-[20px] w-[24px] max-[500px]:w-[16px] text-[30px] cursor-pointer"
            >
              <img src="/img/menu-black.svg" alt="" />
            </a>
          </div>
        </div>
      </header>

      {/* {clickedValue && (
        <>
          <div>
            <div className="absolute top-0 bottom-0 left-0 right-0 block backdrop-blur-[2px] animate-fadein z-0 bg-gradient-to-br from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.1)]"></div>
            <div className="max-w-[95vw] sm:max-w-lg m-auto " ref={divRef}>
              <div
                className="bg-white w-full max-w-[95vw] sm:max-w-lg rounded-lg shadow-xl m-auto relative translate-z-0 animate-popup"
                onClick={(e) => handleclick_searchbar_div(e)}
              >
                <div className="z-10 relative flex items-center py-5 px-4 sm:px-7 bg-white rounded-lg">
                  <div className="flex items-center justify-center w-4 h-4 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      height="16"
                      width="16"
                      className="text-neutral-900"
                      alt="Search"
                    >
                      <path
                        d="M23.38,21.62l-6.53-6.53a9.15,9.15,0,0,0,1.9-5.59,9.27,9.27,0,1,0-3.66,7.36l6.53,6.53a1.26,1.26,0,0,0,1.76,0A1.25,1.25,0,0,0,23.38,21.62ZM2.75,9.5A6.75,6.75,0,1,1,9.5,16.25,6.76,6.76,0,0,1,2.75,9.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <input
                    className="grow -my-5 py-5 -ml-3 pl-3 focus-visible:outline-none placeholder:text-gray-400 outline-none truncate"
                    placeholder="Search posts, tags and authors"
                    onChange={(e) => handlechange_keyword_inModal(e)}
                  />
                </div>
              </div>
              <div className="w-full z-[999] relative min-h-[64px] border border-[#cdcdcd70]  mt-2 rounded  p-[16px]   justify-start shadow-xl max-h-[300px] overflow-auto bg-white ">
                <ul className="rounded m-auto">
                  {Blogs_list_api_result.length > 0 ? (
                    <>
                      <li className="text-[12px] text-[#919090] mb-[10px]">
                        BLOGS
                      </li>
                      {Blogs_list_api_result?.map((val, i) => (
                        <Fragment key={i}>
                          <li
                            className="text-[14px] mb-[10px] cursor-pointer"
                            onClick={(e) => handleClick_keyword_list(e, val)}
                          >
                            <Link href={`/blogs/${val?.slug}`} legacyBehavior>
                              {val?.title}
                            </Link>
                          </li>
                        </Fragment>
                      ))}
                    </>
                  ) : (
                    <>
                      <li className="text-[12px] text-[#919090] mb-[10px] text-center flex items-center space-x-2">
                        No data found
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </>
      )} */}
      {/* <p className='text-[#555555] text-center flex items-center space-x-2'> No data found</p> */}
      {console.log("clicked", clickedValue)}
    </>
  );
};
export default Blog_Header_Component;
