import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import {
  Eye,
  EyeSlash,
  Lock,
  Phone,
  User,
  UsersThree,
  At,
  IdentificationCard,
  HouseLine,
  House,
  CloudArrowUp,
  WhatsappLogo,
  GraduationCap,
} from "@phosphor-icons/react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import siteConfig from "../../../public/site-config";
export default function SignUp() {
  /**
   =========================================+
   * TODO:                                  |
   * ? firstName and lastName validation    |
   * * National ID vlaidation               |
   * ! Handleing the errors with backend    | 
   * * Updating the dark mood colors        |
   =========================================+
   */

  const router = useNavigate();
  // Show and hide password
  const [isReVisible, setIsReVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = (e) => {
    if (e.target.id === "password-eye") {
      setIsVisible(!isVisible);
      password.current.type == "text" ? (password.current.type = "password") : (password.current.type = "text");
    }
    if (e.target.id === "re-password-eye") {
      setIsVisible(!isVisible);
      rePassword.current.type == "text" ? (rePassword.current.type = "password") : (rePassword.current.type = "text");
    }
  };

  const [isSubmit, setIsSubmit] = useState(false);
  // Loading spinner state
  // Input values initialization

  const firstName = useRef("");
  const lastName = useRef("");
  const email = useRef("");
  const password = useRef("");
  const rePassword = useRef("");
  const nationalId = useRef("");
  const government = useRef("");
  const city = useRef("");
  const school = useRef("");
  const phoneNumber = useRef("");
  const parentNumber = useRef("");
  const whatsAppNumber = useRef("");
  const profilePicture = useRef("");

  // ======================== Form Submit Function  =============================
  async function handleSubmit(e) {
    e.preventDefault();

    // Initialize all data
    let formdata = new FormData();
    formdata.append("firstName", firstName.current.value);
    formdata.append("lastName", lastName.current.value);
    formdata.append("email", firstName.current.value);
    formdata.append("password", password.current.value);
    formdata.append("rePassword", rePassword.current.value);
    formdata.append("nationalId", nationalId.current.value);
    formdata.append("government", government.current.value);
    formdata.append("city", city.current.value);
    formdata.append("phone", phoneNumber.current.value);
    formdata.append("parentNumber", parentNumber.current.value);
    formdata.append("whatsAppNumber", whatsAppNumber.current.value);
    formdata.append("image", profilePicture.current.files[0]);

    try {
      setIsSubmit(true); // Turn on loading spinner
      const data = await axios.post(`${siteConfig.ApiUrl}/auth/signUp`, formdata); // Fetch the data
      setIsSubmit(false);
      // Turn off loading spinner after getting the response

      // Notify the student that login success
      toast.success(" تم تسجيل الدخول بنجاح ");
      toast.loading(" جاري تحويلك للصفحة الرئيسية "); // !redirect the user to home page
      router("/");
    } catch (error) {
      const { msgError } = error.response.data;
      // if (msgError === 'User not found') {
      // toast.error("لا يوجب بيانات لهاذا المستخدم ")
      // } else if (msgError === 'Password incorrect') {
      // toast.error("الرقم السري الذي ادخلته غير صيحي")

      // }
      toast.error(msgError);
      console.log(error);
      setIsSubmit(false);
    }
  }

  // ======================== Validation Function =============================
  function handleValidation(e) {
    // Checking if all data id correct enable submitting
    if (
      firstName.current.value !== "" &&
      lastName.current.value !== "" &&
      email.current.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm) &&
      phoneNumber.current.value.match(/^(01)[0-9]{9}$/) &&
      parentNumber.current.value.match(/^(01)[0-9]{9}$/) &&
      parentNumber.current.value !== phoneNumber.current.value &&
      whatsAppNumber.current.value !== "" &&
      password.current.value.match(/^(?=.*[\p{L}a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[\p{L}a-zA-Z\d@$!%*#?&]{8,}$/u) &&
      rePassword.current.value === password.current.value &&
      nationalId.current.value.match(/^\d{14}$/) &&
      government.current.value !== "" &&
      city.current.value !== "" &&
      school.current.value !== "" &&
      profilePicture.current.files[0] !== undefined
    ) {
      document.querySelector("button").disabled = false;
    } else {
      document.querySelector("button").disabled = true;
    }

    // ======================== Email Validation =============================
    if (e.target.id === "email") {
      if (!email.current.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm)) {
        document.getElementById("email-alert").classList.remove("hidden");
      } else {
        document.getElementById("email-alert").classList.add("hidden");
      }
    }

    // ======================== Phone Number Validation =============================
    if (e.target.id === "phoneNumber") {
      if (!phoneNumber.current.value.match(/^(01)[0-9]{9}$/)) {
        document.getElementById("phone-number-alert").classList.remove("hidden");
      } else {
        document.getElementById("phone-number-alert").classList.add("hidden");
      }
    }

    // ======================== ParentNumber Validation =============================
    if (e.target.id === "parentNumber") {
      if (!parentNumber.current.value.match(/^(01)[0-9]{9}$/)) {
        document.getElementById("parent-number-alert").classList.remove("hidden");
        document.getElementById("parent-number-alert").innerHTML = "من فضلك ادخل رقم هاتف صحيح !";
      } else if (parentNumber.current.value === phoneNumber.current.value) {
        document.getElementById("parent-number-alert").innerHTML = "رقم ولي الامر لا يمكن ان يكون مطابق لرقم الطالب";
      } else {
        document.getElementById("parent-number-alert").classList.add("hidden");
      }
    }

    // ======================== WhatsApp Number Validation =============================
    if (e.target.id === "whatsAppNumber") {
      if (!whatsAppNumber.current.value.match(/^(01)[0-9]{9}$/)) {
        document.getElementById("whatsapp-number-alert").classList.remove("hidden");
      } else {
        document.getElementById("whatsapp-number-alert").classList.add("hidden");
      }
    }

    // ======================== Password Validation =============================
    if (e.target.id === "password") {
      if (!password.current.value.match(/^(?=.*[\p{L}a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[\p{L}a-zA-Z\d@$!%*#?&]{8,}$/u)) {
        document.getElementById("password-alert").classList.remove("hidden");
      } else {
        document.getElementById("password-alert").classList.add("hidden");
      }

      // ======================== Password Validation Styles =============================

      // letter
      if (password.current.value.match(/^(?=.*[\p{L}a-zA-Z])/u)) {
        document.getElementById("letter-v").classList.add("text-green-600");
      } else {
        document.getElementById("letter-v").classList.remove("text-green-600");
      }

      // digit
      if (password.current.value.match(/^(?=.*\d)/u)) {
        document.getElementById("digit-v").classList.add("text-green-600");
      } else {
        document.getElementById("digit-v").classList.remove("text-green-600");
      }

      // Symbol
      if (password.current.value.match(/^(?=.*[@$!%*#?&])/u)) {
        document.getElementById("symbol-v").classList.add("text-green-600");
      } else {
        document.getElementById("symbol-v").classList.remove("text-green-600");
      }

      // More than 8 character
      if (password.current.value.length >= 8) {
        document.getElementById("more-8-v").classList.add("text-green-600");
      } else {
        document.getElementById("more-8-v").classList.remove("text-green-600");
      }
    }
    // ======================== Re password Validation =============================
    if (e.target.id === "rePassword") {
      if (rePassword.current.value !== password.current.value) {
        document.getElementById("re-password-alert").classList.remove("hidden");
      } else {
        document.getElementById("re-password-alert").classList.add("hidden");
      }
    }
    // ======================== Government Validation =============================
    if (e.target.id === "government") {
      if (government.current.value === "") {
        document.getElementById("government-alert").classList.remove("hidden");
      } else {
        document.getElementById("government-alert").classList.add("hidden");
      }
    }
    // ======================== City Validation =============================
    if (e.target.id === "city") {
      if (city.current.value === "") {
        document.getElementById("city-alert").classList.remove("hidden");
      } else {
        document.getElementById("city-alert").classList.add("hidden");
      }
    }
    // ======================== School Validation =============================
    if (e.target.id === "school") {
      if (school.current.value === "") {
        document.getElementById("school-alert").classList.remove("hidden");
      } else {
        document.getElementById("school-alert").classList.add("hidden");
      }
    }

    // ======================== Uploading Image Validation =============================
    if (e.target.id === "upload-image") {
      document.getElementById("image-title").innerHTML = e.target.value;
    }
  }

  return (
    <>
      <main className="flex  justify-center items-center py-5 overflow-x-hidden ">
        {/* form heder */}
        <div className="images-layer z-0 absolute h-screen w-screen flex justify-center overflow-hidden">
          <img src="/assets/images/docs-left.png" className="blur-md" />
          <img src="/assets/images/docs-right.png" className="blur-md" />
        </div>

        <div className="w-[40rem] mx-4 z-10">
          {/*   ============= logo and the description   ================     */}
          <div className="text-center form-header">
            <figure className="">
              <img className="m-auto  h-[100px]" src="/assets/images/main-logo.png" alt="physiker logo" />
            </figure>
            <h2 className="ct-1 text-2xl font-semibold mb-2">اهلا بك معنا</h2>
            <p className="ct-3">من فضل قم بتسجيل بياناتك للمتابعة</p>
          </div>
          {/* form main content */}
          <form
            onSubmit={handleSubmit}
            onChange={handleValidation}
            className="card mt-5 rounded-lg p-5 lg:p-7 shadow-lg shadow-[#0000000d] border-neutral-800 border br-card   "
          >
            <Toaster />

            <div className="inputs-groupe flex  gap-2 ">
              {/* ========== first name ========== */}
              <label className="mb-3 block w-full">
                <span className="text-start ct-0">أسم الطالب :</span>
                <span className="relative mt-1.5 flex">
                  <input
                    ref={firstName}
                    className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                    placeholder="Ahmed"
                    type="text"
                    id="firstName"
                  />
                  <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  ">
                    <User size={20} />
                  </span>
                </span>
              </label>

              {/* ========== last name ========== */}

              <label className="mb-3 block w-full">
                <span className="text-start ct-0">أسم اﻷب :</span>
                <span className="relative mt-1.5 flex">
                  <input
                    ref={lastName}
                    className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                    placeholder="Ashraf"
                    type="text"
                    id="lastName"
                  />
                  <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  ">
                    <UsersThree size={20} />
                  </span>
                </span>
              </label>
            </div>
            {/* ==========  Email ========== */}
            <label className="mb-3 block ">
              <span className="text-start ct-0">البريد الإلكتروني :</span>
              <span className="relative mt-1.5 flex">
                <input
                  ref={email}
                  className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                  placeholder="user@gmail.com"
                  type="email"
                  id="email"
                />
                <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  ">
                  <At size={20} />
                </span>
              </span>
              <p className="mt-2 text-red-600 hidden" id="email-alert">
                من فضلك ادخل بريد الكتروني صحيح !
              </p>
            </label>
            <div className="inputs-groupe flex gap-2 ">
              {/* ============== Phone Number ============= */}
              <label className="mb-3 block w-full">
                <span className="text-start ct-0">رقم الهاتف :</span>
                <span className="relative mt-1.5 flex">
                  <input
                    maxLength={11}
                    ref={phoneNumber}
                    className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                    placeholder="01xxxxxxxxx"
                    type="text"
                    id="phoneNumber"
                  />
                  <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  ">
                    <Phone size={20} />
                  </span>
                </span>
                <p className="mt-2 text-red-600 hidden" id="phone-number-alert">
                  من فضلك ادخل رقم هاتف صحيح !
                </p>
              </label>
              {/* ============== Parent Number ============= */}

              <label className="mb-3 block w-full">
                <span className="text-start ct-0">رقم ولي الأمر :</span>
                <span className="relative mt-1.5 flex">
                  <input
                    maxLength={11}
                    ref={parentNumber}
                    className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                    placeholder="01xxxxxxxxx"
                    type="text"
                    id="parentNumber"
                  />
                  <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  ">
                    <Phone size={20} />
                  </span>
                </span>
                <p className="mt-2 text-red-600 hidden" id="parent-number-alert"></p>
              </label>
            </div>
            {/* ============== WhatsApp Number ============= */}
            <div>
              <label className="mb-3 block">
                <span className="text-start ct-0">رقم الواتساب :</span>
                <span className="relative mt-1.5 flex">
                  <input
                    maxLength={11}
                    ref={whatsAppNumber}
                    className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                    placeholder="01xxxxxxxxx"
                    type="text"
                    id="whatsAppNumber"
                  />
                  <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  ">
                    <WhatsappLogo size={20} />
                  </span>
                </span>
                <p className="mt-2 text-red-600 hidden" id="whatsapp-number-alert">
                  من فضلك ادخل رقم هاتف صحيح !
                </p>
              </label>

              <div className="inputs-groupe flex gap-2  sm:flex-row flex-col ">
                {/* ============== Password ============= */}
                <label className=" w-full">
                  <span className="text-start ct-0">الرقم السري :</span>
                  <span className="relative mt-1.5 flex">
                    <input
                      ref={password}
                      className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5] dark:focus:border-[#09bc9b] focus:z-10 outline-0 br-input"
                      placeholder="xxxxxxxxxxx"
                      type="password"
                      id="password"
                    />
                    <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b] ">
                      <Lock size={20} />
                    </span>
                    <span className=" cfg-main  absolute end-[35px] translate-y-1/2 z-50 ct-2 hover:cursor-pointer">
                      {isVisible ? (
                        <Eye id="password-eye" onClick={toggleVisibility} size={20} />
                      ) : (
                        <EyeSlash id="password-eye" onClick={toggleVisibility} size={20} />
                      )}
                    </span>
                  </span>
                </label>

                {/* ============== rePassword ============= */}
                <label className=" w-full">
                  <span className="text-start ct-0">إعادة الرقم السري :</span>
                  <span className="relative mt-1.5 flex ">
                    <input
                      ref={rePassword}
                      className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5] dark:focus:border-[#09bc9b] focus:z-10 outline-0 br-input"
                      placeholder="xxxxxxxxxxx"
                      type="password"
                      id="rePassword"
                    />
                    <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b] ">
                      <Lock size={20} />
                    </span>
                    <span className=" cfg-main  absolute end-[35px] translate-y-1/2 z-50 ct-2 hover:cursor-pointer">
                      {isVisible ? (
                        <Eye id="re-password-eye" onClick={toggleVisibility} size={20} />
                      ) : (
                        <EyeSlash id="re-password-eye" onClick={toggleVisibility} size={20} />
                      )}{" "}
                    </span>
                  </span>
                  <p className="mt-2 text-red-600 hidden" id="re-password-alert">
                    لابد ان يكون الرقم السري متطابق!
                  </p>
                </label>
              </div>
              <ul className="mt-2 text-red-600 hidden text-sm list-disc ps-5 flex-grow-1" id="password-alert">
                <p className="ct-1">يجب ان تحتوي كلمة المرور علي :</p>
                <li id="letter-v">حرف أبجدي واحد على الأقل سواء كان بحروف صغيرة أو كبيرة.</li>
                <li id="digit-v">رقم واحد على الأقل.</li>
                <li id="symbol-v">حرف خاص واحد على الأقل (من بين @$!%*#?&).</li>
                <li id="more-8-v">يجب أن تكون كلمة المرور على الأقل 8 أحرف.</li>
              </ul>
            </div>

            {/* ==========  National Id ========== */}
            <label className="my-5 block">
              <span className="text-start ct-0">الرقم القومي:</span>
              <span className="relative mt-1.5 flex">
                <input
                  ref={nationalId}
                  maxLength={14}
                  className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                  placeholder="30003011598417"
                  type="text"
                  id="nationalId"
                />
                <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  ">
                  <IdentificationCard size={26} />
                </span>
              </span>
              <p className="mt-2 text-red-600 hidden" id="national-id-alert">
                {" "}
                من فضلك ادخل رقم قومي صحيح مكون من 14 رقم !
              </p>
            </label>

            <div className="inputs-groupe flex gap-2  sm:flex-row flex-col ">
              {/* ============== Government ============= */}
              <label className="w-full">
                <span className="text-start ct-0">المحافظة :</span>
                <span className="relative mt-1.5 flex ">
                  <input
                    ref={government}
                    className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5] dark:focus:border-[#09bc9b] focus:z-10 outline-0 br-input"
                    placeholder="Ismailia"
                    type="text"
                    id="government"
                  />
                  <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b] ">
                    <House size={20} />
                  </span>
                </span>
                <p className="mt-2 text-red-600 hidden" id="government-alert">
                  {" "}
                  لا يمكن ان يكون حقل المحافظه فارغ !
                </p>
              </label>
              {/* ============== City ============= */}
              <label className="w-full">
                <span className="text-start ct-0">المدينة :</span>
                <span className="relative mt-1.5 flex">
                  <input
                    ref={city}
                    className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5] dark:focus:border-[#09bc9b] focus:z-10 outline-0 br-input"
                    placeholder="El-Ismailia"
                    type="text"
                    id="city"
                  />
                  <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b] ">
                    <HouseLine size={20} />
                  </span>
                </span>
                <p className="mt-2 text-red-600 hidden" id="city-alert">
                  لا يمكن ان يكون حقل المدينه فارغ !
                </p>
              </label>
            </div>
            {/* ============== School ============= */}
            <label className="w-full">
              <span className="text-start ct-0">المدرسة :</span>
              <span className="relative mt-1.5 flex">
                <input
                  ref={school}
                  className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5] dark:focus:border-[#09bc9b] focus:z-10 outline-0 br-input"
                  placeholder="25 ياناير"
                  type="text"
                  id="school"
                />
                <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b] ">
                  <GraduationCap size={20} />
                </span>
              </span>
              <p className="mt-2 text-red-600 hidden" id="school-alert">
                لا يمكن ان يكون حقل المدرسة فارغ !
              </p>
            </label>
            {/* =========== Upload image =============== */}
            <div className="upload-image-wrapper mt-5">
              <label
                htmlFor="upload-image"
                className="flex flex-col items-center justify-center text-center  p-3 ct-2 hover:text-gray-700 cursor-pointer border-2 border-dashed rounded-md"
              >
                <input ref={profilePicture} type="file" name="upload-image" id="upload-image" className="hidden" accept="image/.jpeg,.jpg,.png" />
                <CloudArrowUp size={32} />
                قم بإختيار صورة
                <p id="image-title" className="ct-primary"></p>
              </label>
            </div>

            <div className="ct-2 text-sm mt-3 inline-block ">
              اذا كنت تواجه مشكلة يمكنك
              <Link target="_blank" to="https://wa.me/201061005364" className="ct-2 text-sm mt-3 inline-block hover:text-[#000000c7] dark:hover:text-[#fff]">
                &ensp; التواصل مع الدعم
              </Link>
            </div>
            {!isSubmit ? (
              <Button disabled type="submit" className="h-9 w-full mt-5 cbg-primary ct-5 cbg-primary-hover rounded-lg text-md disabled:opacity-40">
                <span>تسجيل</span>
              </Button>
            ) : (
              <Button type="submit" className="h-9 w-full mt-5 cbg-primary ct-5 cbg-primary-hover rounded-lg text-md" isLoading>
                <span>تسجيل</span>
              </Button>
            )}
            <p className="ct-2 text-sm mt-4 text-center">
              تمتلك حساب ؟
              <Link className="ct-primary" to="/auth/login">
                &ensp;تسجيل الدخول
              </Link>
            </p>
          </form>
          <div>
            <p className="text-center text-s ct-3 mt-10 ">
              Developed by
              <Link to="https://www.facebook.com/mahmoudmagdy47" className="hover:text-[#4f46e5] ct-2">
                Mahmoud Magdy
              </Link>
              &
              <Link to="https://www.facebook.com/ahmedashrafaly22" className="ct-2 hover:text-[#4f46e5]">
                Ahmed ashraf
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
