"use client";

import { Loader, CurrencyInputForm } from "@/components";
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

      {error && <div>{error}</div>}

      <section>
        <div className="text-md flex gap-1">
          <div className="max-w-[500px] overflow-hidden text-ellipsis">
            {amount}
          </div>
          <span>{fromCurrency} =</span>
        </div>
        <h2 className="font-medium text-2xl  max-w-[500px] overflow-hidden text-ellipsis">
          {convertedAmount !== null ? convertedAmount : "0.00"}{" "}
          <span className="font-bold">{toCurrency}</span>
        </h2>
      </section>

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
