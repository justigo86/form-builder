import { fieldOptions, forms, questions } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

//form-types for Form.tsx
export type FormSelectModel = InferSelectModel<typeof forms>;
export type QuestionSelectModel = InferSelectModel<typeof questions>;
export type FieldOptionSelectModel = InferSelectModel<typeof fieldOptions>;
