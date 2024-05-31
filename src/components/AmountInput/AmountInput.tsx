"use client";
interface AmountInputProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  currency: string;
}

function AmountInput({
  value,
  handleChange,
  placeHolder,
  currency,
}: AmountInputProps) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm font-medium text-neutral-800"
      >
        Importe
      </label>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 end-0 flex items-center pr-4 pointer-events-none font-bold text-indigo-500">
          {currency}
        </div>

        <input
          className="bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-2 focus:outline-indigo-500 block w-full pr-12 p-4"
          type="text"
          value={value}
          id=""
          onChange={handleChange}
          placeholder={placeHolder}
        />
      </div>
    </div>
  );
}

export default AmountInput;
