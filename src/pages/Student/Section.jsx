import axios from "axios";
import { useEffect, useState } from "react";
import siteConfig from "../../../public/site-config";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";

function Section() {
  const [allLectures, setAllLectures] = useState([]);
  const { specificSectionId } = useParams();
  console.log(specificSectionId);
  async function getAllLectures() {
    try {
      const { data } = await axios.get(siteConfig.ApiUrl + `/sections/${specificSectionId}`);
      setAllLectures(data.result.lectures);
      console.log(data.result.lectures);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAllLectures();
  }, []);
  return (
    <div>
      <div className="m-auto">
        <h2 className="text-4xl"> sections</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolorem maiores, molestias ratione unde sit</p>
      </div>
      <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-10 pt-5">
        {allLectures?.map((lecture) => {
          return (
            <Link to={"/student/lecture/" + lecture._id} key={lecture._id}>
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
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{lecture.title}</b>
                  {/* <p className="text-default-500"> lecture : {grade.lectures.length}</p> */}
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Section;
