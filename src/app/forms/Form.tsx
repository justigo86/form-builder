"use client";

import {
  FieldOptionSelectModel,
  FormSelectModel,
  QuestionSelectModel,
} from "@/types/form-types";
import React, { useState } from "react";
import {
  Form as ShadCNForm,
  FormControl,
  FormField as ShadCNFormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import { Button } from "@/components/ui/button";
import { publishForm } from "../actions/mutateForm";
import FormPublishSuccess from "./FormPublishSuccess";

type Props = {
  form: Form;
  editMode?: boolean;
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
  const { editMode } = props;
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleDialogChange = (open: boolean) => {
    //update successDialogOpen
    setSuccessDialogOpen(open);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    if (editMode) {
      await publishForm(props.form.id);
      setSuccessDialogOpen(true);
    } else {
      let answers = [];
      for (const [questionId, value] of Object.entries(data)) {
        const id = parseInt(questionId.replace("question-", ""));
        let fieldOptionsId = null;
        let textValue = null;
        if (typeof value == "string" && value.includes("answerId_")) {
          fieldOptionsId = parseInt(value.replace("answerId_", ""));
        } else {
          textValue = value;
        }
        answers.push({
          questionId: id,
          fieldOptionsId,
          //using value because it is a field in the answers schema
          value: textValue,
        });
      }
    }
  };

  //uses conditional logic because the form structure depends on the type of answers
  return (
    <div className="text-center">
      <h1 className="text-lg font-bold py-3">{props.form.name}</h1>
      <h3 className="text-md">{props.form.description}</h3>
      <ShadCNForm {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
          <Button type="submit">{editMode ? "Publish" : "Submit"}</Button>
        </form>
      </ShadCNForm>
      {/* form publish dialog */}
      <FormPublishSuccess
        formId={props.form.id}
        open={successDialogOpen}
        onOpenChange={handleDialogChange}
      />
    </div>
  );
};

export default Form;
