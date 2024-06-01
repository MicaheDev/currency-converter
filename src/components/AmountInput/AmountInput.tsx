"use client";

import Loader from "../Loader/Loader";
import { AmountInputProps } from "./types";

function AmountInput({
  value,
  handleChange,
  placeHolder,
  currency,
  isLoading,
}: AmountInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 end-0 flex items-center pr-4 pointer-events-none font-bold text-indigo-500 sm:text-sm sm:leading-6">
        <Loader loading={isLoading} sideText={currency} loadIcon={true} />
      </div>

      <input
        className="h-[40px] bg-neutral-50 border border-neutral-300 rounded-md focus:outline-2 focus:outline-indigo-500 block w-full pr-12 p-4 sm:text-sm sm:leading-6"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeHolder}
      />
    </div>
  );
}

export default AmountInput;
