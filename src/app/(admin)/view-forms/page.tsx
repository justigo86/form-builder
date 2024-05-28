import { getUserForms } from "@/app/actions/getUserForms";
import { forms as dbForms } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const forms: InferSelectModel<typeof dbForms>[] = await getUserForms();
  return <div>my forms</div>;
};

export default page;
