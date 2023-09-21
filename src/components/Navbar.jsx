import React, { useEffect, useState } from "react";
import {
  Badge,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Switch,
  VisuallyHidden,
  useSwitch,
} from "@nextui-org/react";
import { Bell, MoonStars, Sun } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function NavBar(props) {
  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch(props);

  const [userToken, setUserToken] = useState(Cookies.get("userToken"));

  function logout() {
    setUserToken(null);
    Cookies.remove("userToken");
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
    <Navbar className="cfg-main ct-1 mb-10">
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
          <img src="/assets/images/main-logo.png" className="h-14" />
        </NavbarBrand>
      </NavbarContent>
      {/* ============== small screens ===================== */}

      {userToken ? ( // If logged in
        <NavbarContent id="notification">
          <NavbarItem className="">
            <Badge content="99+" shape="circle" color="danger">
              <Button radius="full" isIconOnly aria-label="more than 99 notifications" variant="light">
                <Bell size={24} />
              </Button>
            </Badge>
          </NavbarItem>

          <NavbarItem className="hidden sm:flex">
            <Button onClick={logout}>خروج</Button>
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
        <NavbarItem>{/*item*/}</NavbarItem>

        <NavbarBrand>
          <p className="font-bold text-inherit ct-0">Physiker</p>
          <img src="/assets/images/main-logo.png" className="h-14" />
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
