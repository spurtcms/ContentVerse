import React from "react";

export const Home_skeletonLoader = () => {
  return (
    <>
      <div className="bg-[#EFFC06]">
        <div className="mx-auto px-[16px] max-w-[1295px]">
          <div className="flex max-[550px]:flex-col items-start gap-[45px] pb-[77px] max-[700px]:pb-[38px]">
            {/* Skeleton for first column */}
            <div className="flex flex-col pr-[15px] w-full max-w-[541px]">
              <div class="flex items-center justify-center h-[400px] mb-4 bg-gray-300  rounded-3xl animate-pulse  ">
                <svg
                  class="w-10 h-10 text-gray-200 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <div className="mb-[14px] w-[400px] h-[10px] bg-gray-300 animate-pulse"></div>
                <div className="mb-[24px] w-[450px] h-[40px] bg-gray-300 animate-pulse"></div>
                <div className="mb-[24px] w-[450px] h-[40px] bg-gray-300 animate-pulse"></div>
                <div className="mb-[24px] w-[300px] h-[40px] bg-gray-300 animate-pulse"></div>
                <div className="mb-[10px] w-[500px] h-[15px] bg-gray-300 animate-pulse"></div>
                <div className="mb-[10px] w-[500px] h-[15px] bg-gray-300 animate-pulse"></div>
                <div className="mb-[10px] w-[500px] h-[15px] bg-gray-300 animate-pulse"></div>
                <div className="mb-[10px] w-[500px] h-[15px] bg-gray-300 animate-pulse"></div>
                <div className="mb-[10px] w-[500px] h-[15px] bg-gray-300 animate-pulse"></div>
              </div>
            </div>

            {/* Skeleton for grid layout */}
            <div className="gap-[60px] gap-y-[58px] max-[500px]:gap-y-[28px] grid grid-cols-2 max-[800px]:grid-cols-1 pt-[4.0625rem] max-[800px]:pt-0">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex flex-col items-start">
                    <div className="mb-[12px] flex items-center justify-center h-[200px] w-[300px] bg-gray-300  rounded-3xl animate-pulse ">
                      <svg
                        class="w-10 h-10 text-gray-200 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 20"
                      >
                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                      </svg>
                    </div>
                    <div className="w-[180px] h-[10px] bg-gray-300 animate-pulse"></div>
                    <div className="w-[250px] h-[30px] bg-gray-300 animate-pulse mt-[10px]"></div>
                    <div className="w-[250px] h-[30px] bg-gray-300 animate-pulse mt-[10px]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
