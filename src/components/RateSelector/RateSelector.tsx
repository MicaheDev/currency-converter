import { ExchangeRate } from "@/models";

interface RatesSelectorProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  rates: ExchangeRate[];
  label: string;
}

function RateSelector({
  value,
  handleChange,
  rates,
  label,
}: RatesSelectorProps) {
  return (
    <div className="flex flex-col max-w-sm mx-auto">
      <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        className="h-[60px] bg-neutral-200 border border-gray-300 text-neutral-800 rounded-lg focus:outline-indigo-500 block w-full p-2.5 "
        value={value}
        onChange={handleChange}
      >
        {rates.length > 0 ? (
          rates.map(({ currency, detail }) => (
            <option key={currency} value={currency}>
              {currency} - {detail.name}
            </option>
          ))
        ) : (
          <option selected value="">
            Seleccionar
          </option>
        )}
      </select>
    </div>
  );
}

export default RateSelector;
