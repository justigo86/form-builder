import { getUserForms } from "@/app/actions/getUserForms";
import FormsList from "@/app/forms/FormsList";
import { forms as dbForms } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";
import { SessionProvider } from "next-auth/react";
import FormGenerator from "../../form-generator";

const page = async () => {
  const forms: InferSelectModel<typeof dbForms>[] = await getUserForms();
  return (
    <div>
      <header className="flex flex-col md:flex-row items-center mb-10">
        <h1 className="text-3xl font-bold my-5 md:pr-8">Dashboard</h1>
        <SessionProvider>
          <FormGenerator />
        </SessionProvider>
      </header>
      <hr />
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-3xl font-bold mt-10">My Forms</h1>
        <FormsList forms={forms} />
      </div>
    </div>
  );
};

export default page;
