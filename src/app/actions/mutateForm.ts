"use server";
//create new form from the openAI data
import { auth } from "@/auth";
import { db } from "@/db";
import { fieldOptions, questions as dbQuestions, forms } from "@/db/schema";
import { eq, InferInsertModel } from "drizzle-orm";

type Form = InferInsertModel<typeof forms>;
type Question = InferInsertModel<typeof dbQuestions>;
type FieldOption = InferInsertModel<typeof fieldOptions>;

//type for saveForm parameter
interface SaveFormData extends Form {
  questions: Array<Question & { fieldOptions?: Array<FieldOption> }>;
}

export async function saveForm(data: SaveFormData) {
  const { name, description, questions } = data;
  const session = await auth();
  const userId = session?.user?.id;

  //add new form to DB - with values - an return the new form id
  const newForm = await db
    .insert(forms)
    .values({
      name,
      description,
      userId,
      published: false,
    })
    .returning({
      insertedId: forms.id,
    });
  const formId = newForm[0].insertedId;

  //add questions to DB
  const newQuestions = data.questions.map((question) => {
    return {
      text: question.text,
      fieldType: question.fieldType,
      fieldOptions: question.fieldOptions,
      formId,
    };
  });

  //using transaction for insertion because "bulk" transaction
  await db.transaction(async (tx) => {
    for (const question of newQuestions) {
      const [{ questionId }] = await tx
        .insert(dbQuestions)
        .values(question)
        .returning({ questionId: dbQuestions.id });

      if (question.fieldOptions && question.fieldOptions.length > 0) {
        await tx.insert(fieldOptions).values(
          question.fieldOptions.map((option) => ({
            text: option.text,
            value: option.value,
            questionId,
          }))
        );
      }
    }
  });

  return formId;
}

//update form status for 'published', if needed
export async function publishForm(formId: number) {
  await db.update(forms).set({ published: true }).where(eq(forms.id, formId));
}
