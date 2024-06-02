import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { RateSelectProps } from "./types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function RateSelect({
  value = "",
  handleChange,
  rates,
  label,
  id,
}: RateSelectProps) {
  const selectedCurrency = rates.find((rate) => rate.currency === value);
  const detail = selectedCurrency?.detail;

  function renderCurrencySelected() {
    if (!detail) {
      return <>Select</>;
    }
    return (
      <>
        {detail.code} - {detail.name}
      </>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <label htmlFor={id} className="text-xs">
        {label}
      </label>

      <Listbox value={value} onChange={handleChange}>
        {({ open }) => (
          <>
            <div className="relative">
              <ListboxButton
                id={id}
                className="relative h-[40px] w-full min-w-[250px] cursor-default rounded-md bg-neutral-200 py-1.5 pl-3 pr-10 text-left text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              >
                <span className="flex items-center">
                  <span className="ml-3 block truncate">
                    {renderCurrencySelected()}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <i className="ri-expand-up-down-line"></i>
                </span>
              </ListboxButton>

              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {rates.map(({ currency, detail }) => (
                    <ListboxOption
                      key={currency}
                      className={({ focus }) =>
                        classNames(
                          focus ? "bg-indigo-500 text-neutral-50" : "",
                          !focus ? "text-neutral-900" : "",
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                        )
                      }
                      value={currency}
                    >
                      {({ selected, focus }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate",
                              )}
                            >
                              {currency} - {detail.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                focus ? "text-neutral-50" : "text-indigo-500",
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                              )}
                            >
                              <i className="ri-check-line"></i>
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}

export default RateSelect;
