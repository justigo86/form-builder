import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";
import Table from "./results/Table";

type Props = {
  formId: number;
};

const ResultsDisplay = async ({ formId }: Props) => {
  const results = await db.query.forms.findFirst({
    where: eq(forms.id, formId),
    with: {
      questions: {
        with: {
          fieldOptions: true,
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

  if (!results) {
    return null;
  }

  return (
    <div>
      <Table />
    </div>
  );
};

export default ResultsDisplay;
