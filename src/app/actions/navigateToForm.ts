"use server";
//spun off into own 'use server' file
//per recommendation from next docs
import { redirect } from "next/navigation";

export async function navigate(id: number) {
  redirect(`/forms/edit/${id}`);
}
