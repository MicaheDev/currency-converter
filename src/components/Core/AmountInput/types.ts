import { CurrencyDetail } from "@/models";

export interface AmountInputProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  loader: boolean;
  label: string
  id: string
  fromCurrencyDetails: CurrencyDetail | null
}
