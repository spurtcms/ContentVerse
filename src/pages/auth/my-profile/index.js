"use client";
import Blog_Header_Component from "@/components/Header/Blog_Header";
import { uniqueId } from "@/pages/api/clientAction";
import { fetchGraphQl } from "@/pages/api/graphicql";
import { GET_USER_DETAILS, UPDATE_USER_DETAILS } from "@/pages/api/query";
import { image_url } from "@/pages/api/url";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { components } from "react-select";

const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img
        src="/img/drop-arrow.svg"
        alt="arrow icon"
        style={{ width: "14px", height: "14px" }}
      />
    </components.DropdownIndicator>
  );
};

const Page = () => {
  const codeOptions = [
    { value: "91", label: "91" },
    { value: "55", label: "55" },
    { value: "44", label: "44" },
  ];

  const [selectedCode, setSelectedCode] = useState(codeOptions[0]);
  const [userDetails, setUserDetails] = useState({});
  const [firstName, setFirstName] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameErrorState, setNameErrorState] = useState(false);
  const [lastName, setLastName] = useState("");
  // const [lastNameError, setLastNameError] = useState("");
  // const [lastNameErrorState, setLastNameErrorState] = useState(false);
  const [email, setEmail] = useState("");
  const [mailError, setMailError] = useState("");
  const [mailErrorState, setMailErrorState] = useState(false);
  const [PhoneNum, setPhoneNum] = useState();
  const [numError, setNumError] = useState("");
  const [numErrorState, setNumErrorState] = useState(false);
  const [base64String, setBase64String] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState("");
  const [submit, setSubmit] = useState(0);
  const [updateProfile, setUpdateProfile] = useState("");
  const [removeState, setRemoveState] = useState(false);
  const dispatch = useDispatch();
  console.log(image, "imagePath");
  const nameStringData = localStorage.getItem("NameString");
  const user_id = useSelector((s) => s?.customerRedux?.get_user_id_Redux_func);

  const CustomIndicatorSeparator = () => null;
  const customStyles = {
    valueContainer: (provided) => ({
      ...provided,
      padding: "0px",
      fontFamily: "'Noto Sans', sans-serif",
      cursor: "pointer",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: "0px",
    }),
    option: (provided, state) => ({
      ...provided,
      fontFamily: "'Noto Sans', sans-serif",
      fontSize: "14px",
      fontWeight: "400",
      color: "#201035",
      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
      padding: "8px 12px",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontFamily: "'Noto Sans', sans-serif",
      fontSize: "14px",
      fontWeight: "400",
      color: "#282322",
      margin: "0",
      minWidth: "16px",
    }),
  };

  const customClassNames = (minWidth) => ({
    control: () =>
      `!border-none rounded-0  !bg-transparent text-[14px] font-normal text-[#201035] !shadow-none [&_.css-15lsz6c-indicatorContainer]:!p-0 [&_.css-1xc3v61-indicatorContainer]:!p-0 !cursor-pointer space-x-[4px] !min-h-0 pr-[6px] mr-[6px] border-r border-[#E8E8E8] !w-[43px]`,
    placeholder: () => "text-[#201035]",
  });
  const id = uniqueId();
  console.log(id, "jdsdjsjdjshdjsh");
  useEffect(() => {
    const fetchData = async () => {
      let variable = {
        id: id,
      };
      try {
        const data = await fetchGraphQl(GET_USER_DETAILS, variable);
        setUserDetails(data?.MemberProfileDetails);
        console.log("data", data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setErrorMessage(err);
      }
    };
    fetchData();
  }, []);

  const validateImage = (file) => {
    if (!file) {
      return false;
    }
    const isValidType = /\.(jpe?g|png)$/i.test(file.name);
    const isValidSize = file.size <= 5 * 1024 * 1024;
    return isValidType && isValidSize;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setBase64String(base64); // Set the base64 string
        setImage(base64); // Update the image state to the base64 string
        const isValid = validateImage(file);
        setIsValid(isValid);
        if (!isValid) {
          setErrorMessage(
            " Please upload a valid image JPEG or PNG under 5MB."
          );
        } else {
          setErrorMessage("");
        }
      };
      reader.readAsDataURL(file);
    } else {
      setErrorMessage("No file selected.");
    }
  };

  useEffect(() => {
    if (
      userDetails?.firstName !== null &&
      userDetails?.firstName !== "" &&
      userDetails?.firstName !== undefined
    ) {
      setFirstName(userDetails?.firstName);
    }
    if (
      userDetails?.firstName !== null &&
      userDetails?.firstName !== "" &&
      userDetails?.firstName !== undefined
    ) {
      setLastName(userDetails?.lastName);
    }

    if (
      userDetails?.email !== null &&
      userDetails?.email !== "" &&
      userDetails?.email !== undefined
    ) {
      setEmail(userDetails?.email);
    }

    if (
      userDetails?.mobile !== null &&
      userDetails?.mobile !== "" &&
      userDetails?.mobile !== undefined
    ) {
      setPhoneNum(userDetails?.mobile);
    }

    if (
      userDetails?.profileImagePath !== null &&
      userDetails?.profileImagePath !== "" &&
      userDetails?.profileImagePath !== undefined
    ) {
      setImage(image_url + userDetails?.profileImagePath);
    }
  }, [userDetails]);

  const router = useRouter();
  const InputFeildRegax = {
    emailId: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    Fname: /^[A-Za-z]{4,}$/,
    number: /^\d{15}$/,
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id == "Fname") {
      const nameValue = value.replace(/[^A-Za-z]/g, "");
      setFirstName(value);
    }

    if (id == "lastName") {
      setLastName(value);
    }

    if (id == "emailId") {
      const emailValue = value.replace(
        /[^A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/g,
        ""
      );
      setEmail(emailValue);
    }
    if (id === "number") {
      let numberValue = value.replace(/[^0-9]/g, "");
      if (numberValue.length >= 15) {
        // numberValue.length >= 15;
        // numberValue = numberValue.slice(0, 15);
        setNumError("you have reached maximum limit of 15 digits");
        setNumErrorState(true);
      }
      setPhoneNum(numberValue);
    }
  };
  const validate = () => {
    let isValid = true;

    if (firstName === "") {
      setNameError("Name is required");
      setNameErrorState(true);
      isValid = false;
    } else if (!InputFeildRegax?.Fname.test(firstName)) {
      setNameError("Name must be a maximum of 4 characters");
      setNameErrorState(true);
      isValid = false;
    } else {
      setNameError("");
      setNameErrorState(false);
    }

    if (email === "") {
      setMailError("Email is required");
      setMailErrorState(true);
      isValid = false;
    } else if (!InputFeildRegax?.emailId.test(email)) {
      setMailError("Invalid email format");
      setMailErrorState(true);
      isValid = false;
    } else {
      setMailError("");
      setMailErrorState(false);
    }

    if (PhoneNum == "") {
      setNumError("Mobile number is required");
      setNumErrorState(true);
      isValid = false;
    } else if (PhoneNum.length < 10) {
      setNumError("Mobile number must be exactly 10 digits");
      setNumErrorState(true);
      isValid = false;
    } else {
      setNumError("");
      setNumErrorState(false);
    }

    return isValid;
  };
  useEffect(() => {
    if (submit == 1) {
      validate();
    }
  }, [firstName, lastName, email, PhoneNum, base64String]);
  const handleSubmit = async () => {
    setSubmit(1);
    if (validate()) {
      let val = {
        input: {
          Id: userDetails?.Id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobile: PhoneNum,
          profileImage: base64String,
          removeImage: removeState,
        },
      };

      try {
        const res = await fetchGraphQl(UPDATE_USER_DETAILS, val);
        console.log(res, "rdbshdjasds");
        setUpdateProfile(
          res?.updateMemberProfile?.memberDetails?.profileImagePath
        );
        router.push("/");
      } catch (err) {
        console.error("Error fetching data:", err);
        setErrorMessage(err);
      }
    }
  };
  const handleRemoveImage = (e) => {
    setRemoveState(true);
    setBase64String();
    setImage();
  };

  const handleDiscard = () => {
    router.push("/");
  };

  const enterKeyPress = (e) => {
    if (e.key == "Enter") {
      if (e.target.value == PhoneNum || firstName || email || lastName) {
        handleSubmit();
      }
    }
  };
  return (
    <>
      <Blog_Header_Component />
      <div className="bg-white">
        <section className="bg-white p-[84px_16px] border-t border-solid border-[#EEEEEE] max-md:p-[24px_16px]">
          <div className="border border-solid border-[#EBEBEB] p-[50px] max-md:p-4 bg-[#FBFCFD] rounded-[12px] max-w-[700px] m-auto w-full">
            <div className="max-sm:flex-col flex items-center space-x-5 max-sm:space-y-5 max-sm:space-x-0 max-sm:items-start pb-[40px] mb-[40px] max-md:pb-[24px] max-md:mb-[24px] border-b border-solid border-[#EAEAEA]">
              {image ? (
                <img
                  src={image}
                  alt="profile"
                  className="rounded-full w-[90px] h-[90px] min-w-[90px]"
                />
              ) : (
                <div className="w-[90px] h-[90px] min-w-[90px] bg-[#DD5B15] hover:bg-[#823e19] rounded-full text-[42px] font-semibold leading-[48px] text-white grid place-items-center">
                  {/* {firstName?.charAt(0)?.toLocaleUpperCase()} */}
                  {userDetails?.NameString}
                </div>
              )}

              <div>
                <div className="flex items-center space-x-1 mb-[14px]">
                  <div className="bg-[#F1F1F1] hover:bg-[#81818145] rounded-[8px] p-[12px_20px] relative w-fit ">
                    <input
                      onChange={handleFileChange}
                      type="file"
                      name=""
                      id=""
                      // value={image}
                      className="left-0 top-0 opacity-0 w-full h-full absolute cursor-pointer text-[0px]"
                    />

                    <p className=" flex text-[14px] text-center font-medium leading-[17px] text-[#120B14]">
                      <img src="/img/upload.svg" alt="upload" />
                      Upload Image
                    </p>
                    {}
                  </div>
                  <button
                    onClick={(e) => handleRemoveImage(e)}
                    className="inline-block bg-transparent rounded-[8px] p-[12px_20px] relative w-fit hover:underline text-[14px] font-medium leading-[17px] text-[#FF3B30] "
                  >
                    Remove
                  </button>
                </div>
                {image !== "" || image !== null ? (
                  <>
                    <p
                      className={
                        isValid
                          ? "text-[14px] font-normal leading-[17px] text-[#1516188F]"
                          : "text-[14px] font-normal leading-[17px] text-[#FF3B30]"
                      }
                    >
                      Only PNG or JPG images are allowed. Maximum file size:
                      5MB.
                      {/* {!isValid && (
                        
                        // <div style={{ color: "red" }}>{errorMessage}</div>
                      )} */}
                    </p>
                  </>
                ) : (
                  <></>
                )}

                {/* <p className="text-[14px] font-normal leading-[17px] text-[#1516188F]">
                      {userDetails?.profileImage}
                    </p> */}
              </div>
            </div>
            <div>
              <div className="grid grid-cols-[1fr_1.5fr] gap-4 max-sm:grid-cols-1 mb-5 items-center last-of-type:mb-0">
                <label
                  htmlFor="Fname"
                  className="text-[14px] font-medium leading-[17px] text-[#000000]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="Fname"
                  placeholder="Enter First Name"
                  className={`h-[48px] text-[#120B14] focus:border-[#120B14] border border-solid border-[#E9E9E9] p-[15.5px_14px] rounded-[4px] text-[14px] font-normal leading-[17px] placeholder:text-[#1516188F] w-full ${
                    nameErrorState ? "border-[#EC1919]" : "border-[#00000029]"
                  } `}
                  value={firstName}
                  onChange={handleInputChange}
                  maxLength={25}
                  onKeyDown={(e) => enterKeyPress(e)}
                />
              </div>
              {nameErrorState && (
                <div className="flex items-center mt-3 mb-3 justify-center">
                  <img src="/img/error.svg" alt="error" />{" "}
                  <p className="text-[10px] font-normal leading-[12px] text-[#EC1919]">
                    {nameError}{" "}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-[1fr_1.5fr] gap-4 max-sm:grid-cols-1 mb-5 items-center last-of-type:mb-0">
                <label
                  htmlFor="Lname"
                  className="text-[14px] font-medium leading-[17px] text-[#000000]"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={handleInputChange}
                  onKeyDown={(e) => enterKeyPress(e)}
                  placeholder="Enter Last Name"
                  className={`h-[48px] text-[#120B14] focus:border-[#120B14] border border-solid border-[#E9E9E9] p-[15.5px_14px] rounded-[4px] text-[14px] font-normal leading-[17px] placeholder:text-[#1516188F] w-full
                   `}
                />
              </div>

              <div className="grid grid-cols-[1fr_1.5fr] gap-4 max-sm:grid-cols-1 mb-[20px] items-center last-of-type:mb-0">
                <label
                  htmlFor=""
                  className="text-[14px] font-medium leading-[17px] text-[#000000]"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your Email"
                  id="emailId"
                  value={email}
                  onChange={handleInputChange}
                  onKeyDown={(e) => enterKeyPress(e)}
                  className="h-[48px] text-[#120B14] focus:border-[#120B14] border border-solid border-[#E9E9E9] p-[15.5px_14px] rounded-[4px] text-[14px] font-normal leading-[17px] placeholder:text-[#1516188F] w-full "
                />
              </div>
              {mailErrorState && (
                <div className="flex items-center mt-3 mb-3 justify-center">
                  <img src="/img/error.svg" alt="error" />{" "}
                  <p className="text-[10px] font-normal leading-[12px] text-[#EC1919]">
                    {mailError}{" "}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-[1fr_1.5fr] gap-4 max-sm:grid-cols-1 mb-[20px] items-center last-of-type:mb-0">
                <label
                  htmlFor="number"
                  className="text-[14px] font-medium leading-[17px] text-[#000000]"
                >
                  Mobile Number
                </label>
                <div className="h-[48px] text-[#120B14]  border border-[#E9E9E9] p-[15.5px_14px] rounded-[4px] flex items-center bg-white">
                  <Select
                    options={codeOptions}
                    value={selectedCode}
                    onChange={setSelectedCode}
                    placeholder="Select"
                    isSearchable={false}
                    components={{
                      DropdownIndicator: CustomDropdownIndicator,
                      IndicatorSeparator: CustomIndicatorSeparator,
                    }}
                    styles={customStyles}
                    classNames={customClassNames(155)}
                  />
                  <input
                    type="text"
                    id="number"
                    placeholder="00000 00000"
                    maxLength={15}
                    // minLength={10}
                    value={PhoneNum}
                    onChange={handleInputChange}
                    onKeyDown={(e) => enterKeyPress(e)}
                    className={`text-[14px] h-[48px] font-normal leading-[17px] placeholder:text-[#1516188F] w-full border border-[#E9E9E9]   p-0 ${
                      numErrorState ? "border-[#EC1919]" : "border-[#00000029]"
                    }`}
                  />
                </div>
              </div>
              {numErrorState && (
                <div className="flex items-center mt-3 mb-3 justify-center">
                  <img src="/img/error.svg" alt="error" />{" "}
                  <p className="text-[10px] font-normal leading-[12px] text-[#EC1919]">
                    {numError}{" "}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-[10px] mt-[50px] justify-end max-md:mt-[24px]">
              <button
                onClick={handleDiscard}
                className="bg-[#F1F1F1] hover:bg-[#81818145] rounded-[4px] p-[8px_20px] relative w-fit text-[14px] font-normal leading-[17px] text-[#120B14] "
              >
                Discard
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#120B14] hover:bg-[#28282c]  rounded-[4px] p-[8px_20px] relative w-fit text-[14px] font-normal leading-[17px] text-[#FFFFFF] "
              >
                Save
              </button>
            </div>
          </div>
        </section>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Page;
