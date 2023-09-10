import React, { useEffect, useRef, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner, Button } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { CurrencyDollar, Eye, EyeSlash, Lock, Phone } from "@phosphor-icons/react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import siteConfig from "/public/site-config";
function Wallets() {
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  // ======================== invoice =================
  let list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setPage((prev) => prev + 1);
      }

      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = await fetch(cursor || "https://swapi.py4e.com/api/people/?search=", { signal });
      let json = await res.json();

      if (!cursor) {
        setIsLoading(false);
      }

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });
  const hasMore = page < 9;
  // ======================== invoice =================

  // ======================== Adding Funds =================

  const [isSubmit, setIsSubmit] = useState(false); // Loading spinner state
  // Input values initialization
  const phoneNumber = useRef("");
  const funds = useRef("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Getting inputs values
    const transactionData = {
      phone: phoneNumber.current.value,
      balance: funds.current.value,
    };

    try {
      setIsSubmit(true); // Turn on loading spinner
      console.log(transactionData);
      const { data } = await axios.post(`${siteConfig.ApiUrl}/users/addFunds`, null, {
        headers: transactionData,
      }); // Fetch the data
      toast.success("تمت إضافة الرصيد \n رصي الطالب الان : " + data.result.balance + "ج");

      setIsSubmit(false); // Turn off loading spinner after getting the response
    } catch (error) {
      const { msgError } = error.response?.data;
      toast.error(msgError);
      setIsSubmit(false);
    }
  }

  useEffect(() => {
    /* Shapes */
    var svgContainer = document.getElementById("svgContainer");
    var animItem = bodymovin.loadAnimation({
      wrapper: svgContainer,
      animType: "svg",
      loop: true,
      path: "https://dev.anthonyfessy.com/check.json",
    });
  });
  return (
    <>
      <section className="m-5">
        <h1 className="text-3xl mb-8">المحافظ</h1>
        <Toaster />
        <div className="sm:px-5">
          <div className="flex">
            <div>
              <div className="bg-black bg-opacity-90 h-32 rounded-md w-96  relative">
                <figure className="absolute h-full m-0">
                  <img src="https://incrypto.merku.love/static/media/mountains.480723aab737044962d47a4b8ea75afb.svg" className="h-full" alt="" />
                  <img src="https://incrypto.merku.love/static/media/wallet.438f370c1c5a7e7244ae.webp" alt="" className="h-36 absolute bottom-0 end-2" />
                </figure>
                <div className="py-5 px-7 text-gray-400">
                  <h6>مجموع الارباح</h6>
                  <h3 className="text-white text-3xl mt-3 font-medium">
                    4056.5 <span className="text-xl text-gray-400">ج</span>
                  </h3>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="card mt-5 rounded-lg p-5 lg:p-7   border-neutral-800 border br-card   mb-5 ">
                <label className="mb-5 block">
                  <span className="text-start ct-1">رقم الهاتف : </span>
                  <span className="relative mt-1.5 flex">
                    <input
                      maxLength={11}
                      ref={phoneNumber}
                      className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5]  dark:focus:border-[#09bc9b]  focus:z-10 outline-0 br-input"
                      placeholder="01xxxxxxxxx"
                      type="text"
                      id="phoneNumber"
                    />
                    <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b]  ">
                      <Phone size={20} />
                    </span>
                  </span>
                  <p className="mt-2 text-red-600 hidden" id="phone-alert">
                    من فضلك ادخل رقم هاتف صحيح !
                  </p>
                </label>
                <label>
                  <span className="text-start ct-1"> الرصيد :</span>
                  <span className="relative mt-1.5 flex">
                    <input
                      ref={funds}
                      className="form-input peer w-full ct-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 dark:hover:border-gray-700 focus:border-[#4f46e5] dark:focus:border-[#09bc9b] focus:z-10 outline-0 br-input"
                      placeholder="5000"
                      type="text"
                      id="funds"
                    />
                    <span className="pointer-events-none absolute end-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-[#4f46e5] dark:peer-focus:text-[#09bc9b] ">
                      <CurrencyDollar size={20} />
                    </span>
                  </span>
                </label>

                {!isSubmit ? (
                  <Button type="submit" className="h-9 w-full mt-5 cbg-primary ct-5 cbg-primary-hover rounded-lg text-md disabled:opacity-40">
                    <span>إضافة الرصيد</span>
                  </Button>
                ) : (
                  <Button type="submit" className="h-9 w-full mt-5 cbg-primary ct-5 cbg-primary-hover rounded-lg text-md" isLoading>
                    <span>إضافة الرصيد</span>
                  </Button>
                )}
                <p className="ct-2 text-sm mt-4 text-center">
                  لا تمتلك حساب ؟
                  <Link className="ct-primary" to="/auth/signup">
                    &ensp; إنشاء حساب
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div id="svgContainer"></div>
        </div>
        <Table
          isHeaderSticky
          aria-label="Example table with client side sorting"
          bottomContent={
            hasMore && !isLoading ? (
              <div className="flex w-full justify-center">
                <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore}>
                  {list.isLoading && <Spinner color="white" size="sm" />}
                  Load More
                </Button>
              </div>
            ) : null
          }
          classNames={{
            base: "max-h-[520px] overflow-scroll",
            table: "min-h-[420px]",
          }}
        >
          <TableHeader>
            <TableColumn key="name">Name</TableColumn>
            <TableColumn key="height">Height</TableColumn>
            <TableColumn key="mass">Mass</TableColumn>
            <TableColumn key="birth_year">Birth year</TableColumn>
          </TableHeader>
          <TableBody isLoading={isLoading} items={list.items} loadingContent={<Spinner label="Loading..." />}>
            {(item) => <TableRow key={item.name}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>}
          </TableBody>
        </Table>
      </section>
    </>
  );
}

export default Wallets;
