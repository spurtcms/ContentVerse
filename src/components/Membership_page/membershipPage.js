import React, { useEffect, useState } from 'react'
import Blog_Header_Component from '@/components/Header/Blog_Header';
import Link from 'next/link';
import { fetchGraphQl } from '@/pages/api/graphicql';
import { GET_HEADER_LOGO_QUERY, GET_MEMBERSHIP_DETAIL_PAGE, GET_MEMBERSHIP_PLAN, GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_LIST_QUERY } from '@/pages/api/query';
import { useDispatch, useSelector } from 'react-redux';
import MembershipembershipLoader from '../skeleton/membershipLoader';
import { fetch_unique_id, Fetching_MemberDetail_redux } from '@/StoreConfiguration/slices/customer';
import { useRouter } from 'next/router';
function MembershipPage() {

    const [memberData, setMemberData] = useState(null);
    const [loader, setLoader] = useState(false)
    const tenantId = useSelector((s) => s?.customerRedux?.Header_api_result_redux_function)
    const [detailMember, setDetailMember] = useState(null);
    const [header_api_result, setheader_api_result] = useState([]);
    const dispatch = useDispatch()
    const arr = [1, 2, 3]
    console.log(tenantId?.tenantId, "cbsdhcsdc")
    const router = useRouter();
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

                setheader_api_result(res?.CategoryList?.categorylist);
                console.log(res?.CategoryList?.categorylist?.[0], "sbdhsc")
            } catch (error) {
                console.error("Error fetching category list:", error);
            }
        };

        fetchCategoryList();
    }, []);

    useEffect(() => {
        const membershipApi = async () => {
            setLoader(true)
            let variable = {
                "filter": {
                    "limit": 10,
                    "offset": 0,
                },
                "tenantId": header_api_result?.[0]?.tenantId
            }

            if (tenantId !== 0 && tenantId !== null && tenantId !== undefined) {
                const res = await fetchGraphQl(GET_MEMBERSHIP_PLAN, variable)
                console.log(res, "cnjsdnf")
                if (res !== "") {
                    setLoader(false)
                    setMemberData(res?.MembershipLevelList?.MemnershipDtails)
                } else {
                    setLoader(true)
                }
                // dispatch(fetch_unique_id(res?.MembershipLevelList?.MemnershipDtails?.[0]?.Id))

            }
        }
        membershipApi()

    }, [header_api_result])

    // const handleChoose = async (Id) => {
    //     console.log(Id, "jdhsbd")
    //     let detailParams = {
    //         "subscriptionid": Id,
    //         "tenantId": header_api_result?.[0]?.tenantId

    //     }
    //     console.log(header_api_result?.[0]?.tenantId, "djnvkdndnv")
    //     try {
    //         const result = await fetchGraphQl(GET_MEMBERSHIP_DETAIL_PAGE, detailParams);

    //         console.log(result, "dsdsdsds")
    //         // setDetailMember(result?.MembershipLevelDetails?.MemnershipDtails)

    //         dispatch(Fetching_MemberDetail_redux(result?.MembershipLevelDetails?.MemnershipDtails))
    //         console.log((result?.MembershipLevelDetails?.MemnershipDtails), "tenantId")


    //         console.log(result?.MembershipLevelDetails?.MemnershipDtails, "memberId")
    //     } catch (err) {
    //         console.error("Error fetching category list:", err);
    //         setError(err.message);
    //     }

    // }


    return (
        <>
            <Blog_Header_Component />
            <section className='bg-[#FAFAFA] min-h-[calc(100vh-120px)] p-[26px_16px] flex flex-col 
                    max-md:min-h-[calc(100vh-68px)] max-xl:min-h-[calc(100vh-79px)]' >
                <div className='w-[90%] mx-auto max-[1400px]:w-full '>
                    <ul className='flex  items-center space-x-1 mb-[55px] max-[1300px]:mb-[24px]'>
                        <li>
                            <Link href="/">
                                <img src="/img/home.svg" alt="home" />
                            </Link>
                        </li>
                        <li>
                            <img src="/img/crumb-arrow.svg" alt="arrow" />
                        </li>
                        <li>
                            <Link href="/membership" className='text-[14px] font-normal leading-4 text-[#151618CC] hover:underline'>
                                Membership plan
                            </Link>
                        </li>
                        {/* <li>
                            <img src="/img/crumb-arrow.svg" alt="arrow" />
                        </li> */}
                        {/* <li>
                            <p className='text-[14px] font-semibold leading-4 text-[#120B14]'>
                                Checkout
                            </p>
                        </li> */}
                    </ul>
                </div>

                <div className='w-[90%] mx-auto max-[1400px]:w-full '>
                    <div className='max-w-[1014px] mx-auto'>
                        <h1 className='text-[36px] font-semibold leading-[40px] text-[#1D1D1F] mb-[14px] text-center max-sm:text-[26px] max-md:leading-[26px]'>Choose your membership</h1>
                        <p className='text-[16px] font-medium leading-[17px] text-[#83838D] mb-[80px] text-center max-[1300px]:mb-[24px]'>Choose plan and experience it now.</p>
                        <div className='grid grid-cols-3 gap-[24px] items-end max-md:grid-cols-1'>
                            {
                                loader ? (
                                    arr?.map(() => (
                                        <MembershipembershipLoader />
                                    ))
                                )

                                    :
                                    <>
                                        {
                                            memberData?.map((data, index) => (
                                                <div className='border-[1.5px] border-solid border-[#F0F0F0] p-[30px_32px] rounded-[12px] bg-white hover:shadow-[0px_4px_10px_0px_#9B9B9B40]'>
                                                    <h3 className='text-[18px] font-bold leading-[21px] text-[#151618CC] mb-[10px]'>{data?.SubscriptionName}</h3>
                                                    <p className='text-[14px] font-normal leading-[16px] text-[#1516188F] mb-[32px]'>{data?.SubscriptionName}</p>
                                                    <h2 className='text-[16px] font-normal text-[#1516188F]'><span className='text-[36px] font-semibold leading-[43px]
                         text-[#120B14]'>${data?.InitialPayment}</span>/
                                                        {data?.BillingfrequentType == 7 ? data?.BillingfrequentValue + " weeks" :
                                                            data?.BillingfrequentType == 30 ? data?.BillingfrequentValue + " month" :
                                                                data?.BillingfrequentType == 365 ? data?.BillingfrequentValue + " year" : data?.BillingfrequentValue + " days"
                                                        }</h2>
                                                    <Link className="bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[17px] rounded-[4px] text-center hover:bg-[#28282c]" href={`/membership/${data?.Id}`} >Choose plan</Link>
                                                </div>
                                            ))
                                        }
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MembershipPage