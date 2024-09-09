import { FormsBarChart } from "@/components/barChart";
import React from "react";
import FormsPicker from "../results/FormsPicker";

const page = async () => {
  return (
    <div>
      <h1 className="text-3xl font-bold my-5">Charts</h1>
      {/* <FormsPicker /> */}
      <FormsBarChart />
    </div>
  );
};

export default page;
