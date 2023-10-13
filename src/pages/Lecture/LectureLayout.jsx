import { Link, Outlet } from "react-router-dom";
import React from "react";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, UserCircleIcon, Cog6ToothIcon, InboxIcon, PowerIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon, CubeTransparentIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { Paperclip, SealQuestion } from "@phosphor-icons/react";

export default function LectureLayout() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <section className="flex w-full h-full overflow-hidden">
      <aside className=" w-80 ">
        <Card className="h-full border-t-1 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded">
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
            <Link to="quiz/6528820d4ca8ed44e1a79123" className="text-xl">
              <ListItem className="items-center">
                <ListItemPrefix>
                  <SealQuestion size={25} className="me-2" />
                </ListItemPrefix>
                الاختبار
              </ListItem>
            </Link>{" "}
            <Link to="quiz/6528820d4ca8ed44e1a79123" className="text-xl">
              <ListItem className="items-center">
                <ListItemPrefix>
                  <Paperclip size={25} className="me-2" />
                </ListItemPrefix>
                المذكرة
              </ListItem>
            </Link>
          </List>
          <Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
            <CubeTransparentIcon className="mb-4 h-12 w-12" />
            <Typography variant="h6" className="mb-1">
              Upgrade to PRO
            </Typography>
            <Typography variant="small" className="font-normal opacity-80">
              Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features and premium.
            </Typography>
            <div className="mt-4 flex gap-3">
              <Typography as="a" href="#" variant="small" className="font-medium opacity-80" onClick={() => setOpenAlert(false)}>
                Dismiss
              </Typography>
              <Typography as="a" href="#" variant="small" className="font-medium">
                Upgrade Now
              </Typography>
            </div>
          </Alert>
        </Card>
      </aside>
      <main className="p-5 grow overflow-y-scroll">
        <Outlet />
      </main>
    </section>
  );
}
