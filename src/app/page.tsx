import Header from "@/components/ui/header";
import { Providers } from "./providers";
import LandingPage from "./landing-page";

export default function Home() {
  return (
    <Providers>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-24">
        <LandingPage />
      </main>
    </Providers>
  );
}
