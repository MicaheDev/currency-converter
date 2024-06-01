import { useState, useEffect, useCallback } from "react";
import { convertCurrency } from "@/services";
import { validateAmount, debounce } from "@/utilities";
import { useExchangeRates } from "@/hooks";

export function useCurrencyConverter() {
  const { rates, loading, error } = useExchangeRates();

  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);

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

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const validatedValue = validateAmount(value);
      setAmount(validatedValue);
      debouncedConvertAmount(validatedValue, fromCurrency, toCurrency);
    },
    [fromCurrency, toCurrency]
  );

  const handleFromCurrencyChange = useCallback((value: string) => {
    setFromCurrency(value);
  }, []);

  const handleToCurrencyChange = useCallback((value: string) => {
    setToCurrency(value);
  }, []);

  const handleSwapCurrencies = useCallback(() => {
    setFromCurrency((prev) => toCurrency);
    setToCurrency((prev) => fromCurrency);
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    convertAmount(amount, fromCurrency, toCurrency);
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
