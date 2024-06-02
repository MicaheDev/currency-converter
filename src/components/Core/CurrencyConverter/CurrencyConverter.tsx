"use client";

import { Loader, CurrencyInputForm, Result, ErrorDisplay } from "@/components";
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
    <div className="bg-neutral-50 p-10 max-md:py-6 max-md:px-4 rounded-xl shadow-xl border-2 border-indigo-500 w-[100%]">
      <h1 className="text-2xl font-black text-indigo-500">
        Currency Converter
      </h1>
      <p className="text-sm mb-2 text-neutral-500">
        Welcome to our currency converter!
      </p>
      <CurrencyInputForm
        amount={amount}
        handleAmountChange={handleAmountChange}
        fromCurrency={fromCurrency}
        handleFromCurrencyChange={handleFromCurrencyChange}
        handleSwapCurrencies={handleSwapCurrencies}
        toCurrency={toCurrency}
        handleToCurrencyChange={handleToCurrencyChange}
        rates={rates}
        loader={isConverting}
      />

      <ErrorDisplay error={error} />

      <Result
        amount={amount}
        fromCurrency={fromCurrency}
        convertedAmount={convertedAmount}
        toCurrency={toCurrency}
      />

      <Loader loader={loading} text="Loading Currencies..." />
    </div>
  );
}

export default CurrencyConverter;
