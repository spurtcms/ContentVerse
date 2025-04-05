"use client"
import { fetchGraphQl } from '@/pages/api/graphicql';
import { GET_POSTS_LIST_QUERY, GET_REGISTER_QUERY } from '@/pages/api/query';
// import Header_component from '@/app/component/Header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Blog_Header_Component from '@/components/Header/Blog_Header';
import { channelName } from '@/pages/api/url';


const Signup = () => {
    const [signup_Name, setSignup_Name] = useState("");
    const [signup_Email, setSignup_Email] = useState("");
    const [signup_Password, setSignup_Password] = useState("");

    const [nameError, setNameError] = useState("");
    const [nameStateError, setNameStateError] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [emailStateError, setEmailStateError] = useState(false);

    const [passwordError, setPasswordError] = useState("");
    const [passwordStateError, setPasswordStateError] = useState(false);
    const [signup_Submit, setSignup_Submit] = useState(0);

    const [signupTenantId, setSignupTenantId] = useState("");
    const [signupUserId, setSignupUserId] = useState("");
    const [hidePassword, setHidePassword] = useState(false);

    const [loginResponse, setLoginResponse] = useState(false);

    const router = useRouter();

    const signupRegex = {
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        name: /^[A-Za-z]{3,}$/
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
    }, [signup_Name, signup_Email, signup_Password]);

    const validate_signup = () => {
        let isValid = true;

        if (signup_Name !== '') {

            if (!signupRegex.name.test(signup_Name)) {
                setNameError("Name must be at least 3 characters long");
                setNameStateError(true);
                isValid = false;
            } else {
                setNameError("");
                setNameStateError(false);
            }
        } else {
            setNameError("Name is required.");
            setNameStateError(true);
            isValid = false;
        }

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


    const submit_signup = () => {
        setSignup_Submit(1);
        if (validate_signup()) {
            const fetchData = async () => {
                const register_list = {
                    "input": {
                        "firstName": signup_Name,
                        "password": signup_Password,
                        "userId": signupUserId,
                        "tenantId": signupTenantId,
                        "email": signup_Email
                    }
                };

                console.log("register_list", register_list)
                try {
                    const response = await fetchGraphQl(GET_REGISTER_QUERY, register_list);
                    console.log(" response", response?.memberRegister)
                    if (response?.memberRegister) {
                        router.push("/");
                    } else {
                        setEmailError("Email already exists")
                        setEmailStateError(true)
                    }
                    // setLoginResponse(response)
                    // loginResponse?.memberRegister == true ? router.push("/") : (setEmailError("Email already exists"), setEmailStateError(true));
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
            setSignup_Name(value)
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
                <title>Signup</title>
            </head>
            <Blog_Header_Component />
            <section className='bg-[#FAFAFA] min-h-[calc(100vh-120px)] p-[16px] flex flex-col
             max-md:min-h-[calc(100vh-68px)] max-xl:min-h-[calc(100vh-79px)] max-[1300px]:p-[16px]'>
                <div className='w-[90%] mx-auto max-[1400px]:w-full max-[1600px]:mb-auto mb-0'>
                    <ul className='flex space-x-1 items-center mb-[24px] max-[1300px]:mb-[14px] '>
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
                            <p className='text-[14px] font-semibold leading-4 text-[#120B14] '>Sign up</p>
                        </li>
                    </ul>
                </div>
                <div className='w-[90%] mx-auto max-[1400px]:w-full '>
                    <div className='max-w-[394px] mx-auto'>
                        <h1 className='text-[36px] font-semibold leading-none text-[#1D1D1F] text-center mb-[16px] max-sm:text-[24px] max-[1300px]:mb-[8px] max-[1300px]:text-[32px] max-[1300px]:leading-none '>Create an account</h1>
                        <p className='text-base font-medium leading-[17px] text-[#83838D] text-center mb-[24px] max-[1300px]:mb-[16px] max-sm:text-[14px] '>Thank you for choosing us. Give your details</p>

                        <div className='bg-[#FFFFFF] border border-[#E9E9E9] p-[30px] rounded-[12px] max-[1300px]:p-[16px]'>
                            <div className='mb-[24px] last-of-type:mb-0  relative'>
                                <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>User name</label>
                                <input placeholder='Eg: Steve Jobs' type="text" className={`border rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] text-black placeholder:text-[#1516188F] ${nameStateError ? "border-[#EC1919]" : "border-[#00000029]"} `} id="name" value={signup_Name} onChange={handleSignup} />
                                {nameStateError &&
                                    <div className='absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>{nameError} </p></div>}
                            </div>

                            <div className='mb-[24px] last-of-type:mb-0  relative'>
                                <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Email</label>
                                <input placeholder='Enter your Email' type="text" className={`border rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] text-black placeholder:text-[#1516188F] ${emailStateError ? "border-[#EC1919]" : "border-[#00000029]"} `} id="email" value={signup_Email} onChange={handleSignup} />

                                {emailStateError &&
                                    <div className='absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>{emailError} </p></div>}
                            </div>

                            <div className='mb-[24px] last-of-type:mb-0  relative'>
                                <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Password</label>
                                <div className='relative flex items-center'>
                                    <input placeholder="Enter your Password" type={`${hidePassword ? "text" : "password"}`} className={`border rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] text-black font-normal leading-[16px] placeholder:text-[#1516188F] ${passwordStateError ? "border-[#EC1919]" : "border-[#00000029]"} `} id="password" value={signup_Password} onChange={handleSignup} />
                                    <button className='absolute right-[10px] p-0' onClick={(e) => setHidePassword(!hidePassword)}>
                                        <img src="/img/hide-password.svg" alt="password" />
                                    </button>
                                </div>
                                {passwordStateError &&
                                    <div className=' absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>{passwordError} </p></div>}
                            </div>

                            <button onClick={() => submit_signup()} className='bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[34px] rounded-[4px] text-center hover:bg-[#28282c] '>Getting started</button>
                        </div>

                        <div className='flex items-center space-x-[4px] mt-[16px] justify-center max-[1300px]:mt-[16px]'>
                            <p className='text-[12px] font-medium leading-[14px] text-[#1516188F]'>Already have an account?</p>
                            <Link href="/auth/signin" className='text-[12px] font-semibold leading-[14px] hover:underline text-[#1D1D1F]'>Log In</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;
