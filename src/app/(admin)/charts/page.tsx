import { FormsBarChart } from "@/components/barChart";
import React from "react";
import FormsPicker from "../results/FormsPicker";
import { BarChart2 } from "@/components/barChart2";

const page = async () => {
  return (
    <div>
      <h1 className="text-3xl font-bold my-5">Charts</h1>
      {/* <FormsPicker /> */}
      <FormsBarChart />
      <BarChart2 />
    </div>
  );
};

export default page;
