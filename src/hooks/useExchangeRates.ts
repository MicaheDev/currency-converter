import { useState, useEffect } from "react";
import { fetchExchangeRates } from "@/services";
import { ExchangeRate } from "@/models";

export const useExchangeRates = () => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRates = async () => {
      try {
        const data = await fetchExchangeRates();
        setRates(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getRates();
  }, []);

  return { rates, loading, error };
};

