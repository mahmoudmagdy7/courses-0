import { useContext } from "react";
import { UserContext } from "../../Data/UserData";
import { Divider, Image } from "@nextui-org/react";

function Profile() {
  const { loggedUser } = useContext(UserContext);
  const dateString = loggedUser?.createdAt;
  const date = new Date(dateString);

  const options = { year: "numeric", month: "short", day: "numeric", hour: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  console.log(loggedUser);
  return (
    <>
      <section className=" max-w-3xl mx-auto  ">
        <div className="bg-white shadow-small overflow-hidden  bg-opacity-70 p-5 m-5 rounded-2xl">
          <div>
            <figure className=" flex items-center justify-center m-auto w-48 h-48 overflow-hidden rounded-full ">
              <Image src={loggedUser?.profileImage} alt="student profile image" />
            </figure>
            <p className="mt-4 text-lg ct-1  mb-3">{loggedUser.firstName + " " + loggedUser.lastName}</p>
            <div className="text-start">
              <ul className="flex flex-wrap gap-x-10 gap-y-4 items-center ">
                <li>
                  <p className="ct-1 text-sm"> تاريخ التسجيل</p>
                  <p>{formattedDate}</p>
                </li>{" "}
                <li className="">
                  <Divider orientation="vertical" className="h-8 hidden sm:block" />
                </li>
                <li>
                  <p className="ct-1 text-sm"> uID</p>
                  <p>{loggedUser?._id}</p>
                </li>{" "}
              </ul>
            </div>
          </div>
          <div className="border-t-1 border-dashed py-4 mt-4">
            <h3 className="text-start text-sm mb-3">المعلومات الشخصية</h3>
            <div className="text-start">
              <ul className="flex flex-wrap gap-x-10 gap-y-4  ">
                <li>
                  <p className="ct-1 text-sm">الهاتف</p>
                  <p>{loggedUser?.phone}</p>
                </li>{" "}
                <li>
                  <p className="ct-1 text-sm">هاتف ولي الامر</p>
                  <p>{loggedUser?.parentNumber}</p>
                </li>{" "}
                <li>
                  <p className="ct-1 text-sm"> البريد الالكتروني</p>
                  <p>{loggedUser?.email}</p>
                </li>{" "}
                <li>
                  <p className="ct-1 text-sm"> الرقم القومي</p>
                  <p>{loggedUser?.nationalId}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t-1 border-dashed py-4">
            <h3 className="text-start mb-3 text-sm"> معلومات المدرسة والموقع</h3>
            <div className="text-start">
              <ul className="flex flex-wrap gap-x-10 gap-y-4 ">
                <li>
                  <p className="ct-1 text-sm mb-2">المدرسة</p>
                  <p>{loggedUser?.school}</p>
                </li>{" "}
                <li>
                  <p className="ct-1 text-sm mb-2"> محافظة</p>
                  <p>{loggedUser?.government}</p>
                </li>{" "}
                <li>
                  <p className="ct-1 text-sm mb-2"> مدينة</p>
                  <p>{loggedUser?.city}</p>
                </li>{" "}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
