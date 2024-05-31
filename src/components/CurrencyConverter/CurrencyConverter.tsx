/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useCallback } from "react";
import { convertCurrency } from "@/services";
import { useExchangeRates } from "@/hooks";
import { RateSelector, AmountInput, Loader } from "@/components";
import { validateAmount } from "@/utilities";
import { debounce } from "@/utilities";

function CurrencyConverter() {
  const { rates, loading, error } = useExchangeRates();

  const [amount, setAmount] = useState<string>("");
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

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFromCurrency(e.target.value);

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setToCurrency(e.target.value);

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
        className="flex items-center gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <AmountInput
          value={amount}
          handleChange={handleAmountChange}
          placeHolder="Ingrese la cantidad"
          currency={fromCurrency}
        />
        <RateSelector
          value={fromCurrency}
          handleChange={handleFromCurrencyChange}
          rates={rates}
          label="Desde:"
        />
        <button type="button" onClick={handleSwapCurrencies}>
          Invertir
        </button>
        <RateSelector
          value={toCurrency}
          handleChange={handleToCurrencyChange}
          rates={rates}
          label="a"
        />
      </form>
      {error ? (
        <div>{error}</div>
      ) : (
        <h2 className="text-xl">
          {amount} {fromCurrency} ={" "}
          {convertedAmount !== null ? convertedAmount.toFixed(2) : "000"}{" "}
          {toCurrency}
        </h2>
      )}

      <Loader loading={loading} text="Cargando datos de las monedas..." />
      <Loader loading={isConverting} text="Convirtiendo..." />
    </div>
  );
}

export default CurrencyConverter;
