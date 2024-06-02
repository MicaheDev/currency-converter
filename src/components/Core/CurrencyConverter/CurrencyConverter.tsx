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
    fromCurrencyDetails,
    toCurrencyDetails,
  } = useCurrencyConverter();

  return (
    <div className="max-md:backdrop-filter-blur-md m-auto w-full rounded-xl border-2 border-indigo-500 bg-neutral-50 p-10 shadow-xl max-md:h-screen max-md:w-screen max-md:rounded-none max-md:border-none max-md:bg-white/90 max-md:px-4 max-md:py-6">
      <h1 className="text-2xl font-black text-indigo-500">
        Currency Converter
      </h1>
      <p className="mb-2 text-sm text-neutral-500">
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
        fromCurrencyDetails={fromCurrencyDetails}
        toCurrencyDetails={toCurrencyDetails}
      />

      <Loader loader={loading} text="Loading Currencies..." />
    </div>
  );
}

export default CurrencyConverter;
