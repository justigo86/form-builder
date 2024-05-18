"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function generateForm(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    description: z.string().min(1),
  });

  //parse - check if data is valid w.type info - from zod docs
  //safeparse - zod will not throw errors when validation fails
  const parse = schema.safeParse({
    description: formData.get("description"),
  });

  if (!parse.success) {
    console.log(parse.error);
    return {
      message: "Failed to parse data",
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      message: "OpenAI API key not found",
    };
  }

  const data = parse.data;

  try {
    //fetch data openAI chat completion - create model response for conversation
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: data.description,
          },
        ],
      }),
    });
    const json = await response.json();
    revalidatePath("/");
    return {
      message: "success",
      data: json,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Failed to create form.",
    };
  }
}
