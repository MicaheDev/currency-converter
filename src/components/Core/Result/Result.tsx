import React from "react";
import { ResultProps } from "./types";

function Result({
  amount,
  fromCurrency,
  convertedAmount,
  toCurrency,
}: ResultProps) {
  return (
    <section className="my-4 text-neutral-900">
      <div className="flex gap-1 text-lg">
        <h4 className="max-w-[500px] max-md:max-w-[200px] overflow-hidden text-ellipsis">
          {amount}
        </h4>
        <span className="font-medium">{fromCurrency} =</span>
      </div>
      <div className="flex gap-1 text-2xl">
        <h2 className="font-medium max-w-[500px] max-md:max-w-[200px] overflow-hidden text-ellipsis">
          {convertedAmount !== null ? convertedAmount : "0.00"}{" "}
        </h2>
        <span className="font-bold">{toCurrency}</span>
      </div>
    </section>
  );
}

export default Result;
