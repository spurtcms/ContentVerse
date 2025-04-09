import React from 'react'

function NavBarSkeleton() {
    return (
        <div >
            <div className="top-0 left-[-100%] z-10 lg:z-0  lg:static fixed flex flex-col lg:items-center gap-[1.5vw] bg-white lg:bg-[transparent] px-5 lg:px-0 py-5 lg:py-0 w-[50%] lg:w-auto max-[600px]:w-full h-full lg:h-auto duration-500 navLinks">
                <ul className="flex lg:flex-row flex-col gap-[30px] lg:py-[20px] w-full lg:w-auto  ">
                    <li className="flex justify-end lg:hidden w-full">
                        <a className="ml-auto w-4 text-[30px] cursor-pointer rounded-lg animate-pulse bg-gray-300">

                        </a>
                    </li>

                </ul>

            </div>
        </div>
    )
}

export default NavBarSkeleton