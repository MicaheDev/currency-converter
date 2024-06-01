import { ExchangeRate } from "@/models";

export interface RatesSelectProps {
  value: string;
  handleChange: (value: string) => void;
  rates: ExchangeRate[];
}
