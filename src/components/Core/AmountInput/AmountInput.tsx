import { SpinLoader } from "@/components";
import { AmountInputProps } from "./types";

function AmountInput({
  value,
  handleChange,
  placeHolder,
  currency,
  loader,
  rates,
  label,
  id,
}: AmountInputProps) {
  const selectedCurrency = rates.find((rate) => rate.currency === currency);
  const detail = selectedCurrency?.detail;

  function renderSymbol(): string {
    if (!detail) return "$";
    return detail.symbol_native;
  }

  return (
    <div className="flex w-full flex-col">
      <label htmlFor={id} className="text-xs">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pr-4 font-bold text-indigo-500 sm:text-sm sm:leading-6">
          {loader ? <SpinLoader /> : renderSymbol()}
        </div>

        <input
          className="flex h-[40px] w-full rounded-md border border-neutral-300 bg-neutral-50 p-4 pr-12 focus:outline-2 focus:outline-indigo-500 sm:text-sm sm:leading-6"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeHolder}
          id={id}
        />
      </div>
    </div>
  );
}

export default AmountInput;
