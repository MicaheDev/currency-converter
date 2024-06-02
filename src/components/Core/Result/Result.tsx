import React from "react";
import { ResultProps } from "./types";

function Result({
  amount,
  fromCurrency,
  convertedAmount,
  toCurrency,
  fromCurrencyDetails,
  toCurrencyDetails,
}: ResultProps) {
  return (
    <section className="my-2 text-neutral-900">
      <div className="flex gap-1 text-lg">
        <h4 className="max-w-[500px] overflow-hidden text-ellipsis max-md:max-w-[180px]">
          {amount}
        </h4>
        <span className="font-medium">
          {" "}
          {fromCurrencyDetails ? fromCurrencyDetails?.symbol_native : "$"}{" "}
          {fromCurrency} =
        </span>
      </div>
      <div className="flex gap-1 text-2xl">
        <h2 className="max-w-[500px] overflow-hidden text-ellipsis font-medium max-md:max-w-[180px]">
          {convertedAmount !== null ? convertedAmount : "0.00"}{" "}
        </h2>
        <span className="font-bold">
          {toCurrencyDetails ? toCurrencyDetails?.symbol_native : "$"}{" "}
          {toCurrency}
        </span>
      </div>
    </section>
  );
}

export default Result;
