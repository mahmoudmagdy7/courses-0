import React, { useEffect, useState, useRef } from "react";
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import siteConfig from "../../../public/site-config";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import LongDialog from "../../components/ModalUi";
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
import { Toaster, toast } from "react-hot-toast";
import SearchModal from "../../components/SearchModal";

export default function Students() {
  const TABLE_HEAD = ["سم الطالب", "رقم الهاتف", "الرصيد", "action"];

  const [allStudents, setAllStudents] = useState([]);

  const [currentStudentId, setCurrentStudentId] = useState("ahmed");

  // ============================================================================= //

  /**
   =========================================+
   * TODO:                                  |
   * ? firstName and lastName validation    |
   * * National ID vlaidation               |
   * ! Handleing the errors with backend    | 
   * * Updating the dark mood colors        |
   =========================================+
   */

  // Show and hide password
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
    formdata.append("email", email.current.value);
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
      getAllStudents();
      // Notify the student that login success
      toast.success(" تم تسجيل الدخول بنجاح ");
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

  function addStudentForm() {
    return (
      <>
        {/* form heder */}

        {/*   ============= logo and the description   ================     */}
        <form onSubmit={handleSubmit} onChange={handleValidation}>
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

          {!isSubmit ? (
            <Button type="submit" className="h-9 w-full mt-5 cbg-primary ct-5 cbg-primary-hover rounded-lg text-md disabled:opacity-40">
              <span>تسجيل</span>
            </Button>
          ) : (
            <Button type="submit" className="h-9 w-full mt-5 cbg-primary ct-5 cbg-primary-hover rounded-lg text-md" isLoading>
              <span>تسجيل</span>
            </Button>
          )}
        </form>
      </>
    );
  }

  function updateStudent(userId) {
    setCurrentStudentId(userId);
    console.log(currentStudentId);
  }

  async function getAllStudents() {
    const { data } = await axios.get(siteConfig.ApiUrl + "/users");
    setAllStudents(data.result);
  }

  async function removeStudent(userId) {
    await axios.delete(siteConfig.ApiUrl + `/users/${userId}`);
    document.querySelector("#layer div").click();
    console.log("user" + userId + " deleted");
    getAllStudents();
  }

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <section className="px-5 h-screen">
      <div className="flex gap-3">
        <LongDialog modalContent={addStudentForm()} modalTitle={"إضافة طالب"} modalButtonTitle="إضافة طالب" />
        <SearchModal />
      </div>
      <Card className="h-full w-full overflow-scroll  ">
        <table className="w-full min-w-max table-auto text-start">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className=" text-start border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allStudents?.map((student, index) => {
              const isLast = index === allStudents.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={student._id}>
                  <td className={classes}>
                    <Typography variant="small" className="font-medium ct-primary">
                      <Link to={`/f35-fighter/profile/${student._id}`}>
                        {student.firstName}
                        {student.lastName}
                      </Link>
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {student.phone}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {student.balance}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50 w-1/6`}>
                    <Popover
                      id="layer"
                      showArrow
                      backdrop="opaque"
                      placement="right"
                      classNames={{
                        base: "py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50",
                        arrow: "bg-default-200",
                      }}
                    >
                      <PopoverTrigger>
                        <Button className="bg-red-100 border border-red-300  p-0 min-w-unit-10 me-2">
                          <Trash size={19} className="text-red-700" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <h3>Are you sure want to delete this user ?</h3>
                        <Button onClick={() => removeStudent(student._id)} className="border-red-500 border text-gray-900 bg-red-100 mt-5">
                          delete
                        </Button>
                      </PopoverContent>
                    </Popover>

                    <Button onClick={() => updateStudent(student._id)} className="bg-gray-300 border border-gray-500  p-0 min-w-unit-10">
                      <PencilSimple size={20} className="text-black" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </section>
  );
}
