import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";
import { ResultsTable } from "./Table";

type Props = {
  formId: number;
};

const ResultsDisplay = async ({ formId }: Props) => {
  const form = await db.query.forms.findFirst({
    where: eq(forms.id, formId),
    with: {
      questions: {
        with: {
          fieldOptions: true,
          answers: true,
        },
      },
      submissions: {
        with: {
          answers: {
            with: {
              fieldOption: true,
            },
          },
        },
      },
    },
  });

  if (!form) {
    return null;
  }

  if (!form.submissions) {
    return <p>No submissions for this form.</p>;
  }

  return (
    <div>
      <ResultsTable
        data={form.submissions}
        questions={form.questions}
        submissions={form.submissions}
      />
    </div>
  );
};

export default ResultsDisplay;
