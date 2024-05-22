import Header from "@/components/ui/header";
import FormGenerator from "./form-generator";
import { Providers } from "./providers";
import { db } from "@/db";
import FormsList from "./forms/FormsList";

export default async function Home() {
  const forms = await db.query.forms.findMany();

  return (
    <Providers>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-24">
        <FormGenerator />
        <FormsList forms={forms} />
      </main>
    </Providers>
  );
}
