import { ExchangeRate } from "@/models";

interface RatesSelectorProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  rates: ExchangeRate[];
}

function RateSelector({ value, handleChange, rates }: RatesSelectorProps) {
  return (
    <select value={value} onChange={handleChange}>
      {rates.map(({currency, detail}) => (
        <option key={currency} value={currency}>
          {currency} - {detail.name}
        </option>
      ))}
    </select>
  );
}

export default RateSelector;
