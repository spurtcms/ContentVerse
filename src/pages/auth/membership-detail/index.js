import Auth_Header from '@/components/Header/page';
import Link from 'next/link';
import React from 'react';

const Membership_Detail = () => {
    return (
        <>
            <Auth_Header />
            <section className='bg-[#FAFAFA] min-h-[calc(100vh-120px)] p-[26px_16px] flex flex-col max-md:min-h-[calc(100vh-68px)] max-xl:min-h-[calc(100vh-79px)]'>
                <div className='w-[90%] mx-auto max-[1400px]:w-full '>
                    <ul className='flex  items-center space-x-1 mb-[55px] max-sm:mb-[24px]'>
                        <li>
                            <Link href="/">
                                <img src="/img/home.svg" alt="home" />
                            </Link>
                        </li>
                        <li>
                            <img src="/img/crumb-arrow.svg" alt="arrow" />
                        </li>
                        <li>
                            <Link href="/login" className='text-[14px] font-normal leading-4 text-[#151618CC] hover:underline'>
                                Membership plan
                            </Link>
                        </li>
                        <li>
                            <img src="/img/crumb-arrow.svg" alt="arrow" />
                        </li>
                        <li>
                            <p className='text-[14px] font-semibold leading-4 text-[#120B14]'>
                                Checkout
                            </p>
                        </li>
                    </ul>
                </div>
                <div className='w-[90%] mx-auto max-[1400px]:w-full '>
                    <div className='max-w-[803px] mx-auto'>
                        <h1 className='text-[32px] font-semibold leading-[40px] text-[#1D1D1F]  mb-[40px] max-sm:mb-[20px] max-sm:text-[28px]'>Membership Checkout</h1>
                        <div className='bg-white border border-[#E9E9E9] rounded-[12px] p-[40px] mb-[30px] max-sm:p-[16px]'>
                            <h3 className='text-[20px] font-semibold leading-[24px] mb-[40px] max-sm:mb-[20px]'>Your membership information</h3>
                            <p className='text-base font-normal leading-[19px] text-[#1D1D1F]'>You have selected the <span className='font-bold'>Premium</span> membership level.</p>
                            <div className='flex items-center justify-between border border-[#D7D7D7] bg-[#F8F8F8] p-[20px] rounded-[12px] mt-[16px] gap-[16px] max-sm:grid max-sm:grid-cols-2'>
                                <div >
                                    <h3 className='text-[18px] font-bold text-[#151618CC] leading-[21px] mb-[10px]'>Premium</h3>
                                    <p className='text-[14px] font-normal text-[#1516188F] leading-[16px] '>Billed annually</p>
                                </div>
                                <div>
                                    <p className='text-[16px] font-normal text-[#1516188F]'><span className='text-[24px] font-semibold leading-[29px]
                                 text-[#120B14]'>$29</span>/month</p>
                                </div>
                                <div className='max-sm:col-span-2'>
                                    <Link className="bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-fit block h-[42px] font-semibold text-[#FFFFFF] rounded-[4px] text-center hover:bg-[#28282c] max-sm:w-full" href="#">Choose plan</Link>
                                </div>
                            </div>

                            <div className='w-full rounded-[12px] overflow-hidden my-[16px] '>
                                <img src="/img/detail-banner.svg" alt="banner" className='w-full h-full object-cover' />
                            </div>
                            <p className='text-base font-normal leading-[26px] text-[#1D1D1F]' >If you’re serious about making the change, become a Professional member today. We are ready to provide an interactive experience that will help you level up in no time. The price for membership. If you’re serious about making the change, become a Professional member today. We are ready to provide an interactive experience that will help you level up in no time. The price for membership. If you’re serious about making the change, become a Professional member today. We are ready to provide an interactive experience that will help you level up in no time. The price for membership is $29.00 per Month.</p>
                        </div>

                        <div className='bg-white border border-[#E9E9E9] rounded-[12px] p-[40px] mb-[30px] max-sm:p-[16px]'>
                            <h3 className='text-[20px] font-semibold leading-[24px] mb-[40px] text-[#1D1D1F]'>Account Information</h3>

                            <div className='grid grid-cols-2 gap-x-[20px] gap-y-[30px] max-sm:grid-cols-1'>
                                <div className='col-span-2 max-sm:col-span-1'>
                                    <label className="text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[10px]">User name</label>
                                    <input placeholder='Eg: Steve Job' type="text" className="border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] " />
                                </div>
                                <div >
                                    <label className="text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[10px]">Email Address</label>
                                    <input placeholder='Eg: steve.job@example.com' type="text" className="border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] " />
                                </div>
                                <div >
                                    <label className="text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[10px]">Confirm Email Address</label>
                                    <input placeholder='Eg: steve.job@example.com' type="text" className="border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] " />
                                </div>
                                <div ><label className="text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[10px]">Password</label><div className="relative flex items-center">
                                    <input placeholder='Password' type="text" className="border border-[#00000029] rounded-[4px] h-[42px] p-[6px_36px_6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] " />
                                    <a href="#" className="absolute right-[10px]">
                                        <img src="/img/hide-password.svg" alt="password" /></a>
                                </div></div>
                                <div><label className="text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[10px]">Confirm password</label><div className="relative flex items-center">
                                    <input placeholder='Password' type="text" className="border border-[#00000029] rounded-[4px] h-[42px] p-[6px_36px_6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] " />
                                    <a href="#" className="absolute right-[10px]">
                                        <img src="/img/hide-password.svg" alt="password" /></a>
                                </div></div>
                            </div>

                        </div>

                        <div className='bg-white border border-[#E9E9E9] rounded-[12px] p-[40px] mb-[30px] max-sm:p-[16px]'>
                            <h3 className='text-[20px] font-semibold leading-[24px] mb-[40px] text-[#1D1D1F]'>Company Information</h3>

                            <div className='grid grid-cols-2 gap-x-[20px] gap-y-[30px] max-sm:grid-cols-1'>
                                <div className='col-span-2 max-sm:col-span-1'>
                                    <label className="text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[10px]">Company Name</label>
                                    <input placeholder='Eg: Apple' type="text" className="border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] " />
                                </div>
                                <div className='col-span-2 max-sm:col-span-1'>
                                    <label className="text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[10px]">Position</label>
                                    <input placeholder='Eg: Product Designer' type="text" className="border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] " />
                                </div>

                            </div>

                        </div>

                        <Link className="bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] rounded-[4px] text-center hover:bg-[#28282c]" href="#">Checkout</Link>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Membership_Detail;
