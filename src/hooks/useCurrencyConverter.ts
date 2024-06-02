import { useState, useEffect, useCallback } from "react";
import { convertCurrency } from "@/services";
import { calculateAmount, validateAmount } from "@/utilities";
import { useExchangeRates } from "@/hooks";
import { CurrencyDetail } from "@/models";

export function useCurrencyConverter() {
  const { rates, loading, error, setError } = useExchangeRates();

  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [fromCurrencyDetails, setFromCurrencyDetails] =
    useState<CurrencyDetail | null>(null);
  const [toCurrencyDetails, setToCurrencyDetails] =
    useState<CurrencyDetail | null>(null);

  useEffect(() => {
    if (rates.length > 0 && fromCurrency && toCurrency) {
      updateExchangeRate(fromCurrency, toCurrency);
      const updateCurrencyDetails = () => {
        const fromDetail = rates.find(
          (rate) => rate.currency === fromCurrency,
        )?.detail;
        if (fromDetail) {
          setFromCurrencyDetails(fromDetail);
        }

        const toDetail = rates.find(
          (rate) => rate.currency === toCurrency,
        )?.detail;
        if (toDetail) {
          setToCurrencyDetails(toDetail);
        }
      };

      updateCurrencyDetails();
    }
  }, [rates, fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate && !isNaN(parseFloat(amount))) {
      const calculatedAmount = calculateAmount(amount, exchangeRate);
      setConvertedAmount(calculatedAmount);
    }
  }, [exchangeRate, amount]);

  const updateExchangeRate = async (from: string, to: string) => {
    setIsConverting(true);

    try {
      const newRate = await convertCurrency(from, to);
      setExchangeRate(newRate);
    } catch (error) {
      console.error("Error converting currency:", error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const { validAmount, error } = validateAmount(value);

      if (error) {
        setError(error);
      } else {
        setError(null);
      }

      setAmount(validAmount); // Update state regardless of validation result
    },
    [setError],
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
    isConverting,
    handleAmountChange,
    handleFromCurrencyChange,
    handleToCurrencyChange,
    handleSwapCurrencies,
    convertedAmount,
    fromCurrencyDetails,
    toCurrencyDetails,
  };
}
