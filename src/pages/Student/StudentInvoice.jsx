import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import siteConfig from "../../../public/site-config";
import Cookies from "js-cookie";
import { Card, Chip } from "@nextui-org/react";
function StudentInvoice() {
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getStudentInvoice() {
    try {
      const { data } = await axios(siteConfig.ApiUrl + `/tickets/userTicket`, {
        method: "GET",
        headers: {
          token: Cookies.get("userToken"),
        },
      });
      console.log(data);
      setInvoice(data.ticket);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  useLayoutEffect(() => {
    getStudentInvoice();
  }, []);
  return (
    <section className="p-5 max-w-4xl m-auto">
      <div>
        {!isLoading && invoice !== null
          ? invoice.map((ticket) => {
              const dateString = ticket?.createdAt;
              const date = new Date(dateString);

              const options = { year: "numeric", month: "short", day: "numeric", hour: "numeric" };
              const formattedDate = date.toLocaleDateString(undefined, options);

              return (
                <Card className="mb-3 rounded-md flex-row justify-between px-8 py-3 flex-wrap gap-3">
                  <div>
                    <div className="flex gap-2 items-center mb-2">
                      <Chip
                        // className="bg-gradient-to-tl from-orange-500  to-orange-100 text-white"
                        variant="flat"
                        color={ticket.status == "succes" ? "success" : ticket.status == "pending" ? "warning" : "danger"}
                      >
                        {ticket.status}
                      </Chip>
                      <span className="font-semibold"> EGP {ticket.amount}</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <span className="text-xs">{ticket._id} </span>| {formattedDate}
                    </p>
                  </div>{" "}
                  <div className="text-start ">
                    <span className="mb-3 inline-block"> من</span>
                    <p className="text-sm text-gray-700">{ticket.senderPhone}</p>
                  </div>{" "}
                  <div className="text-start  ">
                    <span className="mb-3 inline-block"> الي</span>
                    <p className="text-sm text-gray-700">{ticket.receiverPhone}</p>
                  </div>
                </Card>
              );
            })
          : "loading"}
      </div>
    </section>
  );
}

export default StudentInvoice;
