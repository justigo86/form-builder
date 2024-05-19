"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
//had to update tsconfig.json to be able to @actions dir
import { generateForm } from "@/actions/generateForm";
import { useFormState, useFormStatus } from "react-dom";

type Props = {};

const initialState: {
  message: string;
  data?: any;
} = {
  message: "",
};

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating..." : "Generate"}
    </Button>
  );
}

const FormGenerator = (props: Props) => {
  // useFormState( fn, initialState, permalink? )
  const [state, formAction] = useFormState(generateForm, initialState);
  const [open, setOpen] = useState(false);

  //when state.message changes, check for success to close dialog
  useEffect(() => {
    if (state.message === "success") {
      setOpen(false);
    }
    console.log(state);
  }, [state.message]);

  const onFormCreate = () => {
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={onFormCreate}>Create Form</Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Provide your form's purspose, who it is for, and the information it is meant to collect. AI will then help build it."
            />
          </div>
          <DialogFooter>
            <SubmitButton />
            <Button variant="link">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormGenerator;
