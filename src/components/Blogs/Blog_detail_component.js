import React, { Fragment } from 'react'
import Blog_Header_Component from '../Header/Blog_Header'
import { useRouter } from 'next/router';
import moment from 'moment';
import DOMPurify from 'dompurify';
import Link from 'next/link';


const sanitizeHTML = (html) => {
    const sanitized = DOMPurify.sanitize(html, {
        // FORBID_TAGS: ['h1', 'img'], // Remove <h1> and <img> tags
        // FORBID_ATTR: ['style'], // Remove inline styles for consistency
    });
    // Remove first <img> tag found in the sanitized HTML
    return sanitized
        .replace(/<br>/g, ' ') // Replace <br> with spaces
        .replace(/<div className="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
        .replace(/<h1[^>]*>.*?<\/h1>/, "") // Remove the first <h1> tag and its content
        .replace(/<img[^>]*>/, ""); // Remove the first <img> tag, regardless of where it is
};
const Blog_detail_component = ({ postes, Total_Blogs_api_result, params }) => {
    console.log("asa3ssaassa", postes, Total_Blogs_api_result, params)
    const Detail_Result = postes?.ChannelEntryDetail
    const total_blogs_arr = Total_Blogs_api_result?.ChannelEntriesList?.channelEntriesList
    console.log("Total_Blogs_api_result", Detail_Result)
    let see_all_other_blogs = total_blogs_arr?.filter((item) => item?.slug !== params);
    let currentIndex = total_blogs_arr?.findIndex((item) => item?.slug === params);
    // Find previous and next data
    let previousData = null;
    let nextData = null;

    // If currentIndex is not the first item, we can get the previous data
    if (currentIndex > 0) {
        previousData = total_blogs_arr[currentIndex - 1];
    }

    // If currentIndex is not the last item, we can get the next data
    if (currentIndex < total_blogs_arr.length - 1) {
        nextData = total_blogs_arr[currentIndex + 1];
    }

    const router = useRouter();
    console.log(router, "router")
    const currentURL = `https://spurtcms.com${router.asPath}`; // Replace with your actual domain

    // Social share URLs
    // const shareUrls = {
    //     facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`,
    //     whatsapp: `https://wa.me/?text=${encodeURIComponent(currentURL)}`,
    //     instagram: `https://www.instagram.com/?url=${encodeURIComponent(currentURL)}`, // Note: Instagram doesn't support direct sharing URLs
    //     twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}`,
    // };

    const shareUrls = {
        facebook: `https://www.facebook.com/spurtcms`,
        youtube: `https://www.youtube.com/@spurtcms`,
        instagram: `https://www.instagram.com/spurtcms/`, // Note: Instagram doesn't support direct sharing URLs
        twitter: `https://twitter.com/spurtcms`,

    };

    return (
        <>
            <div>
                <Blog_Header_Component />
                <section>
                    <div
                        className="flex flex-col items-center mx-auto mb-[44px] max-[700px]:mb-[38px] px-[16px] py-[17px] max-w-[1295px]">
                        <p className="mb-[30px] font-normal text-[20px] text-center">
                            <span>@{`${Detail_Result?.authorDetails?.firstName} ${Detail_Result?.authorDetails?.lastName}`}</span>
                            {moment(Detail_Result?.createdOn)?.format("MMM DD, YYYY")} - {Detail_Result?.readingTime} {Detail_Result?.readingTime > 1 ? "minutes" : "minute"} read
                            {/* October 19, 2023 4 minutes read */}
                        </p>
                        <h4
                            className="mx-auto mb-[30px] max-w-[1188px] text-[#120B14] text-[70px] text-center max-[600px]:text-[42px] leading-[88px]">
                            {Detail_Result?.title}</h4>
                        {/* <p className="mx-auto mb-[62px] max-w-[919px] font-normal text-[#120B14] text-[26px] text-center">Every
                            person’s life is a narrative, a story unique to them alone. The richness of human experience lies in
                            the diversity of these stories—each filled with triumphs, challenges, and the unexpected.</p> */}
                        <div className="border-[#1516183D] px-[16px] pt-[13px] border-t border-solid w-auto">
                            <h6 className="font-[600] text-[#120B14] text-[20px] text-center break-all">
                                Tags:
                                {/* #innovation, #creative, #technology, #ai */}

                                {Detail_Result?.categories?.[0]?.map((val, i) => (
                                    <Fragment key={i}>
                                        {val?.categoryName == "Blog" ? <></> :
                                            <>
                                                {i == 0 ? <></> : <>,</>}   #{val?.categoryName}

                                            </>}

                                    </Fragment>
                                ))}

                                {console.log("Detail_Result", Detail_Result)}
                            </h6>
                        </div>
                    </div>

                    <div
                        className="flex flex-col items-start gap-[40px] mx-auto mb-[124px] max-[700px]:mb-[38px] px-[16px] max-w-[1076px]">

                        <div>
                            <div
                                className="pr-[12px] max-[700px]:pr-0 "
                                style={{ color: 'black' }}
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHTML(Detail_Result?.description)
                                }}
                            >
                            </div>

                        </div>


                        <div className="flex flex-col items-start">

                            {/* <div className="flex justify-between items-center gap-[16px] mx-auto px-[16px] w-full max-w-[375px]">
                                <a href={shareUrls.twitter} className="hover:opacity-[0.8]" target='_blank'>
                                    <img src="/img/block-detail-foot-1.svg" alt="" />
                                </a>
                                <a href={shareUrls.facebook} className="hover:opacity-[0.8]" target='_blank'>
                                    <img src="/img/block-detail-foot-2.svg" alt="" />
                                </a>
                                <a href={shareUrls.instagram} className="hover:opacity-[0.8]" target='_blank'>
                                    <img src="/img/block-detail-foot-3.svg" alt="" />
                                </a>
                                <a href="#" className="hover:opacity-[0.8]">
                                    <img src="/img/block-detail-foot-4.svg" alt="" />
                                </a>
                            </div> */}
                        </div>
                    </div>

                    <div
                        className="flex max-[500px]:flex-col justify-between items-start gap-[16px] mx-auto mb-[47px] px-[16px] max-w-[1296px]">
                        {/* {previousData && <> */}
                        <a href={`/blogs/${previousData?.slug}`} className="flex flex-col items-start" style={{ visibility: previousData ? "" : "hidden" }}>
                            <p
                                className="border-[#EDEDED] mb-[17px] max-[500px]:mb-[12px] pb-[20px] max-[500px]:pb-[14px] border-b border-solid font-normal text-[25px] max-[500px]:text-[18px]">
                                Previous blog
                            </p>
                            <h5
                                className="py-[15px] line-clamp-3 max-w-[458px] font-normal text-[#120B14] text-[36px] max-[500px]:text-[24px]">
                                {previousData?.title}
                            </h5>
                        </a>
                        {/* </>} */}

                        <a href={`/blogs/${nextData?.slug}`} className="flex flex-col items-end pb-[15px]" style={{ visibility: nextData ? "" : "hidden" }}>
                            <p
                                className="text-right border-[#EDEDED] mb-[17px] max-[500px]:mb-[12px] pb-[20px] max-[500px]:pb-[14px] border-b border-solid font-normal text-[25px] max-[500px]:text-[18px]">
                                Next blog</p>
                            <h5
                                className="text-right py-[15px] line-clamp-3 max-w-[458px] font-normal text-[#120B14] text-[36px] max-[500px]:text-[24px] pb-0">
                                {nextData?.title}</h5>
                        </a>
                    </div>

                    {/* <div className="mx-auto mb-[16px] px-[16px] max-w-[1296px]">
                        <a href="#" className="font-normal text-[#120B14] text-[24px] hover:underline">Next for you</a>
                    </div>

                    <div className="bg-[#EFFC06]">
                        <div className="mx-auto px-[16px] py-[60px] max-[600px]:py-[32px] max-w-[1296px]">
                            <div
                                className="items-center gap-[125px] max-[800px]:gap-[32px] grid grid-cols-2 max-[800px]:grid-cols-1 mb-[70px] max-[600px]:mb-[38px] align-center">
                                <div className="flex flex-col items-start">
                                    <div className="flex items-center gap-[10px] mb-[38px] max-[500px]:mb-[24px]">
                                        <div className="rounded-full w-[47.27px] h-[47.27px]">
                                            <img src="/img/profiile.png" alt="" className="rounded-full w-full h-full" />
                                        </div>
                                        <p className="font-normal text-[#120B14] text-[20px]"><span>@damian</span> October 19,
                                            2023 4 minutes read</p>
                                    </div>
                                    <h4
                                        className="mb-[30px] max-[500px]:mb-[24px] font-normal text-[#120B14] text-[60px] max-[600px]:text-[38px]">
                                        The portal to parallel
                                        realities</h4>

                                    <p className="font-normal text-[#120B14] text-[24px]">In the age of technological innovation,
                                        mobile applications have become gateways
                                        to virtual realms, offering users immersive experiences that often blur the lines
                                        between reality and the digital landscape.</p>
                                </div>
                                <div className="w-full">
                                    <img src="/img/naxt-block.png" alt="" className="h-auto" />
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <a href="#"
                                    className="flex justify-center items-center bg-[#120B14] hover:bg-[#39333b] mx-auto px-[18px] rounded-[50px] w-full max-w-[500px] h-[79px] font-medium text-[24px] text-white">Continue
                                    reading post</a>
                            </div>
                        </div>
                    </div>
 */}
                    <div className="relative bg-image">
                        <div className="top-0 left-0 absolute bg-[#120b1461] w-full h-full"></div>
                        <div
                            className="relative z-20 flex max-[800px]:flex-col justify-between items-end gap-[18px] mx-auto px-[16px] max-[500px]:py-[32px] pt-[83px] pb-[122px] max-w-[1295px]">
                            <div className="flex flex-col items-start">
                                <h3 className="font-normal text-[24px] text-white">Membership</h3>
                                <p className="font-normal text-[40px] text-white max-[500px]:text-[28px]">Unlock full access to
                                    <span className="font-medium"> spurtcms</span> and see the entire library of <span
                                        className="font-medium">paid-members</span> only posts
                                </p>
                            </div>
                            <Link href="/membership"
                                className="flex items-center bg-[#F33151] hover:bg-[#f15e76] px-[46px] max-[500px]:px-[23px] rounded-[50px] max-w-[269px] h-[79px] font-medium text-[24px] text-white max-[500px]:text-[18px] whitespace-nowrap">Sign
                                up for free</Link>
                        </div>
                    </div>
                    <div className="mx-auto px-[16px] pt-[109px] max-[500px]:pt-[48px] max-w-[1295px]">
                        <div
                            className="flex max-[600px]:flex-col justify-between items-end gap-[16px] border-[#1516183D] mb-[62px] pb-[2.625rem] border-b border-solid">
                            <div className="flex flex-col items-start max-w-[587px]">
                                <h4 className="mb-[50px] font-[700] text-[#151515] text-[54px] max-[500px]:text-[32px]">SpurtCMS
                                </h4>
                                <p className="font-normal text-[#211F1F] text-[20px]">Versatile and functional theme for running a
                                    free or paid-membership publication on Ghost.</p>
                            </div>
                            <div className="flex items-center gap-[30px]">
                                <a href={shareUrls.facebook} className="flex justify-center items-center w-[40px] h-[40px] hover:opacity-[0.8]" target='_blank'>
                                    <img src="/img/fb.svg" alt="" />
                                </a>
                                <a href={shareUrls.youtube} className="flex justify-center items-center w-[40px] h-[40px] hover:opacity-[0.8]" target='_blank'>
                                    <img src="/img/youtube.svg" alt="" />
                                </a>
                                <a href={shareUrls.instagram} className="flex justify-center items-center w-[40px] h-[40px] hover:opacity-[0.8]" target='_blank'>
                                    <img src="/img/insta.svg" alt="" />
                                </a>
                                {/* <a href="#" className="flex justify-center items-center w-[40px] h-[40px] hover:opacity-[0.8]">
                                    <img src="/img/v.svg" alt="" />
                                </a> */}
                            </div>
                        </div>
                        {/* <div className="gap-[24px] grid grid-cols-5 max-[500px]:grid-cols-2 max-[800px]:grid-cols-3 mb-[50px]">
                            <div className="flex flex-col items-start">
                                <h3 className="mb-[28px] font-[600] text-[#211F1F] text-[24px]">About</h3>
                                <ul className="flex flex-col gap-[24px]">
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Style
                                            Guide</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Features</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Contact</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">404</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Get
                                            Theme</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-start">
                                <h3 className="mb-[28px] font-[600] text-[#211F1F] text-[24px]">Features</h3>
                                <ul className="flex flex-col gap-[24px]">
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Demos</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Authors</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Tags</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Light
                                            version</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Dark
                                            version</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Sepia
                                            version</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">404</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Search</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-start">
                                <h3 className="mb-[28px] font-[600] text-[#211F1F] text-[24px]">Members</h3>
                                <ul className="flex flex-col gap-[24px]">
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Account</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="font-medium text-[#211F1FC2] text-base hover:text-black">Membership</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="font-medium text-[#211F1FC2] text-base hover:text-black">Subscriber</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Tags</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Author</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-start">
                                <h3 className="mb-[28px] font-[600] text-[#211F1F] text-[24px]">Contact</h3>
                                <ul className="flex flex-col gap-[24px]">
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Account</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="font-medium text-[#211F1FC2] text-base hover:text-black">Membership</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="font-medium text-[#211F1FC2] text-base hover:text-black">Subscriber</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Tags</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Author</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-start">
                                <h3 className="mb-[28px] font-[600] text-[#211F1F] text-[24px]">Resource</h3>
                                <ul className="flex flex-col gap-[24px]">
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Demos</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Docs</a>
                                    </li>
                                    <li>
                                        <a href="#" className="font-medium text-[#211F1FC2] text-base hover:text-black">Showcase</a>
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
export default Blog_detail_component