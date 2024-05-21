import Header from "@/components/ui/header";
import FormGenerator from "./form-generator";
import { Providers } from "./providers";

export default function Home() {
  return (
    <Providers>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <FormGenerator />
      </main>
    </Providers>
  );
}
