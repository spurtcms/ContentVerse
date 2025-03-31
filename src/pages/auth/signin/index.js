"use client"

import { GET_POSTS_LIST_QUERY, GET_SIGNIN_QUERY } from '@/pages/api/query'
// import Header_component from '@/app/component/Header'
import Blog_Header_Component from '@/components/Header/Blog_Header'
// import Auth_Header from '@/components/Header/page'
import { fetchGraphQl } from '@/pages/api/graphicql'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { channelName } from '@/pages/api/url'



const Signin = () => {

    const [signup_Email, setSignup_Email] = useState("");
    const [signup_Password, setSignup_Password] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailStateError, setEmailStateError] = useState(false);

    const [passwordError, setPasswordError] = useState("");
    const [passwordStateError, setPasswordStateError] = useState(false);
    const [signup_Submit, setSignup_Submit] = useState(0);

    const [signupTenantId, setSignupTenantId] = useState("");
    const [signupUserId, setSignupUserId] = useState("");

    const [hidePassword, setHidePassword] = useState(false);
    const router = useRouter();

    const signupRegex = {
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    };



    useEffect(() => {
        const fetchData = async () => {
            const variable_list = {
                "entryFilter": {
                    "categorySlug": "best-stories",
                    "ChannelName": channelName
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
                setSignupUserId(FetchValue?.ChannelEntriesList?.channelEntriesList[0].createdBy)

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);



    useEffect(() => {
        if (signup_Submit === 1) {
            validate_signup();
        }
    }, [signup_Email, signup_Password]);

    const validate_signup = () => {
        let isValid = true;



        if (signup_Email !== '') {
            if (!signupRegex.email.test(signup_Email)) {
                setEmailError("Invalid email format.");
                setEmailStateError(true);
                isValid = false;
            } else {
                setEmailError("");
                setEmailStateError(false);
            }
        } else {
            setEmailError("Email is required.");
            setEmailStateError(true);
            isValid = false;
        }

        if (signup_Password !== '') {
            if (!signupRegex.password.test(signup_Password)) {
                setPasswordError("Password must be more than 8 characters and contain at least 1 number and 1 special character.");
                setPasswordStateError(true);
                isValid = false;
            } else {
                setPasswordError("");
                setPasswordStateError(false);
            }
        } else {
            setPasswordError("Password is required.");
            setPasswordStateError(true);
            isValid = false;
        }

        return isValid;
    };


    const submit_signup = (e) => {
        e.preventDefault()
        setSignup_Submit(1);

        if (validate_signup()) {
            const fetchData = async () => {
                const register_list = {
                    "input": {
                        "email": signup_Email,
                        "password": signup_Password,
                        "userId": signupUserId,
                        "tenantId": signupTenantId,
                    }
                };

                console.log("register_list", register_list)
                try {

                    const response = await fetchGraphQl(GET_SIGNIN_QUERY, register_list);

                    console.log(response, "response")

                    response?.memberCheckLogin?.email ? response?.memberCheckLogin?.password ? (setPasswordError(""), setPasswordStateError(false)) : (setPasswordError("Invalid Password"), setPasswordStateError(true)) : (setEmailError("Invalid Email"), setEmailStateError(true));

                    response?.memberCheckLogin?.success && router.push("/")

                    const userToken = response?.memberCheckLogin?.token;

                    Cookies.set('authToken', userToken);

                } catch (error) {
                    console.error("Error fetching data:", error);
                }

            };


            fetchData();


        } else {
            console.log("Form is invalid");
        }
    };

    const handleSignup = (event) => {
        const { id, value } = event.target;
        if (id == "name") {
            set(value)
        }
        else if (id == "email") {
            setSignup_Email(value)
        }

        else if (id == "password") {
            setSignup_Password(value)
        }
    };

    return (
        <>

            <head>
                <title>Signin</title>
            </head>

            <Blog_Header_Component />
            <section className='bg-[#FAFAFA] min-h-[calc(100vh-120px)] p-[26px_16px] flex flex-col max-md:min-h-[calc(100vh-68px)] max-[1300px]:p-[16px] max-[1300px]:min-h-[calc(100vh-79px)]'>
                <div className='w-[90%] mx-auto max-[1400px]:w-full max-[1600px]:mb-auto mb-0'>
                    <ul className='flex space-x-1 mb-[24px] items-center'>
                        <li>
                            <a href="/">
                                <img src="/img/home.svg" alt="home" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="/img/crumb-arrow.svg" alt="arrow" />
                            </a>
                        </li>
                        <li>
                            <p className='text-[14px] font-semibold leading-4 text-[#120B14] '>
                                Login
                            </p>
                        </li>
                    </ul>
                </div>
                <div className='w-[90%] mx-auto max-[1400px]:w-full  mb-auto'>
                    <div className='max-w-[394px] mx-auto'>
                        <h1 className='text-[36px] font-semibold leading-[43px] text-[#1D1D1F] text-center mb-[16px] max-sm:text-[28px] max-[1300px]:mb-[10px]'>Log in to your account</h1>
                        <p className='text-base font-medium leading-[17px] text-[#83838D] text-center mb-[24px] max-[1300px]:mb-[16px]'>Welcome back! Please enter your details.</p>
                        <div className='bg-[#FFFFFF] border border-[#E9E9E9] p-[30px] rounded-[12px]'>
                            <div className='mb-[24px] last-of-type:mb-0 relative'>
                                <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Email</label>
                                <input placeholder='Enter your Email' type="text" className={`border rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] text-black placeholder:text-[#1516188F] ${emailStateError ? "border-[#EC1919]" : "border-[#00000029]"} `} id="email" value={signup_Email} onChange={(e) => handleSignup(e)} />

                                {emailStateError &&
                                    <div className='absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>{emailError} </p></div>}
                            </div>
                            <div className='mb-[10px] last-of-type:mb-0 relative'>
                                <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Password</label>
                                <div className='relative flex items-center'>
                                    <input placeholder="Enter your Password" type={`${hidePassword ? "text" : "password"}`} className={`border rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] text-black placeholder:text-[#1516188F] ${passwordStateError ? "border-[#EC1919]" : "border-[#00000029]"} `} id="password" value={signup_Password} onChange={(e) => handleSignup(e)} />
                                    <button className='absolute right-[10px] p-0' onClick={(e) => setHidePassword(!hidePassword)}>
                                        <img src="/img/hide-password.svg" alt="password" />
                                    </button>
                                </div>
                                {passwordStateError &&
                                    <div className=' flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>{passwordError} </p></div>}
                            </div>

                            <div className='flex justify-between items-center'>
                                {/* <div className='flex items-center space-x-[8px]'>
                                    <input id="check1" className="cursor-pointer block w-[14px] h-[14px] border-[#00000026] checked:!bg-[#1D1D1F] rounded-[4px] shadow-none !outline-none focus:ring-0 focus:outline-none accent-black" type="checkbox" name="termCheck" />
                                    <label htmlFor="check1" className='text-[12px] font-medium leading-[14px] text-[#151618CC] cursor-pointer'>Remember Password</label>
                                </div> */}


                                <Link href="/auth/forgot-password" className='text-[12px] font-semibold leading-[14px] hover:underline text-[#1D1D1F]'> Forgot Password</Link>
                                {/* <a href="/auth/forgot-password" className='text-[12px] font-medium leading-[14px] text-[#1D1D1F] hover:underline'>Forgot Password ?</a> */}
                            </div>
                            <button onClick={(e) => submit_signup(e)} className='bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[32px] rounded-[4px] text-center hover:bg-[#28282c] max-[1300px]:mt-[16px]'>Sign In</button>
                        </div>
                        <div className='flex items-center space-x-[4px] mt-[30px] justify-center max-[1300px]:mt-[16px]'>
                            <p className='text-[12px] font-medium leading-[14px] text-[#1516188F]'>Don't have an account?</p>
                            <Link href="/auth/signup" className='text-[12px] font-semibold leading-[14px] hover:underline text-[#1D1D1F]'>Sign up</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Signin
