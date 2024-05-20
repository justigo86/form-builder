import Header from "@/components/ui/header";
import FormGenerator from "./form-generator";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <FormGenerator />
      </main>
    </>
  );
}
