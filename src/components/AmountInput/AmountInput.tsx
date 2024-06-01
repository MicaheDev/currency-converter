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
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-xs">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 end-0 flex items-center pr-4 pointer-events-none font-bold text-indigo-500 sm:text-sm sm:leading-6">
          {loader ? <SpinLoader /> : renderSymbol()}
        </div>

        <input
          className="h-[40px] w-full bg-neutral-50 border border-neutral-300 rounded-md focus:outline-2 focus:outline-indigo-500 flex pr-12 p-4 sm:text-sm sm:leading-6"
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
