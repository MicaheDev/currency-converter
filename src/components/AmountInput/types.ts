import { ExchangeRate } from "@/models";

export interface AmountInputProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  currency: string;
  loader: boolean;
  rates: ExchangeRate[];
  label: string
}
