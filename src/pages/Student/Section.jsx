import axios from "axios";
import { useEffect, useRef, useState } from "react";
import siteConfig from "../../../public/site-config";
import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
function Section() {
  const [allLectures, setAllLectures] = useState([]);
  const { specificSectionId } = useParams();
  const userToken = Cookies.get("userToken");
  let userId = "";
  if (userToken) {
    userId = jwtDecode(userToken).id;
    // Use the userId or perform other actions with the token.
  } else {
    // Handle the case where the token is not found.
    console.log("Token not found");
  }
  async function buyLecture(lectureId) {
    console.log("buy lecture");
    try {
      const { data } = await axios(siteConfig.ApiUrl + `/lectures/${lectureId}`, {
        method: "POST",
        headers: { token: Cookies.get("userToken") },
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function getAllLectures() {
    try {
      const { data } = await axios.get(siteConfig.ApiUrl + `/sections/${specificSectionId}`);
      setAllLectures(data.result.lectures);
      console.log(data.result.lectures);
    } catch (e) {
      console.log(e);
    }
  }
  const couponRef = useRef("");
  async function applyCoupon(lectureId) {
    console.log(couponRef.current.value);
    try {
      const { data } = await axios(siteConfig.ApiUrl + `/coupon/applyCoupon`, {
        method: "POST",
        data: { code: couponRef.current.value },
        headers: { token: Cookies.get("userToken") },
      });
      console.log(data);
      toast.success(" تم إضافة " + data.user + " إلي رصيدك ");
    } catch (e) {
      toast.error(e.response.data.msgError);
      console.log(e.response.data.msgError);
    }
  }
  useEffect(() => {
    getAllLectures();
  }, []);
  return (
    <div className="max-w-7xl m-auto sm:px-5 px-2 ">
      <Toaster />
      <div className="m-auto">
        <h2 className="text-4xl"> sections</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolorem maiores, molestias ratione unde sit</p>
      </div>
      <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-2 pt-5">
        {allLectures?.map((lecture) => {
          return (
            <>
              <Card shadow="sm">
                <CardBody className="overflow-visible p-3">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt="title"
                    className="w-full object-cover h-[140px]"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s"
                  />
                  <div className="flex justify-between mt-5 items-center ">
                    <Link to={lecture.isPurchased.includes(userId) ? "/student/lecture/" + lecture._id : false} key={lecture._id}>
                      <b className="ct-primary text-lg">{lecture.title}</b>
                    </Link>
                    {lecture.isPurchased.includes(userId) ? (
                      <Chip variant="faded" className="text-success-500 border-success-200">
                        <div className="flex gap-1 items-center">
                          <CheckBadgeIcon className="h-6 w-6 text-success-400" />
                          <span> تم الشراء</span>
                        </div>
                      </Chip>
                    ) : (
                      <p sol className="ct-primary font-semibold">
                        {lecture.price} <span className="text-default-500">جنيه</span>
                      </p>
                    )}
                  </div>{" "}
                </CardBody>
                <CardFooter className="text-small justify-between">
                  {lecture.isPurchased.includes(userId) ? (
                    <Button className="w-full cbg-primary ct-5 text-lg " as={Link} type="button" to={"/student/lecture/" + lecture._id}>
                      إبدأ الدرس
                    </Button>
                  ) : (
                    <>
                      <Button className="w-2/3 me-2 cbg-primary ct-5 text-base" type="button" onClick={() => buyLecture(lecture._id)}>
                        شراء الدرس
                      </Button>
                      <Popover placement="bottom">
                        <PopoverTrigger>
                          <Button className="text-base">لديك قسيمة ؟ </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2">
                            <div className="text-small font-bold">ادخل القسيمة</div>
                            <label className=" block w-full">
                              <input
                                ref={couponRef}
                                className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent py-2 px-2 mt-2  placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                                placeholder="Physics526"
                                type="text"
                                id="lectureTitle"
                              />
                            </label>{" "}
                          </div>
                          <Button className="my-2" onClick={applyCoupon}>
                            إضافة الرصيد{" "}
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </>
                  )}
                </CardFooter>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Section;
