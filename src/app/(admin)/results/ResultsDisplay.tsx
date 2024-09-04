"use client";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { ResultsTable } from "./Table";
import FormsPicker from "./FormsPicker";
import { InferSelectModel } from "drizzle-orm";
import { getUserForms } from "@/app/actions/getUserForms";
import {
  answers,
  fieldOptions,
  forms,
  formSubmissions,
  questions,
} from "@/db/schema";

// type Props = {
//   formId: number;
// };

type FieldOption = InferSelectModel<typeof fieldOptions>;

type Answer = InferSelectModel<typeof answers> & {
  fieldOption?: FieldOption | null;
};

type Question = InferSelectModel<typeof questions> & {
  fieldOptions: FieldOption[];
  // answers: Answer[];
};

type FormSubmission = InferSelectModel<typeof formSubmissions> & {
  answers: Answer[];
};

export type Form =
  | (InferSelectModel<typeof forms> & {
      questions: Question[];
      submissions: FormSubmission[];
    })
  | undefined;

interface DataProps {
  submissions: FormSubmission[];
  questions: Question[];
}

interface TableProps {
  data: DataProps;
  questions: Question[];
  submissions: FormSubmission[];
}

// const ResultsDisplay = ({ formId }: Props) => {
const ResultsDisplay = () => {
  const [selectOptions, setSelectOptions] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);
  const [data, setData] = useState<DataProps | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);

  const form = async () => {
    try {
      const userForms: Array<InferSelectModel<typeof forms>> =
        await getUserForms();
      // if (!userForms?.length || userForms.length === 0) {
      //   return <div>No forms found</div>;
      // }

      const selectOptions = userForms
        .filter((form) => form.name !== null)
        .map((form) => {
          return { value: form.id, label: form.name };
        });
      setSelectOptions(selectOptions);
    } catch (error) {
      console.log("Unable to fetch form data.", error);
    }
  };

  useEffect(() => {
    form();
  }, []);

  // const selectOptions = userForms.map((form) => {
  //   return { value: form.id, label: form.name };
  // });

  // await db.query.forms.findFirst({
  //   where: eq(forms.id, formId),
  //   with: {
  //     questions: {
  //       with: {
  //         fieldOptions: true,
  //         answers: true,
  //       },
  //     },
  //     submissions: {
  //       with: {
  //         answers: {
  //           with: {
  //             fieldOption: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  // if (!form) {
  //   return null;
  // }

  // if (!form.submissions) {
  //   return <p>No submissions for this form.</p>;
  // }

  return (
    <div>
      {selectOptions.length > 0 && (
        <FormsPicker
          options={selectOptions}
          setData={setData}
          setQuestions={setQuestions}
          setSubmissions={setSubmissions}
        />
      )}
      <ResultsTable
        data={data}
        questions={questions}
        submissions={submissions}
      />
    </div>
  );
};

export default ResultsDisplay;
