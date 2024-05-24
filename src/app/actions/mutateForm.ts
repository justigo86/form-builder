"use server";
//create new form from the openAI data
import { auth } from "@/auth";
import { db } from "@/db";
import { forms } from "@/db/schema";

export async function saveForm(data) {
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

  return formId;
}
