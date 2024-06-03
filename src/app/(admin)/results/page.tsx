import { getUserForms } from "@/app/actions/getUserForms";
import { forms } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";
import FormsPicker from "./FormsPicker";

type Props = {};

//async to call getUserForms
const page = async (props: Props) => {
  const userForms: Array<InferSelectModel<typeof forms>> = await getUserForms();

  if (!userForms?.length || userForms.length === 0) {
    return <div>No forms found</div>;
  }

  const selectOptions = userForms.map((form) => {
    return { value: form.id, label: form.name };
  });

  return (
    <div>
      Results: <FormsPicker options={selectOptions} />
    </div>
  );
};

export default page;
