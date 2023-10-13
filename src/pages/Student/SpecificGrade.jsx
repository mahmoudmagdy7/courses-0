import axios from "axios";
import { useEffect, useState } from "react";
import siteConfig from "../../../public/site-config";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";

function SpecificGrade() {
  const [allSections, setAllSections] = useState([]);
  const { specificGradeId } = useParams();
  async function getAllSections() {
    try {
      const { data } = await axios.get(siteConfig.ApiUrl + `/grades/${specificGradeId}`);
      setAllSections(data.result.sections);
      console.log(data.result);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAllSections();
  }, []);
  return (
    <div>
      <div className="m-auto">
        <h2 className="text-4xl"> sections</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolorem maiores, molestias ratione unde sit</p>
      </div>
      <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-10 pt-5">
        {allSections?.map((section) => {
          return (
            <Link to={"/student/section/" + section._id} key={section._id}>
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
                  <b>{section.sectionTitle}</b>
                  {/* <p className="text-default-500"> section : {grade.sections.length}</p> */}
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SpecificGrade;
