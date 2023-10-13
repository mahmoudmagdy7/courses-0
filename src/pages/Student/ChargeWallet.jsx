import React, { useRef } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";

import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function ChargeWallet() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

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

  function handleSubmit(e) {
    e.preventDefault();
    window.open(`  https://wa.me/2${receiverPhoneRef.current.value}?text=*Amount :* ${amountRef.current.value}
    %0a*Sender :* ${senderPhoneRef.current.value} %0a `);
    console.log(amountRef.current.value);
    console.log(senderPhoneRef.current.value);
    console.log(receiverPhoneRef.current.value);
  }

  return (
    <div>
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
    </div>
  );
}

export default ChargeWallet;
