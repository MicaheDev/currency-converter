"use client";

import { useState, useEffect } from "react";
import { convertCurrency } from "@/services";
import { useExchangeRates } from "@/hooks";
import { RateSelector } from "@/components";
import { validateAmount } from "@/utilities";

function CurrencyConverter() {
  const { rates, loading, error } = useExchangeRates();

  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const validateValue = validateAmount(value);
    setAmount(validateValue);
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
    const getConvertedAmount = async () => {
      if (amount === "" || isNaN(parseFloat(amount))) {
        setConvertedAmount(null);
        return;
      }

      setIsConverting(true);
      try {
        const rate = await convertCurrency(fromCurrency, toCurrency);
        setConvertedAmount(parseFloat(amount) * rate);
      } catch (error) {
        console.error("Error converting currency:", error);
      } finally {
        setIsConverting(false);
      }
    };
    getConvertedAmount();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Ingrese la cantidad"
        />
        <RateSelector
          value={fromCurrency}
          handleChange={handleFromCurrencyChange}
          rates={rates}
        />
        <button onClick={handleSwapCurrencies}>Invertir</button>
        <RateSelector
          value={toCurrency}
          handleChange={handleToCurrencyChange}
          rates={rates}
        />
      </div>
      {error ? (
        <div>{error}</div>
      ) : (
        <h2>
          {amount} {fromCurrency} ={" "}
          {convertedAmount !== null ? convertedAmount.toFixed(2) : "000"}{" "}
          {toCurrency}
        </h2>
      )}
      {loading && <div>Cargando datos de las monedas...</div>}
      {isConverting && <div>Convirtiendo...</div>}
    </div>
  );
}

export default CurrencyConverter;
