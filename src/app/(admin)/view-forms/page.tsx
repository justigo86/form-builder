import { getUserForms } from "@/app/actions/getUserForms";
import FormsList from "@/app/forms/FormsList";
import { forms as dbForms } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const forms: InferSelectModel<typeof dbForms>[] = await getUserForms();
  return (
    <div>
      <h1 className="text-3xl font-bold px-4 m-5">My Forms</h1>
      <FormsList forms={forms} />
    </div>
  );
};

export default page;
