"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {};

const FormGenerator = (props: Props) => {
  const [open, setOpen] = useState(false);

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
        <form>
          <div className="grid gap-4 py-4">
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Provide your form's purspose, who it is for, and the information it is meant to collect. AI will then help build it."
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="link">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormGenerator;
