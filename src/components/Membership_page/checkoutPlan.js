import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { GET_MEMBERSHIP_DETAIL_PAGE, GET_MEMBERSHIP_PLAN, GET_POSTS_CHANNELLIST_QUERY, POST_MEMBERSHIP_CHECKOUT_PLAN } from '@/pages/api/query';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGraphQl } from '@/pages/api/graphicql';
import Blog_Header_Component from '@/components/Header/Blog_Header';


export default function CheckoutPlan({ id }) {

    console.log(id, "fdfbbfbf")
    const detailData = useSelector((s) => s?.customerRedux?.Fetching_MemberDetail_redux)
    const [userName, setUserName] = useState("");
    const [mailId, setMailId] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [phoneNum, setPhoneNum] = useState(null);
    const [companyName, setCompName] = useState("");
    const [position, setPosition] = useState("");
    const [nameError, setNameError] = useState("");
    const [mailError, setMailError] = useState("");
    const [passError, setPassError] = useState("");
    const [numError, setNumError] = useState("");
    const [confirmPassError, setConfirmPassError] = useState("");
    const [positionError, setPositionError] = useState("");
    const [companyError, setCompanyError] = useState("");
    const [memberData, setMemberData] = useState([]);
    const [nameErrorState, setNameErrorState] = useState(false);
    const [mailErrorState, setMailErrorState] = useState(false);
    const [passErrorState, setPassErrorState] = useState(false);
    const [numErrorState, setNumErrorState] = useState(false);
    const [confirmPassErrorState, setConfirmPassErrorState] = useState(false);
    const [positionErrorState, setPositionErrorState] = useState(false);
    const [companyErrorState, setCompanyErrorState] = useState(false);
    const [clickCheckout, setClickCheckout] = useState(null);
    const [submit, setSubmit] = useState(0);
    const [hidePass, setHidePass] = useState(false);
    const [confirmHidePass, setConfirmHidePass] = useState(false)
    const [detailMember, setDetailMember] = useState();
    const [header_api_result, setheader_api_result] = useState([]);
    const tenantId = useSelector((s) => s?.customerRedux?.Header_api_result_redux_function)
    console.log(header_api_result?.[0]?.tenantId, "cbdsjdfsd")
    const dispatch = useDispatch()
    const InputFeildRegax = {
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        name: /^[A-Za-z]{3,}$/,
        number: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\\./0-9]*$/
    };
    console.log(id, "id");
    console.log(tenantId?.tenantId, "tenantIddddd")

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
        const membershipDetailApi = async () => {
            let detailParams = {
                "subscriptionid": id,
                "tenantId": header_api_result?.[0]?.tenantId
            }
            console.log(detailParams, "detailParams")
            try {
                const result = await fetchGraphQl(GET_MEMBERSHIP_DETAIL_PAGE, detailParams);
                setDetailMember(result?.MembershipLevelDetails?.MemnershipDtails)
                console.log(result?.MembershipLevelDetails?.MemnershipDtails, "cbdjfsnf")

            } catch (err) {
                console.error("Error fetching category list:", err);
                setError(err.message);
            }
        }
        membershipDetailApi()
    }, [id, header_api_result])
    const handleFeildChange = (e) => {
        const { id, value } = e?.target
        if (id == "name") {
            setUserName(value)
        }
        else if (id == "email") {
            setMailId(value)
        }
        else if (id == "number") {
            setPhoneNum(value)
        }
        else if (id == "password") {
            setPass(value)
        }
        else if (id == "confirmPass") {
            setConfirmPass(value)
        }
        else if (id == "companyName") {
            setCompName(value)
        }
        else if (id == "position") {
            setPosition(value)
        }
    }
    useEffect(() => {
        if (submit == 1) {
            validate()
        }
    }, [userName, mailId, phoneNum, pass, confirmPass, companyName, position])
    const validate = () => {
        let isValid = true
        let validateObj = {
            pass: true,
            confirmPass: true
        }


        if (userName !== "") {
            if (!InputFeildRegax?.name.test(userName)) {
                setNameError("name must be maximum 4 charecters")
                setNameErrorState(true)
                isValid = false
            } else {
                setNameError("")
                setNameErrorState(false)
                isValid = true
            }
        } else {
            setNameError("Name is Required")
            setNameErrorState(true)
            isValid = false
        }

        if (mailId !== "") {
            if (!InputFeildRegax?.email.test(mailId)) {
                setMailError("Email invalid format")
                setMailErrorState(true)
                isValid = false;
            } else {
                setMailError("");
                setMailErrorState(false)
                isValid = true
            }
        } else {
            setMailError("Email is Reqiured");
            setMailErrorState(true)
            isValid = false
        }

        if (phoneNum !== "") {
            if (!InputFeildRegax?.number?.test(phoneNum)) {
                setNumError("Mobile Number is Reqiured");
                setNumErrorState(true);
                isValid = false
            } else {
                setNumError("");
                setNumErrorState(false)
                isValid = true
            }
        } else {
            setNumError("Mobile Number Required");
            setNumErrorState(true);
            isValid = false
        }

        if (pass !== "") {
            if (!InputFeildRegax?.password.test(pass)) {
                setPassError("Password must contain 8 charectors & contain number & special charectors");
                setPassErrorState(true);
                isValid = false
            } else {
                setPassError("");
                setPassErrorState(false);
                isValid = true
            }
        } else {
            setPassError("password is required");
            setPassErrorState(true);
            isValid = false
        }

        if (confirmPass == "") {
            setConfirmPassError("password is required");
            setConfirmPassErrorState(true);
            isValid = false
        } else if (pass !== confirmPass) {
            setConfirmPassError("Both the passwords don't match. Please re-enter the new password here.")
            setConfirmPassErrorState(true)
            isValid = false
            validateObj.confirmPass = false
        } else {
            setConfirmPassError("")
            setConfirmPassErrorState(false);
            isValid = true
            validateObj.confirmPass = true
        }

        if (companyName == "") {

            setCompanyError("Company Name is required");
            setCompanyErrorState(true);
            isValid = false

        } else {
            setCompanyError("");
            setCompanyErrorState(false);
            isValid = true
        }

        if (position == "") {
            setPositionError("Position is required");
            setPositionErrorState(true);
            isValid = false

        } else {
            setPositionError("");
            setPositionErrorState(false);
            isValid = true
        }
        return isValid
    }

    const handleSubmit = async () => {
        setSubmit(1);
        if (validate()) {
            console.log("ndhfdnff")

            let checkoutParams = {
                "checkouts": {
                    "Username": userName,
                    "Email": mailId,
                    "Password": pass,
                    "PhoneNumber": phoneNum,
                    "CompanyName": companyName,
                    "Position": position,
                    "CreatedBy": 2,
                    "TenantId": tenantId?.tenantId
                }
            }
            try {
                const result = await fetchGraphQl(POST_MEMBERSHIP_CHECKOUT_PLAN, checkoutParams);
                setClickCheckout(result)
                console.log(result, "dbjfhvbdfv")
            } catch (err) {
                console.error("Error fetching category list:", err);
                setError(err.message);
            }
        } else {
            console.log("form is invalid")
        }


    }



    return (
        <div>
            <Blog_Header_Component />
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
                            <Link href="/membership" className='text-[14px] font-normal leading-4 text-[#151618CC] hover:underline'>
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

                            {
                                detailMember?.map((data, index) => (
                                    <>
                                        <p className='text-base font-normal leading-[19px] text-[#1D1D1F]'>You have selected the <span className='font-bold'>{data?.SubscriptionName}</span> membership level.</p>
                                        <div className='flex items-center justify-between border border-[#D7D7D7] bg-[#F8F8F8] p-[20px] rounded-[12px] mt-[16px] gap-[16px] max-sm:grid max-sm:grid-cols-2'>
                                            <div >
                                                <h3 className='text-[18px] font-bold text-[#151618CC] leading-[21px] mb-[10px]'>{data?.SubscriptionName}</h3>
                                                <p className='text-[14px] font-normal text-[#1516188F] leading-[16px] '>{data?.SubscriptionName}</p>
                                            </div>
                                            <div>
                                                <p className='text-[16px] font-normal text-[#1516188F]'><span className='text-[24px] font-semibold leading-[29px]
                                 text-[#120B14]'>${data?.InitialPayment}</span>/month</p>
                                            </div>
                                            <div className='max-sm:col-span-2'>
                                                <Link className="bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-fit block h-[42px] font-semibold text-[#FFFFFF] rounded-[4px] text-center hover:bg-[#28282c] max-sm:w-full" href="/membership">Choose plan</Link>
                                            </div>
                                        </div>

                                        <div className='w-full rounded-[12px] overflow-hidden my-[16px] '>
                                            <img src="/img/detail-banner.svg" alt="banner" className='w-full h-full object-cover' />
                                        </div>
                                        <p className='text-base font-normal leading-[26px] text-[#1D1D1F]' >{data?.Description}</p>
                                    </>
                                ))
                            }
                        </div>


                        <div className='bg-white border border-[#E9E9E9] rounded-[12px] p-[40px] mb-[30px] max-sm:p-[16px]'>
                            <h3 className='text-[20px] font-semibold leading-[24px] mb-[40px] text-[#1D1D1F]'>Account Information</h3>

                            <div className='grid grid-cols-2 gap-x-[20px] gap-y-[30px] max-sm:grid-cols-1'>
                                <div className='col-span-2 max-sm:col-span-1'>
                                    <label className="text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[10px]">User name</label>
                                    <input
                                        placeholder='Eg: Steve Job'
                                        type="text"
                                        className={`border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ${nameErrorState ? "border-[#EC1919]" : "border-[#00000029]"} `}
                                        onChange={handleFeildChange}
                                        value={userName}
                                        id="name"
                                    />
                                    {nameErrorState &&
                                        <div className='absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>{nameError} </p>
                                        </div>}
                                </div>
                                <div >
                                    <label className="text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[10px]">Email Address</label>
                                    <input placeholder='Eg: steve.job@example.com'
                                        type="text"
                                        className={`border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F]  ${mailError ? "border-[#EC1919]" : "border-[#00000029]"}`}
                                        onChange={handleFeildChange}
                                        value={mailId}
                                        id="email"
                                    />
                                    {mailErrorState &&
                                        <div className='absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>{mailError} </p>
                                        </div>}
                                </div>
                                <div >
                                    <label className="text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[10px]">Mobile Number</label>
                                    <input placeholder='00000-00000'
                                        type="text"
                                        className={`border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ${numError ? "border-[#EC1919]" : "border-[#00000029]"}`}
                                        onChange={handleFeildChange}
                                        value={phoneNum}
                                        id="number"
                                    />
                                    {numErrorState &&
                                        <div className='absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>{numError} </p>
                                        </div>}

                                </div>
                                <div ><label className="text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[10px]">Password</label><div className="relative flex items-center">
                                    <input placeholder='Password'

                                        className={`border border-[#00000029] rounded-[4px] h-[42px] p-[6px_36px_6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ${passError ? "border-[#EC1919]" : "border-[#00000029]"}`}
                                        onChange={handleFeildChange}
                                        value={pass}
                                        id="password"
                                        type={`${hidePass ? "password" : "text"}`}
                                    />
                                    <button className="absolute right-[10px]" onClick={(e) => setHidePass(!hidePass)} >
                                        <img src="/img/hide-password.svg" alt="password" />
                                    </button>

                                </div>
                                    {passErrorState &&
                                        <div className='absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>{passError} </p>
                                        </div>}

                                </div>
                                <div><label className="text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[10px]">Confirm password</label><div className="relative flex items-center">
                                    <input placeholder='Password'
                                        className={`border border-[#00000029] rounded-[4px] h-[42px] p-[6px_36px_6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ${confirmPassError ? "border-[#EC1919]" : "border-[#00000029]"}`}
                                        onChange={handleFeildChange}
                                        value={confirmPass}
                                        id="confirmPass"
                                        type={`${confirmHidePass ? "password" : "text"}`}
                                    />
                                    <button className="absolute right-[10px]" onClick={(e) => setConfirmHidePass(!confirmHidePass)}>
                                        <img src="/img/hide-password.svg" alt="password" />
                                    </button>

                                </div>
                                    {confirmPassErrorState &&
                                        <div className='absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>{confirmPassError} </p>
                                        </div>}

                                </div>
                            </div>

                        </div>

                        <div className='bg-white border border-[#E9E9E9] rounded-[12px] p-[40px] mb-[30px] max-sm:p-[16px]'>
                            <h3 className='text-[20px] font-semibold leading-[24px] mb-[40px] text-[#1D1D1F]'>Company Information</h3>

                            <div className='grid grid-cols-2 gap-x-[20px] gap-y-[30px] max-sm:grid-cols-1'>
                                <div className='col-span-2 max-sm:col-span-1'>
                                    <label className="text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[10px]">Company Name</label>
                                    <input placeholder='Eg: Apple'
                                        type="text"
                                        className={`border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ${companyError ? "border-[#EC1919]" : "border-[#00000029]"}`}
                                        onChange={handleFeildChange}
                                        value={companyName}
                                        id="companyName"
                                    />
                                    {companyErrorState &&
                                        <div className='absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>{companyError} </p>
                                        </div>}

                                </div>
                                <div className='col-span-2 max-sm:col-span-1'>
                                    <label className="text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[10px]">Position</label>
                                    <input placeholder='Eg: Product Designer'
                                        type="text"
                                        className={`border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ${positionError ? "border-[#EC1919]" : "border-[#00000029]"}`}
                                        onChange={handleFeildChange}
                                        value={position}
                                        id="position"
                                    />
                                    {positionErrorState &&
                                        <div className='absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>{positionError} </p>
                                        </div>}
                                </div>

                            </div>

                        </div>

                        <button className="bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] rounded-[4px] text-center hover:bg-[#28282c]" onClick={handleSubmit} >Checkout</button>
                    </div>

                </div>
            </section>



        </div>
    )
}

