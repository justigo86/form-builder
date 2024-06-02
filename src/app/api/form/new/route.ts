import { db } from "@/db";
import { formSubmissions, answers as dbAnsewrs } from "@/db/schema";

//defining api route for new form
export async function POST(request: Request): Promise<Response> {
  const data = await request.json();
  console.log(data);
  const newFormSubmission = await db
    .insert(formSubmissions)
    .values({
      formId: data.formId,
    })
    .returning({
      insertedId: formSubmissions.id,
    });
  const [{ insertedId }] = newFormSubmission;

  //tx - transaction
  await db.transaction(async (tx) => {
    for (const answer of data.answers) {
      const [{ answerId }] = await tx
        .insert(dbAnsewrs)
        .values({ formSubmissionId: insertedId, ...answer })
        .returning({
          answerId: dbAnsewrs.id,
        });
    }
  });

  return Response.json(
    {
      formSubmissionId: insertedId,
    },
    { status: 200 }
  );
}
