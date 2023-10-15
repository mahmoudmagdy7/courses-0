import axios from "axios";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import siteConfig from "../../../public/site-config";
import { Skeleton } from "@nextui-org/react";
import { Play } from "@phosphor-icons/react";
import { UserContext } from "../../Data/UserData";
function Lecture() {
  const { lectureId } = useParams();
  const [lecture, setLecture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userData = useContext(UserContext);

  async function getLectureDate() {
    try {
      const { data } = await axios.get(siteConfig.ApiUrl + `/lectures/${lectureId}`);
      console.log(data.result);
      setIsLoading(false);
      setLecture(data.result);
      userData.updateCurrentQuiz(data.result?.quizId);
      console.log(userData.currentQuizId);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getLectureDate();
  }, []);
  return (
    <section className="grow">
      {" "}
      {isLoading ? (
        <div className="  w-3/4 m-auto ">
          <Skeleton className="rounded-lg w-96 opacity-50  ">
            <div className="h-10 rounded-lg bg-default-300 "></div>
          </Skeleton>{" "}
          <div className=" relative">
            <Skeleton className="rounded-lg  opacity-50 h-[42rem] w-full mt-5  ">
              <div className=" rounded-lg bg-default-300 z-0 "></div>
            </Skeleton>{" "}
            <div className="w-12 h-12 bg-default-300 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 end-1/2  z-10 rounded-full flex items-center justify-center">
              <Play size={20} color="white" weight="fill" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-3/4 m-auto ">
          <div className="flex relative mb-5">
            <span className="w-[0.4rem] h-full inline-block absolute cbg-primary"></span>
            {lecture ? <h2 className="text-4xl ms-5 ct-0"> {lecture?.title + " - " + lecture?.section?.sectionTitle}</h2> : ""}{" "}
          </div>
          <div className="relative">
            <div className="absolute flex items-center  top-0 start-0 w-48 h-12  bg-gradient-to-l from-30% from-gray-500 via-80% ">
              <span className="ms-8 hover:cursor-default">physiker</span>
            </div>
            <iframe onLoad={console.log("done")} id="the-iframe" className="w-full h-[40rem]" src={lecture.videoUrl} allowfullscreen="allowfullscreen"></iframe>
          </div>
        </div>
      )}
    </section>
  );
}

export default Lecture;
