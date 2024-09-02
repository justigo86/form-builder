"use client";

import React, { useCallback } from "react";
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
import { InferSelectModel } from "drizzle-orm";

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
  data: FormSubmission[];
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

  const fetchFormData = async () => {
    // need to fetch data and set states
  };

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
          <SelectValue
            placeholder={options[0] ? options[0].label : "No forms available"}
          />
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
