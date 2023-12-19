import React, { useRef, useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";

import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import html2canvas from "html2canvas";
import siteConfig from "../../../public/site-config";
function ChargeWallet() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [chargeTicket, setChargeTicket] = useState(null);
  // const ver = JWTVerifier.verify("sdfsdf");

  const dateString = chargeTicket?.createdAt;
  const date = new Date(dateString);

  const options = { year: "numeric", month: "short", day: "numeric", hour: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  const captureAndDownload = () => {
    const element = document.getElementById("ticket"); // Replace 'capture-div' with the ID of your target div

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `ticket-${formattedDate}`;
      link.click();
    });
  };

  function handleNext() {
    !isLastStep && setActiveStep((cur) => cur + 1);
    document.getElementById("last-step").click();
  }
  function handlePrev() {
    !isFirstStep && setActiveStep((cur) => cur - 1);
    document.getElementById("first-step").click();
  }

  const amountRef = useRef("");
  const senderPhoneRef = useRef("");
  const receiverPhoneRef = useRef("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios(siteConfig.ApiUrl + `/tickets`, {
        method: "post",
        data: { senderPhone: senderPhoneRef.current.value, receiverPhone: receiverPhoneRef.current.value, amount: amountRef.current.value },
        headers: {
          token: Cookies.get("userToken"),
        },
      });
      setChargeTicket(data.ticket[0]);
      console.log(data);
      setIsSubmited(true);
    } catch (error) {
      console.error(error.response.data.msgError);
    }
  }
  return (
    <>
      <div className="max-w-3xl m-auto">
        {chargeTicket !== null ? (
          <>
            {" "}
            <p className="inline-block mt-14 justify-center  py-3 text-success-600 bg-success-50 p-4 rounded-xl text-xl border-success-200 mb-5 border-2">
              عملية ناجحة{" "}
            </p>
            <div id="ticket" className="flex  justify-center  py-3">
              <div className="bg-[#e6bd65] h-80 w-1/4 rounded-2xl drop-shadow-xl  flex justify-center items-center ">
                <img src="/assets/images/9185914.png" className="rotate-90 relative start-36 " c alt="" />
                <p className="-rotate-90 relative end-36">Order id : {chargeTicket?._id}</p>
              </div>
              <div className="bg-[#F9FAFE] h-80 w-[32rem]  rounded-2xl border-t  drop-shadow-xl  text-end  pb-10 pt-8  px-14">
                <h4 className="border-b-2 pb-2 mb-4  flex justify-between flex-row-reverse items-end">
                  <span> Charging request</span> <span className="text-2xl font-semibold  ">{chargeTicket?.amount} EGP</span>
                </h4>
                <div className="flex mb-5 justify-end gap-16">
                  <div>
                    <p className="ct-1">student Name</p>
                    <p className="text-xl text-[#6C459D]">
                      {" "}
                      {chargeTicket?.firstName} {chargeTicket?.lastName}
                    </p>
                  </div>{" "}
                </div>{" "}
                <section className="flex justify-between">
                  <div className="">
                    <div className="mb-5">
                      <p className="ct-1">To</p>
                      <p className="text-xl text-[#6C459D]"> {chargeTicket?.receiverPhone}</p>
                    </div>
                    <div>
                      <p className="ct-1">Status</p>
                      <p className="text-lg  text-gray-800 flex flex-row-reverse items-center gap-2">
                        Pending <span className="w-3 h-3 bg-warning rounded-full inline-block"></span>
                      </p>
                    </div>
                  </div>
                  <div className="  ">
                    <div className="mb-5">
                      <p className="ct-1"> From </p>
                      <p className="text-xl text-[#6C459D]"> {chargeTicket.senderPhone}</p>
                    </div>
                    <div>
                      <p className="ct-1">Time</p>
                      <p className="text-lg  text-gray-800"> {formattedDate}</p>
                    </div>{" "}
                  </div>
                </section>
              </div>
            </div>
            <div className="text-start">
              <Button className="mt-12 ms-auto  text-base" onClick={captureAndDownload}>
                تحميل التذكرة
              </Button>
            </div>
          </>
        ) : (
          <div className="w-full py-4 px-8 " style={{ direction: "rtl" }}>
            <Stepper dir="rtl" activeStep={activeStep} isLastStep={(value) => setIsLastStep(value)} isFirstStep={(value) => setIsFirstStep(value)}>
              <Step onClick={() => setActiveStep(1)}>1</Step>
              <Step onClick={() => setActiveStep(0)}>2</Step>
            </Stepper>

            <div>
              <Tabs id="one" value="first-step">
                <TabsHeader className="opacity-0">
                  <Tab id="first-step" value="first-step">
                    1
                  </Tab>
                  <Tab id="last-step" value="last-step">
                    2
                  </Tab>
                </TabsHeader>
                <TabsBody>
                  <TabPanel className="text-start  p-5" value="first-step">
                    <p> يمكنك شحن المحفظة من خلال السنتر أو من خلال التحويل على المحافظ الإلكترونية التالية: </p>
                    <div>
                      <Link to="tel:01061005364">01061005364</Link>
                    </div>
                    <p class="text-warning">
                      يمكن تحويل أي مبلغ بداية من جنيه واحد وحتى 600 جنيه بحد أقصى ، ولا يسمح بأكثر من عملية شحن للطالب الواحد في نفس اليوم{" "}
                    </p>
                    <p>
                      {" "}
                      عند تحويل الرصيد سواء من خلال محفظتك الإلكترونة الشخصية أو من خلال السنترال يتم أخذ صورة ( سكرين شوت ) للعملية ومعرفة البيانات التالية :{" "}
                    </p>
                    <ol className=" ms-10 list-decimal">
                      <li>صافي المبلغ الذي تم تحويله</li>
                      <li>الرقم المرسل إليه</li>
                      <li>رقم محفظة المرسل منها</li>
                    </ol>
                    <p> لا يكون رقم المحفظة المرسل منها موجود في رسالة التحويل .. ويتم سؤال صاحب السنترال عنه </p>
                    <p class="text-warning">
                      {" "}
                      ملحوظة هامة : تحويل رصيد المحافظ الإلكترونية يختلف تماما عن شحن رصيد المكالمات للموبايل و أي تحويل رصيد مكالمات لا يعتد به.{" "}
                    </p>
                    <p class="text-warning"> في حالة الاسترداد يتم خصم مبلغ 50 جنيه من قيمة المبلغ على أن يتم الاسترداد في خلال 60 يوم </p>
                  </TabPanel>
                  <TabPanel value="last-step">
                    <form onSubmit={handleSubmit} className="p-5 text-start">
                      {" "}
                      <label className="mb-3 block w-full">
                        <span className="text-start ct-0">قيمة التحويل بدون كسور ( باللغة الانجليزية )</span>
                        <span className="relative mt-1.5 flex">
                          <input
                            ref={amountRef}
                            className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                            placeholder="500 جنيه"
                            type="text"
                            id="lectureTitle"
                          />
                          <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  "></span>
                        </span>
                      </label>{" "}
                      <label className="mb-3 block w-full">
                        <span className="text-start ct-0">الرقم المرسل منه ( باللغة الإنجليزية )</span>
                        <span className="relative mt-1.5 flex">
                          <input
                            ref={senderPhoneRef}
                            className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                            placeholder="01061005364"
                            type="text"
                            id="lectureTitle"
                          />
                          <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  "></span>
                        </span>
                      </label>{" "}
                      <label className="mb-3 block w-full">
                        <span className="text-start ct-0">الرقم المرسل اليه ( باللغة الإنجليزية )</span>
                        <span className="relative mt-1.5 flex">
                          <input
                            ref={receiverPhoneRef}
                            className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                            placeholder="01061005364"
                            type="text"
                            id="lectureTitle"
                          />
                          <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  "></span>
                        </span>
                      </label>{" "}
                      <Button type="submit">إرسال طلب شحن المحفظة </Button>
                    </form>
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </div>

            <div className="mt-16 flex justify-between">
              <Button onClick={handleNext} disabled={isLastStep}>
                التالي
              </Button>
              <Button onClick={handlePrev} disabled={isFirstStep}>
                السابق
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChargeWallet;
