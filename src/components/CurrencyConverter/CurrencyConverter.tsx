/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { RateSelect, AmountInput, Loader } from "@/components";
import { useCurrencyConverter } from "@/hooks";

function CurrencyConverter() {
  const {
    rates,
    loading,
    error,
    amount,
    fromCurrency,
    toCurrency,
    convertedAmount,
    isConverting,
    handleAmountChange,
    handleFromCurrencyChange,
    handleToCurrencyChange,
    handleSwapCurrencies,
  } = useCurrencyConverter();

  return (
    <div className="bg-neutral-50 p-10 rounded-xl shadow-xl">
      <h1 className="text-2xl mb-4 font-bold">Currency Converter</h1>
      <form
        className="flex items-end gap-2 max-md:flex-col max-md:items-start"
        onSubmit={(e) => e.preventDefault()}
      >
        <AmountInput
          value={amount}
          handleChange={handleAmountChange}
          placeHolder="Ingrese la cantidad"
          currency={fromCurrency}
          loader={isConverting}
          rates={rates}
          label="Amount"
        />
        <RateSelect
          value={fromCurrency}
          handleChange={handleFromCurrencyChange}
          rates={rates}
          label="from:"
        />
        <button
          aria-label="Invertir monedas"
          className="bg-neutral-900 px-4 h-[40px] text-neutral-50 rounded-md"
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
        />
      </form>

      {error && <div>{error}</div>}

      <h3 className="text-md">
        {amount} {fromCurrency} =
      </h3>
      <h2 className="font-medium text-2xl">
        {convertedAmount !== null ? convertedAmount.toFixed(2) : "0.00"}{" "}
        <span className="font-bold">{toCurrency}</span>
      </h2>

      <div className="h-[10px]">
        <Loader
          loader={loading}
          text="Cargando datos de las monedas..."
          loadIcon={false}
        />
      </div>
    </div>
  );
}

export default CurrencyConverter;
