import { ExchangeRate } from "@/models";

export interface CurrencyInputFormProps {
    amount: string;
    handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fromCurrency: string;
    handleFromCurrencyChange: (value: string) => void;
    handleSwapCurrencies: () => void;
    toCurrency: string;
    handleToCurrencyChange: (value: string) => void;
    rates: ExchangeRate[];
    loader: boolean;
  }