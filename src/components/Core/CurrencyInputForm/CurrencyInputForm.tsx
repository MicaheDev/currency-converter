import React from "react";
import { AmountInput, RateSelect } from "@/components";
import { CurrencyInputFormProps } from "./types";

function CurrencyInputForm({
  amount,
  handleAmountChange,
  fromCurrency,
  handleFromCurrencyChange,
  handleSwapCurrencies,
  toCurrency,
  handleToCurrencyChange,
  rates,
  loader,
  fromCurrencyDetails,
  toCurrencyDetails
}: CurrencyInputFormProps) {
  return (
    <div className="flex items-end gap-2 max-md:flex-col max-md:items-start">
      <AmountInput
        value={amount}
        handleChange={handleAmountChange}
        placeHolder="0.00"
        loader={loader}
        fromCurrencyDetails={fromCurrencyDetails}
        label="Amount"
        id="amountInput"
      />
      <RateSelect
        value={fromCurrency}
        handleChange={handleFromCurrencyChange}
        rates={rates}
        label="from:"
        id="fromCurrencySelect"
        details={fromCurrencyDetails}
      />
      <button
        aria-label="swap currencies button"
        className="h-[40px] rounded-md bg-neutral-900 px-4 text-neutral-50"
        type="button"
        onClick={handleSwapCurrencies}
      >
        <i className="ri-arrow-left-right-line"></i>
      </button>
      <RateSelect
        value={toCurrency}
        handleChange={handleToCurrencyChange}
        rates={rates}
        label="to"
        id="toCurrencySelect"
        details={toCurrencyDetails}
      />
    </div>
  );
}

export default CurrencyInputForm;
