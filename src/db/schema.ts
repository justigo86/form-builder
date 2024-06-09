import { subscribe } from "diagnostics_channel";
import { relations } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// const connectionString =
//   process.env.DATABASE_URL ||
//   "postgres://postgres:postgres@localhost:5432/drizzle" ||
//   "postgres://postgres:postgres@localhost:5432/postgres";
// const pool = postgres(connectionString, { max: 1 });
// export const db = drizzle(pool);

//drizzle form elements
export const formElements = pgEnum("field_type", [
  "RadioGroup",
  "Select",
  "Input",
  "Textarea",
  "Switch",
]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  stripeCustomerId: text("stripe_customer_id"),
  subscribed: boolean("subscribed"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

//additional tables added
//serial and boolean imported from Drizzle
export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  userId: text("user_Id"),
  published: boolean("published"),
});
//define how the tables are related - many forms to one user
export const formsRelations = relations(forms, ({ many, one }) => ({
  questions: many(questions),
  user: one(users, {
    fields: [forms.userId],
    references: [users.id],
  }),
  submissions: many(formSubmissions),
}));

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  text: text("text"),
  fieldType: formElements("field_type"),
  formId: integer("form_id"),
});
export const questionsRelations = relations(questions, ({ one, many }) => ({
  form: one(forms, {
    fields: [questions.formId],
    references: [forms.id],
  }),
  fieldOptions: many(fieldOptions),
  answers: many(answers),
}));

export const fieldOptions = pgTable("field_options", {
  id: serial("id").primaryKey(),
  text: text("text"),
  value: text("value"),
  questionId: integer("question_id"),
});
export const fieldOptionsRelations = relations(fieldOptions, ({ one }) => ({
  question: one(questions, {
    fields: [fieldOptions.questionId],
    references: [questions.id],
  }),
}));

export const answers = pgTable("answers", {
  id: serial("id").primaryKey(),
  value: text("value"),
  questionId: integer("question_id"),
  formSubmissionId: integer("form_submission_id"),
  fieldOptionsId: integer("field_options_id"),
});

export const answersRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  formSubmission: one(formSubmissions, {
    fields: [answers.formSubmissionId],
    references: [formSubmissions.id],
  }),
  fieldOption: one(fieldOptions, {
    fields: [answers.fieldOptionsId],
    references: [fieldOptions.id],
  }),
}));

export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  formId: integer("form_id"),
});

export const formSubmissionsRelations = relations(
  formSubmissions,
  ({ one, many }) => ({
    form: one(forms, {
      fields: [formSubmissions.formId],
      references: [forms.id],
    }),
    answers: many(answers),
  })
);
