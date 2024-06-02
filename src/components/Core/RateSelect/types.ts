import { CurrencyDetail, ExchangeRate } from "@/models";

export interface RateSelectProps {
  value: string;
  handleChange: (value: string) => void;
  rates: ExchangeRate[];
  label: string
  id: string
  details: CurrencyDetail | null
}
