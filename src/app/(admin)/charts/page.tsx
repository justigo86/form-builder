import { FormsBarChart } from "@/components/barChart";
import React from "react";

const page = async () => {
  return (
    <div>
      <h1 className="text-3xl font-bold my-5">Charts</h1>
      <FormsBarChart />
    </div>
  );
};

export default page;
