import { auth } from "@/auth";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";
import Form from "../../Form";
//pull in form to edit

const page = async ({ params }: { params: { formId: string } }) => {
  const formId = params.formId;
  const session = await auth();
  const userId = session?.user?.id;

  if (!formId) {
    return <div>Form not found</div>;
  }

  const form = await db.query.forms.findFirst({
    where: eq(forms.id, parseInt(formId)),
    //to return the questions, need to use 'with'
    with: {
      questions: {
        with: { fieldOptions: true },
      },
    },
  });

  if (userId !== form?.userId) {
    return <div>You are not authorized to view this page</div>;
  }

  if (!form) {
    return <div>Form not found</div>;
  }

  return <Form form={form} editMode={true} />;
};

export default page;
