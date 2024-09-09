"use client";

import { Bar, BarChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InferSelectModel } from "drizzle-orm";
import { useEffect, useState } from "react";
import {
  answers,
  fieldOptions,
  forms,
  formSubmissions,
  questions,
} from "@/db/schema";
import { getUserSubmissions } from "@/app/actions/getUserSubmissions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

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

const chartConfig = {
  id: {
    label: "id",
    color: "#3b82f6",
  },
  questionId: {
    label: "fieldOption.questionId",
    color: "#f59e0b",
  },
} satisfies ChartConfig;

export function FormsBarChart() {
  const [data, setData] = useState<DataProps | undefined>(undefined);
  const searchParams = useSearchParams();

  const formId = searchParams.get("formId");

  const fetchFormData = async (formId: number) => {
    try {
      // need to fetch data and set states
      const userSubmissions = await getUserSubmissions(1);
      console.log("userSubmissions: ", userSubmissions);

      if (userSubmissions) {
        if (!userSubmissions.submissions) {
          return <p>No submissions for this form.</p>;
        }
        const formsData: DataProps = {
          submissions: userSubmissions.submissions,
          questions: userSubmissions.questions,
        };
        // setSubmissions(formsData.submissions);
        // setQuestions(formsData.questions);
        setData(formsData);
      } else {
        return null;
      }
    } catch (error) {
      console.log("Unable to fetch form data.", error);
    }
  };

  useEffect(() => {
    fetchFormData(formId as unknown as number);
  }, []);

  return (
    // {data.}
    <div>
      <ChartContainer config={chartConfig}>
        <BarChart data={data?.submissions[1].answers}>
          <XAxis dataKey="fieldOption.value" />
          <Bar dataKey="fieldOption.id" fill="#3b82f6" />
          <Bar dataKey="fieldOption.questionId" fill="#f59e0b" />
          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
      </ChartContainer>
      <Button onClick={() => console.log("FORMSDATA: ", data)}>Click</Button>
    </div>
  );
}
