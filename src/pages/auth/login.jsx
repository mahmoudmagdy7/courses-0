import React, { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { Eye, EyeSlash, Lock, Phone } from "@phosphor-icons/react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import siteConfig from "/public/site-config";

/**
   =========================================+
   * TODO:                                  |
   * ? Password validation                  |
   * * National ID validation               |
   * ! Handling the errors with backend     | 
   =========================================+
   */

export default function Login() {
  const router = useNavigate();
  // Show and hide password
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    password.current.type == "text" ? (password.current.type = "password") : (password.current.type = "text");
  };

  const [isSubmit, setIsSubmit] = useState(false); // Loading spinner state
  // Input values initialization
  const phoneNumber = useRef("");
  const password = useRef("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Getting inputs values
    const loginData = {
      phone: phoneNumber.current.value,
      password: password.current.value,
    };
    try {
      setIsSubmit(true); // Turn on loading spinner
      const { data } = await axios.post(`${siteConfig.ApiUrl}/auth/login`, loginData); // Fetch the data
      setIsSubmit(false); // Turn off loading spinner after getting the response
      Cookies.set("userToken", data.token, { expires: 1 }); // Expires after 1 days
      // Notify the student that login success
      toast.success(" تم تسجيل الدخول بنجاح ");
      toast.loading(" جاري تحويلك للصفحة الرئيسية "); // !redirect the user to home page

      router("/student-dashboard");
    } catch (error) {
      const { msgError } = error.response?.data;
      if (msgError === "User not found") {
        toast.error("لا يوجب بيانات لهاذا المستخدم ");
      } else if (msgError === "Password incorrect") {
        toast.error("الرقم السري الذي ادخلته غير صيحي");
      }
      setIsSubmit(false);
    }
  }

  function handleValidation(e) {
    if (phoneNumber.current.value.match(/^(01)[0-9]{9}$/) && !password.current.value == "") {
      document.querySelector("button").disabled = false;
    } else {
      document.querySelector("button").disabled = true;
    }
    //  Phone Number Validation
    if (e.target.id === "phoneNumber") {
      if (!phoneNumber.current.value.match(/^(01)[0-9]{9}$/)) {
        document.getElementById("phone-alert").classList.remove("hidden");
      } else {
        document.getElementById("phone-alert").classList.add("hidden");
      }
    } else {
    }
  }

  return (
    <>
      <main className="flex  justify-center items-center h-screen  ">
        {/* form heder */}
        <div className="images-layer z-0 absolute h-screen w-screen flex justify-center overflow-hidden">
          <img src="/assets/images/docs-left.png" className="blur-md" />
          <img src="/assets/images/docs-right.png" className="blur-md" />
        </div>
        <div className="w-[24rem] mx-4 z-10">
          <div className="text-center form-header">
            <figure className="">
              <img className="m-auto  h-[100px]" src="/assets/images/main-logo.png" alt="physiker logo" />
            </figure>
            <h2 className="ct-1 text-2xl font-semibold mb-2">اهلا بك مرة اخري</h2>
            <p className="ct-3"> من فضل قم بتسجيل الدخول للمتابعة </p>
          </div>
          {/* form main content */}
          <form onSubmit={handleSubmit} className="card mt-5 rounded-lg p-5 lg:p-7 shadow-lg shadow-[#0000000d] border-neutral-800 border br-card   ">
            <Toaster />

            <label className="mb-5 block">
              <span className="text-start ct-1">رقم الهاتف : </span>
              <span className="relative mt-1.5 flex">
                <input
                  maxLength={11}
                  ref={phoneNumber}
                  onChange={handleValidation}
                  className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                  placeholder="01xxxxxxxxx"
                  type="text"
                  id="phoneNumber"
                />
                <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  ">
                  <Phone size={20} />
                </span>
              </span>
              <p className="mt-2 text-red-600 hidden" id="phone-alert">
                من فضلك ادخل رقم هاتف صحيح !
              </p>
            </label>
            <label>
              <span className="text-start ct-1">الرقم السري :</span>
              <span className="relative mt-1.5 flex">
                <input
                  ref={password}
                  onChange={handleValidation}
                  className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5] dark:focus:border-[#09bc9b] focus:z-10 outline-0 br-input"
                  placeholder="xxxxxxxxxxx"
                  type="password"
                  id="password"
                />
                <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b] ">
                  <Lock size={20} />
                </span>
                <span className=" cfg-main  absolute end-[35px] translate-y-1/2 z-50 ct-2 hover:cursor-pointer">
                  {isVisible ? <Eye onClick={toggleVisibility} size={20} /> : <EyeSlash onClick={toggleVisibility} size={20} />}
                </span>
              </span>
            </label>
            <div className="flex justify-between">
              <Link to="/forget-password" className="ct-2 text-sm mt-3 inline-block hover:text-[#000000c7] dark:hover:text-[#fff]">
                نسيت الرقم السري ؟
              </Link>
              <Link target="_blank" to="https://wa.me/201061005364" className="ct-2 text-sm mt-3 inline-block hover:text-[#000000c7] dark:hover:text-[#fff]">
                تواصل مع الدعم
              </Link>
            </div>
            {!isSubmit ? (
              <Button disabled type="submit" className="h-9 w-full mt-5 cbg-primary ct-5 cbg-primary-hover rounded-lg text-md disabled:opacity-40">
                <span>دخول</span>
              </Button>
            ) : (
              <Button type="submit" className="h-9 w-full mt-5 cbg-primary ct-5 cbg-primary-hover rounded-lg text-md" isLoading>
                <span>دخول</span>
              </Button>
            )}
            <p className="ct-2 text-sm mt-4 text-center">
              لا تمتلك حساب ؟
              <Link className="ct-primary" to="/auth/signup">
                &ensp; إنشاء حساب
              </Link>
            </p>
          </form>
          <div>
            <p className="text-center text-s ct-3 mt-10 ">
              Developed by{" "}
              <Link to="https://www.facebook.com/mahmoudmagdy47" className="hover:text-[#4f46e5] ct-2">
                Mahmoud Magdy
              </Link>{" "}
              &{" "}
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
