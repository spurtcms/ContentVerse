"use client"
import { fetchGraphQl } from "@/pages/api/graphicql";
import { GET_POSTS_LIST_QUERY, GET_RESET_NEW_PASSWORD } from "@/pages/api/query";
// import Header_component from "@/app/component/Header";
// import Auth_Header from "@/components/Header/page";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Blog_Header_Component from "@/components/Header/Blog_Header";
import { useDispatch } from "react-redux";
import { TenantId_redux } from "@/StoreConfiguration/slices/customer";


const NewPassword = () => {

    const [newSetPassword, setNewSetPaasword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(false);
    const [signupTenantId, setSignupTenantId] = useState("");
    const [signupUserId, setSignupUserId] = useState("");
    const [memberId, setMemberId] = useState("");
    const [submit, setSubmit] = useState(0);
    const [passwordError, setPasswordError] = useState("");
    const [errorPasswordShow, setErrorPasswordShow] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [confirmPassErrorShow, setConfirmPassErrShow] = useState(false);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
    const dispatch=useDispatch();
    const PasswordRegex = {
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    }
    const router=useRouter()
   console.log(signupTenantId,"vjfdvdvhdv")

    const params = useSearchParams()
    const token = params.get("token")
   
    console.log(token, "tokendesr")

  
    useEffect(() => {
        const fetchData = async () => {
            const variable_list = {
                "entryFilter": {
                    "categorySlug": "best-stories"
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

                const FetchValue = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list);
                setSignupTenantId(FetchValue?.ChannelEntriesList?.channelEntriesList[0].tenantId)
                dispatch(TenantId_redux(FetchValue?.ChannelEntriesList?.channelEntriesList[0].tenantId))
                setSignupUserId(FetchValue?.ChannelEntriesList?.channelEntriesList[0].createdBy)

            } catch (error) {

                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const validate_Password = () => {
        // let isValid = true;
        let validateObj = {
            newPassword: true,
            confirmPassword: true,
        };
        if (newSetPassword !== "") {
            if (!PasswordRegex.password.test(newSetPassword)) {
                setPasswordError("Password must be more than 8 characters");
                setErrorPasswordShow(true);
                validateObj.newPassword = false;
                // isValid = false;
            } else {
                setPasswordError("");
                setErrorPasswordShow(false);
                validateObj.newPassword = true
            }
        } else {
            setPasswordError("Password is required.");
            setErrorPasswordShow(true);
            validateObj.newPassword = false;
            // isValid = false;
            // return isValid;
        }




        if (confirmPassword == "") {
            setConfirmPasswordError("Confirm Password is Required");
            setConfirmPassErrShow(true)
            validateObj.confirmPassword = false;
        } else if (newSetPassword !== confirmPassword) {
            setConfirmPasswordError("Both the passwords don't match. Please re-enter the new password here.");
            setConfirmPassErrShow(true);
            validateObj.confirmPassword = false;
        } else {
            setConfirmPasswordError("");
            setConfirmPassErrShow(false)
            validateObj.confirmPassword = true;
        }


        if (validateObj.newPassword && validateObj.confirmPassword) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        if (submit === 1) {
            validate_Password()
        }

    }, [newSetPassword, confirmPassword])






    const handleClick = () => {
        setSubmit(1)
        if (validate_Password()) {
            const NewPasswordData = async () => {

                let setNewPassword_Params = {
                    "input": {
                        "newPassword": newSetPassword,
                        "confrimPassword": confirmPassword,
                        "token": token
                    }
                }

                try {
                    const res = await fetchGraphQl(GET_RESET_NEW_PASSWORD, setNewPassword_Params);
                    console.log(res, "whatDAtata")
                    const statusCode = res.status || 200;
                    if (statusCode === 200) {
                        console.log("MailRecived:", res);

                        router.push('/auth/reset-password')
                    } else {

                        // console.log({type:error , message:forgotPass_Call?.data?.message},"kjaweiusncskdf")
                        console.error(`Error: Received status code ${statusCode}`);
                    }

                }
                catch (err) {


                    console.log(err, "Password Error")

                }

            }

            NewPasswordData()
        }
    }


    const handlePasswordChange = (e) => {
        const { id, value } = e.target

        if (id == "newPassword") {
            setNewSetPaasword(value)
        }
        else if (id == "confrimPassword") {
            setConfirmPassword(value)
        }

    }


    return (
    <>
            {/* new password */}
            <head>
                <title>Change Password</title>
            </head>

            <Blog_Header_Component />

            <section className='bg-[#FAFAFA] min-h-[calc(100vh-120px)] p-[26px_16px] flex flex-col max-md:min-h-[calc(100vh-68px)] max-[1300px]:min-h-[calc(100vh-79px)] max-[1300px]:p-[16px]'>
                <div className='w-[90%] mx-auto max-[1400px]:w-full mb-auto'>
                    <ul className='flex space-x-1 mb-[55px] max-[1300px]:mb-[24px] items-center'>
                        <li>
                            <Link href="/">
                                <img src="/img/home.svg" alt="home" />
                            </Link>
                        </li>
                        <li>
                            <img src="/img/crumb-arrow.svg" alt="arrow" />
                        </li>
                        <li>
                            <Link href="/auth/signin" className='text-[14px] font-normal leading-4 text-[#151618CC] hover:underline'>
                                Login
                            </Link>
                        </li>
                        <li>
                            <img src="/img/crumb-arrow.svg" alt="arrow" />
                        </li>
                        <li>
                            <p className='text-[14px] font-semibold leading-4 text-[#120B14] '>
                               Change password
                            </p>
                        </li>
                    </ul>
                </div>


            <div className='max-w-[394px] mx-auto mb-[24px]'>
                <h1 className='text-[36px] font-semibold leading-[43px] text-[#1D1D1F] text-center mb-[17px] max-sm:text-[28px]'>Set New Password</h1>
                <p className='text-base font-medium leading-[17px] text-[#83838D] text-center mb-[40px] max-[1300px]:mb-[16px]'>Your new password must be different to previously passwords </p>
                <div className='bg-[#FFFFFF] border border-[#E9E9E9] p-[30px] rounded-[12px] max-w-[394px] mx-auto max-[1300px]:p-[16px]'>

                    <div className='mb-[24px] last-of-type:mb-0 max-[1300px]:mb-[16px]'>
                        <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Password</label>
                        <div className='relative flex items-center'>

                            <input placeholder="Enter your Password" type={`${hidePassword ? "password" : "text"}`} className={`border rounded-[4px] h-[42px] p-[6px_10px] text-black outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ${errorPasswordShow ? "border-[#EC1919]" : "border-[#00000029]"} `} id="newPassword" value={newSetPassword} onChange={handlePasswordChange} />
                            <button className='absolute right-[10px] p-0' onClick={(e) => setHidePassword(!hidePassword)}>
                                <img src="/img/hide-password.svg" alt="password" />
                            </button>

                        </div>
                        {
                            errorPasswordShow &&
                            <div className=' absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>
                                {passwordError}
                            </p></div>}
                        {/* <p className='text-[12px] font-medium leading-[14px] text-[#1516188F] mt-[10px]'>Must be less than 8 characters</p> */}
                    </div>

                    <div className='mb-[24px] last-of-type:mb-0 max-[1300px]:mb-[16px]'>
                        <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Confirm password</label>
                        <div className='relative flex items-center'>

                            <input placeholder="Enter your Password" type={`${hideConfirmPassword ? "password" : "text"}`} className={`border rounded-[4px] h-[42px] p-[6px_10px] text-black outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ${confirmPassErrorShow ? "border-[#EC1919]" : "border-[#00000029]"} `} id="confrimPassword" value={confirmPassword} onChange={handlePasswordChange} />
                            <button className='absolute right-[10px] p-0' onClick={(e) => setHideConfirmPassword(!hideConfirmPassword)}>
                                <img src="/img/hide-password.svg" alt="password" />
                            </button>


                        </div>
                        {
                            confirmPassErrorShow &&
                            <div className=' absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>
                                {confirmPasswordError}
                            </p></div>}
                    </div>

                    <Link href="#" className='bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[24px] rounded-[4px] text-center hover:bg-[#28282c]' onClick={handleClick}>Reset password</Link>
                </div>
                <div className="flex items-center space-x-[4px] mt-[30px] justify-center max-[1300px]:mt-[16px]"><p className="text-[12px] font-medium leading-[14px] text-[#1516188F]">Back to</p><Link href="/auth/signin" className="text-[12px] font-semibold leading-[14px] hover:underline text-[#1D1D1F]">Login</Link></div>

            </div>
      
        </section>
        </>
    )

}

export default NewPassword