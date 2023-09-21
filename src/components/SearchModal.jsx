import React, { useRef, useState } from "react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";
import axios from "axios";
import siteConfig from "../../public/site-config";
import { Phone } from "@phosphor-icons/react";
import SearchStudentResult from "./SearchStudentResult";
import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@nextui-org/react";

export default function SearchModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const phoneNumber = useRef("");
  const [searchResult, setSearchResult] = useState(null);
  async function searchForStudent() {
    // if (phoneNumber.current.value == "") {
    //   phoneNumber.current = "sljdlkjl";
    // }
    const { data } = await axios.get(`${siteConfig.ApiUrl}/users?keyword=${phoneNumber.current.value}`);
    setSearchResult(data.result);
    console.log(searchResult);
  }

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit">
        البحث عن طالب
      </Button>

      <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">البحث عن طالب </ModalHeader>
              <ModalBody>
                <label className="mb-5 block">
                  <span className="text-start ct-1">رقم الهاتف : </span>
                  <span className="relative mt-1.5 flex">
                    <input
                      maxLength={11}
                      ref={phoneNumber}
                      onChange={searchForStudent}
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
                <div>
                  {searchResult?.slice(0, 5).map((user) => {
                    return (
                      <Card key={user._id} className="shadow-sm mb-4 border">
                        <CardBody className=" py-0 text-small text-default-400">
                          <div className="flex gap-5 items-center h-16  ">
                            <Avatar isBordered radius="full" size="md" src={user.profileImage} />
                            <div className="flex flex-col gap-1 items-start justify-center">
                              <h4 className="text-small font-semibold leading-none text-default-600">{user.firstName + " " + user.lastName}</h4>
                              <h5 className="text-small tracking-tight text-default-400">{user.phone}</h5>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter className="justify-start">
                <Button color="danger" variant="light" onPress={onClose}>
                  إغلاق
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
