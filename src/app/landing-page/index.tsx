import React from "react";
import FormGenerator from "../form-generator";
import Image from "next/image";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div>
      {/* background produced with fffuel.com and applied with bg-[url()] - not included */}
      <section
        className="flex flex-col items-center justify-center space-y-4 pt-4 sm:pt-24 w-full"
        id="hero"
      >
        <h1 className="text-4xl font-bold text-center tracking-tighter sm:text-5xl md:text-6xl leading-6">
          Create forms fast!
        </h1>
        <p className="max-w-[600px] mt-4 text-center text-gray-500 md:textl-xl">
          Generate forms quickly with AI to then publish and share. Also dive
          into insightful results, charts, and analytics.
        </p>
        <FormGenerator />
        {/* <div className="w-full bg-gradient-to-b from-transparent to-white h-24"></div> */}
      </section>
      <section
        className="flex flex-col items-center justify-center space-y-4 mt-12 pb-24"
        id="features"
      >
        <h2 className="text-3xl font-bold text-center tracking-tighter sm:text-4xl md:text-5xl leading-6">
          How It Works
        </h2>
        <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl text-center">
          <li className="flex flex-col items-center space-y-4 relative">
            {/* Insert images of end product
            <Image
              src=""
              width="250"
              height="250"
              alt=""
              className="bg-white p-4 shadow-sm border rounded-md"
            /> */}
            {/* arrow between images
            <Image src="/arrow.svg"
              width="125"
              height="125"
              alt="arrow"
              className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2" /> */}
            <p>1. Use prompts to describe the requirements for your form.</p>
          </li>
          <li className="flex flex-col items-center space-y-4 relative">
            {/* Insert images of end product
            <Image
              src=""
              width="250"
              height="250"
              alt=""
              className="bg-white p-4 shadow-sm border rounded-md"
            /> */}
            {/* arrow between images
            <Image src="/arrow.svg"
              width="125"
              height="125"
              alt="arrow"
              className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 scale-x-[-1] rotate-180" /> */}
            <p>2. Generate the form.</p>
          </li>
          <li className="flex flex-col items-center space-y-4 relative">
            {/* Insert images of end product
            <Image
              src=""
              width="250"
              height="250"
              alt=""
              className="bg-white p-4 shadow-sm border rounded-md"
            /> */}
            <p>3. Check/update the results, analytics, and more.</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default LandingPage;
