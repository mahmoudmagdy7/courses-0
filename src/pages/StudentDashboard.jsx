import axios from "axios";
import React, { useEffect, useState } from "react";
import siteConfig from "../../public/site-config";
import Grade from "../components/StudentRelative/Grades";
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
    <section className="max-w-screen-xl h-[89vh] overflow-y-hidden-hidden m-auto text-center p-5">
      <Outlet />
      {/* <Grade /> */}
    </section>
  );
}
