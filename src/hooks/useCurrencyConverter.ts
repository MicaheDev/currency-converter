import { useState, useEffect, useCallback } from "react";
import { convertCurrency } from "@/services";
import { validateAmount } from "@/utilities";
import { useExchangeRates } from "@/hooks";

export function useCurrencyConverter() {
  const { rates, loading, error, setError } = useExchangeRates();

  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    if (rates.length > 0 && fromCurrency && toCurrency) {
      getNewRate(fromCurrency, toCurrency);
    }
  }, [rates, fromCurrency, toCurrency]);

  useEffect(() => {
    if (rate && !isNaN(parseFloat(amount))) {
      calculateAmount(rate);
    }
  }, [rate, amount]);

  function calculateAmount(rate: number) {
    setConvertedAmount(parseFloat((parseFloat(amount) * rate).toFixed(2)));
  }

  async function getNewRate(from: string, to: string) {
    setIsConverting(true);

    try {
      const newRate = await convertCurrency(from, to);
      setRate(newRate);
    } catch (error) {
      console.error("Error converting currency:", error);
      setError("Error converting currency, try again more later")
    } finally {
      setIsConverting(false);
    }
  }

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const { validAmount, error } = validateAmount(value);

      if (error) {
        setError(error);
      } else {
        setError(null);
      }

      setAmount(validAmount); 
    },
    [setError]
  );

  const handleFromCurrencyChange = useCallback((value: string) => {
    setFromCurrency(value);
  }, []);

  const handleToCurrencyChange = useCallback((value: string) => {
    setToCurrency(value);
  }, []);

  const handleSwapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  return {
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
  };
}
