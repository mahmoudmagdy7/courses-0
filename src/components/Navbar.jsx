import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  VisuallyHidden,
  useSwitch,
} from "@nextui-org/react";
import { MonitorPlay, MoonStars, SignOut, Sun, Wallet } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function NavBar(props) {
  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch(props);

  const [userToken, setUserToken] = useState(Cookies.get("userToken"));
  const router = useNavigate();
  function logout() {
    setUserToken(null);
    Cookies.remove("userToken");
    router("/");
  }

  function toggleMode() {
    const body = document.body;
    body.classList.toggle("dark-theme");

    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light-theme");
    } else if (localStorage.getItem("theme") === "light-theme") {
      localStorage.setItem("theme", "dark-theme");
    } else {
      localStorage.setItem("theme", "light-theme");
    }
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 640) {
        document.getElementById("notification").setAttribute("data-justify", "end");
      } else {
        document.getElementById("notification").setAttribute("data-justify", "start");
      }
    });
  }, []);

  return (
    <Navbar maxWidth="xl" className="cfg-main ct-1 ">
      <div className="flex flex-col gap-2">
        <Component {...getBaseProps()}>
          <VisuallyHidden>
            <input {...getInputProps()} />
          </VisuallyHidden>
          <div
            onClick={toggleMode}
            {...getWrapperProps()}
            className={slots.wrapper({
              class: ["w-8 h-8", "flex items-center justify-center", "rounded-lg bg-default-100 hover:bg-default-200"],
            })}
          >
            {localStorage.getItem("theme") === null || localStorage.getItem("theme") === "light-theme" ? <Sun size={32} /> : <MoonStars size={32} />}
          </div>
        </Component>
      </div>
      {/* ============== small screens ===================== */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link to="/">
            {" "}
            <img src="/assets/images/main-logo.png" className="h-14" />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {/* ============== small screens ===================== */}

      {userToken ? ( // If logged in
        <NavbarContent id="notification">
          <NavbarItem className="hidden sm:flex">
            <Button isIconOnly variant="faded" color="primary" className="p-0" onClick={logout}>
              <SignOut size={18} />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button to={"/student/charge"} isIconOnly as={Link} color="success" variant="faded" aria-label="Take a photo">
              <Wallet weight="fill" size="28" />
            </Button>{" "}
            <Button isIconOnly variant="faded" color="primary" className="p-0" as={Link} to="student">
              <MonitorPlay size={28} weight="fill" />{" "}
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        // If logged out
        <NavbarContent justify="start">
          <NavbarItem>
            <Button as={Link} to="/auth/signup" className="w-full cbg-primary ct-5 cbg-primary-hover rounded-lg text-md disabled:opacity-40">
              <span>تسجيل حساب</span>
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link to="/auth/login">دخول</Link>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link to="/" className="flex items-center">
            <p className="font-bold text-inherit ct-0">Physiker</p>
            <img src="/assets/images/main-logo.png" className="h-14" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* =============== mobile menu ============= */}
      <NavbarMenu>
        <NavbarMenuItem>
          <Link to="/login">دخول</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
