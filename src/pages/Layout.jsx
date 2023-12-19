import React, { useContext } from "react";
import NavBar from "../components/Navbar";
import { Link, Outlet } from "react-router-dom";

import { Drawer, Typography, IconButton, ListItem, List } from "@material-tailwind/react";
import { Avatar, Badge, Button } from "@nextui-org/react";
import { CheckBadgeIcon, LightBulbIcon } from "@heroicons/react/24/solid";
import { UserContext } from "../Data/UserData";
import { Cardholder, MonitorPlay, SignOut, UserCircle, Wallet } from "@phosphor-icons/react";
import { generateSecret } from "jwt-key-generator";
export default function Layout() {
  const [open, setOpen] = React.useState(false);
  const { loggedUser, getLoggedInUserData } = useContext(UserContext);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => {
    document.querySelector("#nav-toggler").click();
    setOpen(false);
  };
  (async function () {
    let secret = await generateSecret("HS256");
    console.log(secret);
  })();

  return (
    <div>
      <React.Fragment>
        <Drawer open={open} onClose={closeDrawer} className="p-4">
          <div className="mb-6 flex items-center justify-between">
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </IconButton>
          </div>
          <div className="flex gap-4 items-center">
            <Badge
              isOneChar
              variant="flat"
              size="md"
              shape="circle"
              content={<CheckBadgeIcon className=" text-success-400 w-10 " />}
              className="bg-white "
              placement="bottom-right"
            >
              <Avatar color="default" radius="md" src={loggedUser?.profileImage} />
            </Badge>
            <div className="">
              <p>
                مرحبا <span className="ct-primary font-semibold">{loggedUser?.firstName}</span>
              </p>
              <p>
                رصيد المحفظة :
                <span className={`${loggedUser?.balance < 5 ? "text-danger" : loggedUser?.balance < 50 ? "text-warning" : "ct-primary"} font-semibold`}>
                  {loggedUser?.balance} <span className="text-default-600">جنيه</span>
                </span>
              </p>
            </div>
          </div>

          <p className=" text-sm flex gap-2 py-4 px-1 rounded-lg  bg-orange-50 border border-orange-100 mt-5 relative">
            <span>
              <LightBulbIcon className="text-warning  top-0 w-5" />
            </span>
            ما تخليش درجه تحدد مصيرك ولا تقيدك الدرجه دي مجرد رقم يا صديقي.
          </p>

          <div className="mt-4">
            <Link onClick={closeDrawer} to="/student/profile" className="flex gap-6 items-center hover:bg-gray-50 rounded-lg p-3">
              <UserCircle size={28} weight="fill" className="ct-primary " /> <p className="text-xl">الصفحة الشخصية</p>
            </Link>
            <Link onClick={closeDrawer} to="/student/charge" className="flex gap-6 items-center hover:bg-gray-50 rounded-lg p-3">
              <Wallet weight="fill" className="ct-primary " size="28" />
              <p className="text-xl">شحن المحفظة</p>
            </Link>
            <Link onClick={closeDrawer} to="/student/" className="flex gap-6 items-center hover:bg-gray-50 rounded-lg p-3">
              <MonitorPlay size={28} weight="fill" className="ct-primary " />
              <p className="text-xl">المحاضرات</p>
            </Link>
            <Link onClick={closeDrawer} to="/student/invoice" className="flex gap-6 items-center hover:bg-gray-50 rounded-lg p-3">
              <Cardholder size={28} weight="fill" className="ct-primary " /> <p className="text-xl">طلبات الشحن </p>
            </Link>
            <Link onClick={closeDrawer} to="" className="flex gap-6 items-center hover:bg-red-50 text-danger rounded-lg p-3">
              <SignOut size={28} />
              <p className="text-xl">تسجيل الخروج</p>
            </Link>
          </div>
        </Drawer>
      </React.Fragment>
      <NavBar drawer={openDrawer} />
      <Outlet />
    </div>
  );
}
