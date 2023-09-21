import React from "react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { UserPlus } from "@phosphor-icons/react";

export default function LongDialog({ modalContent, submitButtonTitle, modalTitle, modalButtonTitle }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const backdrops = ["opaque", "blur", "transparent"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant="flat" onPress={() => handleOpen("opaque")} className="capitalize mb-5">
          {modalButtonTitle}
        </Button>
      </div>
      <Modal placement={"center"} backdrop={backdrop} isOpen={isOpen} onClose={onClose} size="4xl" className="  overflow-auto sm:top-10 top-20">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">{modalTitle}</ModalHeader>
              <ModalBody>{modalContent}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {submitButtonTitle ? <Button color="primary">{submitButtonTitle}</Button> : ""}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
