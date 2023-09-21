import React from "react";

import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";

export default function PopOverCom(props) {
  return (
    <Popover
      showArrow
      backdrop="opaque"
      placement="right"
      classNames={{
        base: "py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50",
        arrow: "bg-default-200",
      }}
    >
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <h3>title</h3>
      </PopoverContent>
    </Popover>
  );
}
