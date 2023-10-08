import { useEffect, useRef, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import LongDialog from "../../components/ModalUi";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import siteConfig from "../../../public/site-config";
import { Button, PopoverTrigger, Popover, PopoverContent } from "@nextui-org/react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { PencilSimple, Trash } from "@phosphor-icons/react";
function Lectures() {
  const [allLectures, setAllLectures] = useState([]);
  const [allGrades, setAllGrades] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [currentLectureData, setCurrentLectureData] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  async function getAllLectures() {
    const { data } = await axios.get(siteConfig.ApiUrl + "/lectures");
    setAllLectures(data.Lectures);
    console.log(data.Lectures.reverse());
  }
  async function getAllGrades() {
    const { data } = await axios.get(siteConfig.ApiUrl + "/grades");
    setAllGrades(data.grade);
  }
  async function getAllSections() {
    const { data } = await axios.get(siteConfig.ApiUrl + "/sections");
    setAllSections(data.Section);
  }

  const TABLE_HEAD = [" الدرس", " الفصل / الباب", "الرصيد", "action"];

  const lectureTitle = useRef("");
  const lectureURL = useRef("");
  const lectureSection = useRef("");
  const lectureGrade = useRef("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);

    const lectureData = {
      title: lectureTitle.current.value,
      videoUrl: lectureURL.current.value,
      section: lectureSection.current.value,
      grade: lectureGrade.current.value,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${siteConfig.ApiUrl}/lectures/`,
      headers: {
        token: Cookies.get("userToken"),
      },
      data: lectureData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setIsSubmit(false);
        toast.success(response.data.message);
        getAllLectures();
      })
      .catch((error) => {
        const { msgError } = error.response.data;

        console.log(error);
        setIsSubmit(false);
        toast.error(msgError);
      });

    // }
  }

  // ======================== Validation Function =============================
  function handleValidation(e) {
    console.log(e.target.value);
  }

  async function getCurrentLecture(id) {
    const { data } = await axios.get(siteConfig.ApiUrl + "/lectures/" + id);
    setCurrentLectureData(data.result);

    lectureTitle.current.value = data.result.title;
    lectureURL.current.value = data.result.videoUrl;
    lectureSection.current.value = data.result.section._id;
    // lectureGrade.value = data.result.title;
  }

  async function removeLecture(id) {
    await axios.delete(siteConfig.ApiUrl + "/lectures/" + id, { headers: { token: Cookies.get("userToken") } });
    document.querySelector("#layer div").click();
    getAllLectures();
  }

  async function updateLecture(e) {
    e.preventDefault();
    setIsUpdate(true);

    const lectureData = {
      title: lectureTitle.current.value,
      videoUrl: lectureURL.current.value,
      section: lectureSection.current.value,
      grade: lectureGrade.current.value,
    };

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${siteConfig.ApiUrl}/lectures/${currentLectureData._id}`,
      headers: {
        token: Cookies.get("userToken"),
      },
      data: lectureData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setIsUpdate(false);
        toast.success(response.data.message);
        getAllLectures();
      })
      .catch((error) => {
        const { msgError } = error.response.data;

        console.log(error);
        setIsUpdate(false);
        toast.error(msgError);
      });
  }

  useEffect(() => {
    getAllSections();
    getAllGrades();
    getAllLectures();
  }, []);
  return (
    <>
      <section className="px-5 h-screen">
        <div className="my-4">
          <form onSubmit={""} onChange={handleValidation} className="p-4">
            <Toaster />
            {/* ========== Lecture Name ========== */}
            <div className="flex gap-5">
              <label className="mb-3 block w-full">
                <span className="text-start ct-0">عنوان الدرس :</span>
                <span className="relative mt-1.5 flex">
                  <input
                    ref={lectureTitle}
                    className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                    placeholder="الالكترونات"
                    type="text"
                    id="lectureTitle"
                  />
                  <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  "></span>
                </span>
              </label>{" "}
              {/* ========== Lecture url ========== */}
              <label className="mb-3 block w-full">
                <span className="text-start ct-0">رابط الدرس :</span>
                <span className="relative mt-1.5 flex">
                  <input
                    ref={lectureURL}
                    className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                    placeholder="https://youtube.com/video/6df9679fdf"
                    type="text"
                    id="lectureURL"
                  />
                  <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  "></span>
                </span>
              </label>{" "}
            </div>
            {/* ========== Lecture Section ========== */}
            <div className="flex gap-5">
              <label className="mb-3 block w-full">
                <span className="text-start ct-0">الفصل او الباب :</span>
                <span className="relative mt-1.5 flex">
                  <select
                    ref={lectureSection}
                    className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                    placeholder="الالكترونات"
                    type="text"
                    id="lectureSection"
                  >
                    {allSections?.map((s) => (
                      <option value={s._id}>{s.sectionTitle}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  "></span>
                </span>
              </label>{" "}
              {/* ========== Lecture Grade ========== */}
              <label className="mb-3 block w-full">
                <span className="text-start ct-0"> المرحلة التعليميثة :</span>
                <span className="relative mt-1.5 flex">
                  <select
                    ref={lectureGrade}
                    className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                    placeholder="الالكترونات"
                    type="text"
                    id="lectureGrade"
                  >
                    {allGrades?.map((g) => (
                      <option value={g._id}>{g.gradeTitle}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  "></span>
                </span>
              </label>
            </div>
            <div className="flex gap-5">
              {!isSubmit ? (
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  className="h-9 w-full mt-5 cbg-primary ct-5 cbg-primary-hover rounded-lg text-md disabled:opacity-40"
                >
                  <span>إضافة</span>
                </Button>
              ) : (
                <Button type="submit" className="h-9 w-full mt-5 cbg-primary ct-5 cbg-primary-hover rounded-lg text-md" isLoading>
                  <span>إضافة</span>
                </Button>
              )}{" "}
              {!isUpdate ? (
                <Button onClick={updateLecture} color="warning" type="submit" className="h-9 w-full mt-5 ct-5 rounded-lg text-md disabled:opacity-40">
                  <span>تعديل</span>
                </Button>
              ) : (
                <Button type="submit" className="h-9 w-full mt-5 cbg-primary ct-5 cbg-primary-hover rounded-lg text-md" isLoading>
                  <span>تعديل</span>
                </Button>
              )}
            </div>
          </form>
        </div>
        <div className="flex gap-3"></div>
        <Card className="h-full w-full overflow-scroll  ">
          <table className="w-full min-w-max table-auto text-start">
            <thead className="text-center">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="  border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allLectures?.map((lecture, index) => {
                return (
                  <tr key={lecture._id} className="text-center border-b ">
                    <td>
                      <Typography variant="small" className="font-medium ct-primary">
                        <Link to={`/f35-fighter/profile/${lecture._id}`}>{lecture.title}</Link>
                      </Typography>
                    </td>
                    <td className={"bg-blue-gray-50/50"}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {lecture.section.sectionTitle}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {lecture._id}
                      </Typography>
                    </td>
                    <td className={"bg-blue-gray-50/50 w-1/6"}>
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
                          <Button key={lecture._id} onClick={() => removeLecture(lecture._id)} className="border-red-500 border text-gray-900 bg-red-100 mt-5">
                            delete
                          </Button>
                        </PopoverContent>
                      </Popover>
                      <Button className="my-2" onClick={() => getCurrentLecture(lecture._id)}>
                        {" "}
                        <PencilSimple size={20} className="text-black" />
                      </Button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </section>
    </>
  );
}

export default Lectures;
