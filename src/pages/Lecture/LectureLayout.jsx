import { Link, Outlet, useParams } from "react-router-dom";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";

import { Card, Typography, List, ListItem, ListItemPrefix, Alert } from "@material-tailwind/react";

import { ChevronRightIcon, ChevronDownIcon, CubeTransparentIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { ArrowsHorizontal, Paperclip, SealQuestion } from "@phosphor-icons/react";
import { CheckboxIcon, Chip } from "@nextui-org/react";
import { UserContext } from "../../Data/UserData";
export default function LectureLayout() {
  // const [open, setOpen] = React.useState(localStorage.getItem("aside-status"));
  const { currentQuizId } = useContext(UserContext);
  if (localStorage.getItem("aside-status") == null) {
    localStorage.setItem("aside-status", "open"); // Store the boolean value directly
  }
  const handleOpen = () => {
    if (localStorage.getItem("aside-status") == "open") {
      console.log("Closing aside");
      const aside = document.querySelector("#aside");
      aside.style.cssText = "width: 0;";
      localStorage.setItem("aside-status", "close"); // Store the boolean value directly
    } else {
      console.log("Opening aside");
      const aside = document.querySelector("#aside");
      aside.style.cssText = "width: 320px;";
      localStorage.setItem("aside-status", "open"); // Store the boolean value directly
    }
  };

  useLayoutEffect(() => {
    if (localStorage.getItem("aside-status") == "open") {
      const aside = document.querySelector("#aside");
      aside.style.cssText = "width: 320px;";
    } else {
      const aside = document.querySelector("#aside");
      aside.style.cssText = "width: 0;";
    }

    if (window.innerWidth < 768) {
      const aside = document.querySelector("#aside");
      aside.style.cssText = "width: 0;";
      localStorage.setItem("aside-status", "close"); // Store the boolean value directly
    }
  }, []);
  console.log(currentQuizId);
  return (
    <section className="flex w-full h-full overflow-hidden">
      <aside id="aside" className="  flex w-80 relative box-content p-0 transition-width ">
        <Chip
          onClick={handleOpen}
          variant="faded"
          className="absolute end-0 top-5 flex justify-center items-center w-7 h-6 z-50 -translate-x-1/2 hover:cursor-pointer"
          color="success"
        >
          <span className="p-0 w-5 h-5 flex">
            {" "}
            <ArrowsHorizontal className=" top-0 w-5 h-5" size="20" />
          </span>
        </Chip>
        <Card className="h-full border-t-1 w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5 rounded overflow-hidden">
          <div className="flex gap-4"></div>
          <div className="mb-2 flex items-center gap-4 p-4">
            <img src="/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          </div>
          <List>
            <hr className="my-2 border-blue-gray-50" />
            <Link className="text-xl">
              <ListItem className="items-center">
                <ListItemPrefix>
                  <VideoCameraIcon className="h-6 w-6 me-2" />
                </ListItemPrefix>
                الدرس
              </ListItem>
            </Link>{" "}
            <Link to={"quiz/" + currentQuizId} className="text-xl">
              <ListItem className="items-center">
                <ListItemPrefix>
                  <SealQuestion size={25} className="me-2" />
                </ListItemPrefix>
                الاختبار
              </ListItem>
            </Link>{" "}
            <Link to={"quiz/" + currentQuizId} className="text-xl">
              <ListItem className="items-center">
                <ListItemPrefix>
                  <Paperclip size={25} className="me-2" />
                </ListItemPrefix>
                المذكرة
              </ListItem>
            </Link>
          </List>
        </Card>
      </aside>
      <main className="p-5 grow overflow-y-scroll">
        <Outlet />
      </main>
    </section>
  );
}
