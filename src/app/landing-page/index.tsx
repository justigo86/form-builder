import React from "react";
import FormGenerator from "../form-generator";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div>
      {/* background produced with fffuel.com and applied with bg-[url()] - not included */}
      <section className="flex flex-col items-center justify-center space-y-4 pt-4 sm:pt-24 w-full">
        <h1 className="text-4xl font-bold text-center tracking-tighter sm:text-5xl md:text-6xl leading-6">
          Create forms fast!
        </h1>
        <p className="max-w-[600px] mt-4 text-center text-gray-500 md:textl-xl">
          Generate forms quickly with AI to then publish and share. Also dive
          into insightful results, charts, and analytics.
        </p>
        <FormGenerator />
      </section>
    </div>
  );
};

export default LandingPage;
