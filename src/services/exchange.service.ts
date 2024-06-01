import { api } from "@/interceptors";
import { exchangeAdapter } from "@/adapters";
import { ExchangeRate } from "@/models";
import { API_KEY } from "@/constants";

export async function fetchExchangeRates(
  base: string = "USD"
): Promise<ExchangeRate[]> {
  try {
    const response = await api.get(
      `currencies?apikey=${API_KEY}&base_currency=${base}`
    );

    return exchangeAdapter(response.data);
  } catch (error) {
    throw new Error("An error occurred while fetching available currencies");
  }
}

export async function convertCurrency(
  from: string,
  to: string
): Promise<number> {
  try {
    const response = await api.get(
      `latest?apikey=${API_KEY}&base_currency=${from}&currencies=${to}`
    );
    console.log(response.data.data)
    return response.data.data[to];
  } catch (error) {
    throw new Error("An error occurred while fetching conversions");
  }
}
