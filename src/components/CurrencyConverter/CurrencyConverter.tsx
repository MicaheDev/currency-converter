/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { RateSelect, AmountInput, Loader } from "@/components";
import { useState, useEffect, useCallback } from "react";
import { convertCurrency } from "@/services";
import { useExchangeRates } from "@/hooks";
import { validateAmount } from "@/utilities";
import { debounce } from "@/utilities";

function CurrencyConverter() {
  const { rates, loading, error } = useExchangeRates();

  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const validatedValue = validateAmount(value);
    setAmount(validatedValue);
    debouncedConvertAmount(validatedValue, fromCurrency, toCurrency);
  };

  const handleFromCurrencyChange = (value: string) => setFromCurrency(value);

  const handleToCurrencyChange = (value: string) => setToCurrency(value);

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  useEffect(() => {
    convertAmount(amount, fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency]);

  const convertAmount = async (amount: string, from: string, to: string) => {
    if (amount === "" || isNaN(parseFloat(amount))) {
      setConvertedAmount(null);
      return;
    }

    setIsConverting(true);

    try {
      const rate = await convertCurrency(from, to);
      setConvertedAmount(parseFloat(amount) * rate);
    } catch (error) {
      console.error("Error converting currency:", error);
    } finally {
      setIsConverting(false);
    }
  };

  const debouncedConvertAmount = useCallback(debounce(convertAmount, 500), []);

  return (
    <div className="bg-neutral-50 p-10 rounded-xl shadow-xl">
      <form
        className="flex items-center gap-2 max-md:flex-col"
        onSubmit={(e) => e.preventDefault()}
      >
        <AmountInput
          value={amount}
          handleChange={handleAmountChange}
          placeHolder="Ingrese la cantidad"
          currency={fromCurrency}
          isLoading={isConverting}
        />
        <RateSelect
          value={fromCurrency}
          handleChange={handleFromCurrencyChange}
          rates={rates}
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
        />
      </form>

      <div>{error}</div>

      <h3 className="text-md">
        {amount} {fromCurrency} =
      </h3>
      <h2 className="font-medium text-2xl">
        {convertedAmount !== null ? convertedAmount.toFixed(2) : "0.00"}{" "}
        <span className="font-bold">{toCurrency}</span>
      </h2>

      <div className="h-[10px]">
      <Loader
        loading={loading}
        text="Cargando datos de las monedas..."
        loadIcon={false}
      />
      </div>
    </div>
  );
}

export default CurrencyConverter;
