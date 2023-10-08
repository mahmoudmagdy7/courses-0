import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import siteConfig from "../../public/site-config";

function Lecture() {
  const { lectureId } = useParams();
  const [lecture, setLecture] = useState({});
  async function getLectureDate() {
    try {
      const { data } = await axios.get(siteConfig.ApiUrl + `/lectures/${lectureId}`);
      console.log(data.result);
    } catch (e) {
      console.log(e);
    }
  }
  useLayoutEffect(() => {
    getLectureDate();
  });
  return (
    <>
      <main>
        <div className="m-auto">
          <h2 className="text-4xl"> sections</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolorem maiores, molestias ratione unde sit</p>
        </div>

        <video
          controls
          _ngcontent-rix-c0=""
          class="vjs-tech"
          data-setup="{}"
          id="my-video_html5_api"
          preload="auto"
          tabindex="-1"
          controlsList="nodownload"
          src="https://m204.syncusercontent.com/mfs-60:fc884a66fba77509a0441924aba1194d=============================/p/20230821_120827.mp4?allowdd=0&amp;datakey=h0wkTWQZ2xkSsLOBf+7xYl0pT0sIazgFZzltuPdnEq43wE2lueds4nh1MhBzM/7sQa/0Murj9tqTaZTOWN2fpgsSxsE+M9DREnIJOyzEEaV2EA1WRNtaqfoHrSf+MAIHVvP1NxYxHIm0khHj0XbdNe/Xx5Yv0dtzMe3Va1NZOtWfimdniDbIstqhy6Js5ps5qnYoS4EiQDVtYys3cTymi6uhDz8/YTOXe6oJqqqHN0Ud3ypQn9rTwfd4EU45XgxacHpf4fEjCjZ5vBPpASM2ZmCgfuMOq32AOZS8csbirC8rQNTNkNODGMK3rJzHWl0s/fd+HxC2gDXDPRTrwXMtyQ&amp;engine=ln-3.1.38&amp;errurl=XBsvGEKE5tBQmd9/9LB5esBlbauWMJCVf/M7N5jYkFLE6DV0J6M/5DkeDiKwxFTX/HeJOVRwtHxaBNO9+HuVto2CoFEu5a7R3f0VyMqd3j80D1WMI7mu8aDd950CCv7HZhx42q0uu3mctUo4dLT/2rdSTof10HjZxt0tK/YXirb567AmT9C4v09BUH9Xj62ZbmgTLNo9uJ9XafyY05hhZj/1JUtzh85XWc2C1RubAFFuc+4tgwpibHfJZI8R6pI7gSWrObfkcXYu1oXv5nqnB+brk2rcWYH6enSgt1wFTZIOBtPLd5cxmwPmEWyhIee+CfvQUZaG1TSGeinNk8eGkw==&amp;header1=Q29udGVudC1UeXBlOiB2aWRlby9tcDQ&amp;header2=Q29udGVudC1EaXNwb3NpdGlvbjogaW5saW5lOyBmaWxlbmFtZT0iMjAyMzA4MjFfMTIwODI3Lm1wNCI7ZmlsZW5hbWUqPVVURi04JycyMDIzMDgyMV8xMjA4MjcubXA0Ow&amp;ipaddress=2630492740&amp;linkcachekey=8979467f0&amp;linkoid=1764630014&amp;mode=101&amp;sharelink_id=9788975460014&amp;timestamp=1696782955710&amp;uagent=315e0b8afb1b1d0f02bb3e598ac9524a5db04ed7&amp;signature=6c32ac4967d560f6dd2353042a5c5a91709f0109&amp;cachekey=60:fc884a66fba77509a0441924aba1194d============================="
        >
          <p _ngcontent-rix-c0="" class="vjs-no-js">
            {" "}
            To view this video please enable JavaScript, and consider upgrading to a web browser that{" "}
            <a _ngcontent-rix-c0="" href="https://videojs.com/html5-video-support/" target="_blank" class="vjs-hidden" hidden="hidden">
              supports HTML5 video
            </a>
          </p>
        </video>
      </main>
      <section className="mt-10"> quizz will be here</section>
    </>
  );
}

export default Lecture;
