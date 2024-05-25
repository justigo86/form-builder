import { auth } from "@/auth";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";
//pull in form to edit

const page = async ({ params }: { params: { formId: string } }) => {
  const formId = params.formId;
  const session = await auth();

  const form = await db.query.forms.findFirst({
    where: eq(forms.id, parseInt(formId)),
    //to return the questions, need to use 'with'
    with: {
      questions: {
        with: { fieldOptions: true },
      },
    },
  });
  if (!formId) {
    return <div>Form not found</div>;
  }
  return <div>page</div>;
};

export default page;
