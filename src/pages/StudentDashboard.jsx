import axios from "axios";
import React, { useEffect, useState } from "react";
import siteConfig from "../../public/site-config";
import Grade from "./Student/Grades";
import { Outlet } from "react-router-dom";

export default function StudentDashboard() {
  const [allLectures, setAllLectures] = useState([]);

  async function getAllLectures() {
    try {
      const { data } = await axios.get(siteConfig.ApiUrl + "/lectures");
      setAllLectures(data.Lectures);
      // console.log(data.Lectures);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    // getAllLectures();
  }, []);
  return (
    <section className="h-[calc(100vh-4rem)]  overflow-y-hidden-hidden m-auto text-center ">
      <Outlet />
      {/* <Grade /> */}
    </section>
  );
}
