import { CurrencyDetail } from "@/models";

export interface ResultProps {
  amount: string;
  fromCurrency: string;
  convertedAmount: number | null;
  toCurrency: string;
  fromCurrencyDetails: CurrencyDetail | null,
  toCurrencyDetails: CurrencyDetail | null,
}
