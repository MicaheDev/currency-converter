export function validateAmount(value: string) {
  const { validAmount, error } = validateInput(value);
  if (value === "" || isNaN(parseFloat(value)) || parseFloat(value) < 0) {
    return { validAmount: "", error: "Invalid amount" };
  }
  return { validAmount, error };
}

export const validateInput = (value: string) => {
  const regex = /^[0-9]*\.?[0-9]*$/;
  if (regex.test(value)) {
    return { validAmount: value, error: null };
  } else {
    return { validAmount: value.replace(/[^0-9.]/g, ""), error: "Invalid characters removed" };
  }
};