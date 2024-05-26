"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import React from "react";

//need to know form, when to open publish modal
type Props = {
  formId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const FormPublishSuccess = (props: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Form Published</DialogTitle>
          <DialogDescription>
            Form now live and ready for users. Share the form by clicking button
            below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <p>Copy link</p>
          <div className="flex justify-between items-center border-2 border-gray-200 mt-2 pl-2 rounded-md">
            <input
              type="text"
              placeholder="link"
              disabled
              value={`/forms/${props.formId}`}
              className="w-full outline-none bg-transparent"
            />
            <Button>Copy</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormPublishSuccess;
