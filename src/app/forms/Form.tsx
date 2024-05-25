"use client";

import {
  FieldOptionSelectModel,
  FormSelectModel,
  QuestionSelectModel,
} from "@/types/form-types";
import React from "react";
import {
  Form as ShadCNForm,
  FormControl,
  FormField as ShadCNFormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormField from "./FormField";

type Props = {
  form: Form;
};

//interface pulls in form-types
type QuestionWithOptionsModel = QuestionSelectModel & {
  fieldOptions: Array<FieldOptionSelectModel>;
};
interface Form extends FormSelectModel {
  questions: Array<
    QuestionSelectModel & {
      fieldOptions: Array<FieldOptionSelectModel>;
    }
  >;
}

const Form = (props: Props) => {
  const form = useForm();

  const handleSubmit = (data: any) => {
    return console.log(data);
  };

  //uses conditional logic because the form structure depends on the type of answers
  return (
    <div className="text-center">
      <h1 className="text-lg font-bold py-3">{props.form.name}</h1>
      <h3 className="text-md">{props.form.description}</h3>
      <ShadCNForm {...form}>
        <form
          onSubmit={handleSubmit}
          className="grid w-full max-w-3xl items-center gap-6 my-4"
        >
          {props.form.questions.map(
            (question: QuestionWithOptionsModel, index: number) => {
              return (
                <ShadCNFormField
                  control={form.control}
                  name={`question-${question.id}`}
                  key={`${question.text}_${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base mt-3">
                        {index + 1}. {question.text}
                      </FormLabel>
                      <FormControl>
                        <FormField
                          element={question}
                          key={index}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              );
            }
          )}
        </form>
      </ShadCNForm>
    </div>
  );
};

export default Form;
