import { ApiResponse, ExchangeRate } from "@/models";

export const exchangeAdapter = ({ data }: ApiResponse): ExchangeRate[] => {
  return Object.entries(data).map(([currency, detail]) => ({
    currency,
    detail,
  }));
};
