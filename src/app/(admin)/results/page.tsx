import React from "react";
import ResultsDisplay from "./ResultsDisplay";
// import { getUserForms } from "@/app/actions/getUserForms";
// import { forms } from "@/db/schema";
// import { InferSelectModel } from "drizzle-orm";
// import FormsPicker from "./FormsPicker";

// type Props = {};

//async to call getUserForms
// const page = async ({
//   searchParams,
// }: {
//   searchParams: {
//     [key: string]: string | string[] | undefined;
//   };
// }) => {
//   const userForms: Array<InferSelectModel<typeof forms>> = await getUserForms();

//   if (!userForms?.length || userForms.length === 0) {
//     return <div>No forms found</div>;
//   }

//   const selectOptions = userForms.map((form) => {
//     return { value: form.id, label: form.name };
//   });

//   return (
//     <div>
//       <FormsPicker options={selectOptions} />
//       {/* formId value has to be accessed via props bc server component
//       and done with searchParams functionality*/}
//       <ResultsDisplay
//         formId={
//           searchParams?.id
//             ? parseInt(searchParams.id as string)
//             : userForms[0].id
//         }
//       />
//     </div>
//   );
// };

const page = async () => {
  return (
    <div>
      <h1 className="text-3xl font-bold my-5">Results</h1>
      <ResultsDisplay />
    </div>
  );
};

export default page;
