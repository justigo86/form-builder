"use client";

import React, { useCallback, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  answers,
  fieldOptions,
  forms,
  formSubmissions,
  questions,
} from "@/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";
import { db } from "@/db";
import { getUserSubmissions } from "@/app/actions/getUserSubmissions";

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

type SelectProps = {
  value: number;
  label?: string | null;
};

type Props = {
  options: Array<SelectProps>;
  setData: React.Dispatch<React.SetStateAction<DataProps | null>>;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setSubmissions: React.Dispatch<React.SetStateAction<FormSubmission[]>>;
};

const FormsPicker = (props: Props) => {
  const { options, setData, setQuestions, setSubmissions } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const formId = searchParams.get("formId") || options[0].value.toString();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const fetchFormData = async (formId: number) => {
    try {
      // need to fetch data and set states
      const userSubmissions = await getUserSubmissions(formId);

      if (userSubmissions) {
        const formsData: DataProps = {
          submissions: userSubmissions.submissions,
          questions: userSubmissions.questions,
        };
        setSubmissions(formsData.submissions);
        setQuestions(formsData.questions);
        setData(formsData);
      }
    } catch (error) {
      console.log("Unable to fetch form data.", error);
    }
  };

  useEffect(() => {
    fetchFormData(formId as unknown as number);
  }, [formId]);

  return (
    <div className="flex gap-2 items-center">
      <Label className="font-bold">Select a form</Label>
      <Select
        value={formId}
        onValueChange={(value) =>
          router.push(pathname + "?" + createQueryString("formId", value))
        }
      >
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder={options[0].label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormsPicker;
