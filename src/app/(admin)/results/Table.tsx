"use client";
//initial table template taken from Tanstack docs for React basic example

import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { InferSelectModel } from "drizzle-orm";
import {
  answers,
  fieldOptions,
  forms,
  formSubmissions,
  questions,
} from "@/db/schema";

type FieldOption = InferSelectModel<typeof fieldOptions>;

type Answer = InferSelectModel<typeof answers> & {
  fieldOption?: FieldOption | null;
};

type Question = InferSelectModel<typeof questions> & {
  fieldOptions: FieldOption[];
  answers: Answer[];
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

interface TableProps {
  data: FormSubmission[];
  questions: Question[];
}

// const columnHelper = createColumnHelper<any>();
// const columnHelper = createColumnHelper<Question>();
const columnHelper = createColumnHelper<FormSubmission>();

export function Table(props: TableProps) {
  const { data } = props;

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
    }),
    //mapping props allows us to have flexible table columns
    ...props.questions.map((question: Question, index: number) => {
      return columnHelper.accessor(
        (row) => {
          let answer = row.answers.find(
            (answer: Answer) => answer.questionId === question.id
          );
          if (!answer) return "";
          return answer.fieldOption ? answer.fieldOption.text : answer.value;
        },
        {
          header: () => question.text,
          id: question.id.toString(),
          cell: (info) => info.renderValue(),
        }
      );
    }),
    // columnHelper.accessor((row) => row.lastName, {
    //   id: "lastName",
    //   cell: (info) => <i>{info.getValue()}</i>,
    //   header: () => <span>Last Name</span>,
    //   footer: (info) => info.column.id,
    // }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
