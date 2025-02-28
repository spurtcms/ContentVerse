import Auth_Header from '@/components/Header/page';
import Link from 'next/link';
import React from 'react';

const Membership = () => {
    return (
        <>
            <Auth_Header />
            <section className='bg-[#FAFAFA] min-h-[calc(100vh-120px)] p-[26px_16px] flex flex-col 
            max-md:min-h-[calc(100vh-68px)] max-xl:min-h-[calc(100vh-79px)]'>
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
                    <div className='max-w-[1014px] mx-auto'>
                        <h1 className='text-[36px] font-semibold leading-[40px] text-[#1D1D1F] mb-[14px] text-center max-sm:text-[26px] max-md:leading-[26px]'>Choose your membership</h1>
                        <p className='text-[16px] font-medium leading-[17px] text-[#83838D] mb-[80px] text-center max-[1300px]:mb-[24px]'>Choose plan and experience it now.</p>
                        <div className='grid grid-cols-3 gap-[24px] items-end max-md:grid-cols-1'>

                            <div className='border-[1.5px] border-solid border-[#F0F0F0] p-[30px_32px] rounded-[12px] bg-white hover:shadow-[0px_4px_10px_0px_#9B9B9B40]'>
                                <h3 className='text-[18px] font-bold leading-[21px] text-[#151618CC] mb-[10px]'>Free</h3>
                                <p className='text-[14px] font-normal leading-[16px] text-[#1516188F] mb-[32px]'>Billed annually</p>
                                <h2 className='text-[16px] font-normal text-[#1516188F]'><span className='text-[36px] font-semibold leading-[43px]
                                 text-[#120B14]'>$0</span>/month</h2>
                                <Link className="bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[17px] rounded-[4px] text-center hover:bg-[#28282c]" href="#">Choose plan</Link>

                            </div>

                            <div className=''>
                                <h3 className='text-[18px] font-semibold leading-[21px] text-center text-[#1D1D1F] mb-[20px]'>Most Popular</h3>
                                <div className='shadow-[0px_4px_10px_0px_#9B9B9B40] rounded-[12px]'>
                                    <div className='shadow-[0px_-3px_#1D1D1F] border-[1.5px] border-solid border-[#F0F0F0] p-[30px_32px] rounded-[12px] bg-white'>
                                        <h3 className='text-[18px] font-bold leading-[21px] text-[#151618CC] mb-[10px]'>Premium</h3>
                                        <p className='text-[14px] font-normal leading-[16px] text-[#1516188F] mb-[32px]'>Billed annually</p>
                                        <h2 className='text-[16px] font-normal text-[#1516188F]'><span className='text-[36px] font-semibold leading-[43px]
                                 text-[#120B14]'>$29</span>/month</h2>
                                        <Link className="bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[17px] rounded-[4px] text-center hover:bg-[#28282c]" href="#">Choose plan</Link>

                                    </div>
                                </div>
                            </div>

                            <div className='border-[1.5px] border-solid border-[#F0F0F0] p-[30px_32px] rounded-[12px] bg-white hover:shadow-[0px_4px_10px_0px_#9B9B9B40]'>
                                <h3 className='text-[18px] font-bold leading-[21px] text-[#151618CC] mb-[10px]'>Pro</h3>
                                <p className='text-[14px] font-normal leading-[16px] text-[#1516188F] mb-[32px]'>Billed annually</p>
                                <h2 className='text-[16px] font-normal text-[#1516188F]'><span className='text-[36px] font-semibold leading-[43px]
                                 text-[#120B14]'>$49</span>/month</h2>
                                <Link className="bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[24px] rounded-[4px] text-center hover:bg-[#28282c]" href="#">Choose plan</Link>

                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Membership;
