export interface AmountInputProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  currency: string;
  isLoading: boolean
}
