import React from 'react'

export const Home_skeletonLoader = () => {
    return (
        <>
        
            <div className="bg-[#EFFC06]">
                <div className="mx-auto px-[16px] max-w-[1295px]">
                    <div className="flex max-[550px]:flex-col items-start gap-[45px] pb-[77px] max-[700px]:pb-[38px]">

                        {/* Skeleton for first column */}
                        <div className="flex flex-col pr-[15px] w-full max-w-[541px]">
                            <div className="mb-[14px] w-full h-60 max-w-[526px] bg-gray-300 rounded-lg animate-pulse"></div>
                            <div className="flex flex-col items-start">
                                <div className="mb-[14px] w-[200px] h-[20px] bg-gray-300 animate-pulse"></div>
                                <div className="mb-[24px] w-[400px] h-[40px] bg-gray-300 animate-pulse"></div>
                                <div className="w-[350px] h-[22px] bg-gray-300 animate-pulse"></div>
                            </div>
                        </div>

                        {/* Skeleton for grid layout */}
                        <div className="gap-[60px] gap-y-[58px] max-[500px]:gap-y-[28px] grid grid-cols-2 max-[800px]:grid-cols-1 pt-[4.0625rem] max-[800px]:pt-0">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <div key={idx} className="flex flex-col items-start">
                                    <div className='bg-gray-300 rounded-lg animate-pulse w-full h-60'>
                                    <div className="mb-[12px] max-w-[326px] max-[550px]:max-w-full bg-gray-300 h-[200px] animate-pulse"></div>
                                    <div className="w-[180px] h-[20px] bg-gray-300 animate-pulse"></div>
                                    <div className="w-[250px] h-[30px] bg-gray-300 animate-pulse mt-[10px]"></div>
                                </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
