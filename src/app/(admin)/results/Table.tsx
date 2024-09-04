"use client";
//initial table template taken from Tanstack docs for React basic example

import * as React from "react";
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
import { InferSelectModel } from "drizzle-orm";
import {
  answers,
  fieldOptions,
  forms,
  formSubmissions,
  questions,
} from "@/db/schema";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  data: DataProps | null;
  questions: Question[];
  submissions: FormSubmission[];
}

// const columnHelper = createColumnHelper<FormSubmission>();

export function ResultsTable(props: TableProps) {
  const { data, questions, submissions } = props;
  // console.log("submissions: ", submissions);
  // console.log(data);

  // const columns = [
  //   columnHelper.accessor("id", {
  //     cell: (info) => info.getValue(),
  //   }),
  //mapping props allows us to have flexible table columns
  //   ...props.questions.map((question: Question, index: number) => {
  //     return columnHelper.accessor(
  //       (row) => {
  //         let answer = row.answers.find(
  //           (answer: Answer) => answer.questionId === question.id
  //         );
  //         if (!answer) return "";
  //         return answer.fieldOption ? answer.fieldOption.text : answer.value;
  //       },
  //       {
  //         header: () => question.text,
  //         id: question.id.toString(),
  //         cell: (info) => info.renderValue(),
  //       }
  //     );
  //   }),
  // ];

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  return (
    <div>
      {data && questions && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              {questions.map((question) => (
                <TableHead key={question.id}>{question.text}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(submissions || []).map((submission, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                {submission.answers.map((answer, i) => (
                  <TableCell key={i}>
                    {answer.value == null
                      ? answer?.fieldOption?.text
                      : answer.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>

    // <div className="p-2 mt-4">
    //   <div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg">
    //     <table>
    //       <thead>
    //         {table.getHeaderGroups().map((headerGroup) => (
    //           <tr key={headerGroup.id} className="border-b">
    //             {headerGroup.headers.map((header) => (
    //               <th key={header.id} className="text-left p-3">
    //                 {header.isPlaceholder
    //                   ? null
    //                   : flexRender(
    //                       header.column.columnDef.header,
    //                       header.getContext()
    //                     )}
    //               </th>
    //             ))}
    //           </tr>
    //         ))}
    //       </thead>
    //       <tbody className="divide-y divide-gray-200">
    //         {table.getRowModel().rows.map((row) => (
    //           <tr key={row.id} className="py-2">
    //             {row.getVisibleCells().map((cell) => (
    //               <td key={cell.id} className="p-3">
    //                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //               </td>
    //             ))}
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
}
