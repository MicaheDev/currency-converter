export interface CurrencyDetail {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
  type: string;
}

export interface ExchangeRate {
  currency: string;
  detail: CurrencyDetail;
}

export interface ApiResponse {
  data: Record<string, CurrencyDetail>;
}
