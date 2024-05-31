export function validateAmount(value: string): string {
  if (value === "" || isNaN(parseFloat(value)) || parseFloat(value) < 0) return "";
  return validateInput(value)
}

export const validateInput = (value: string): string => {
  // Expresión regular para permitir solo números y un punto decimal
  const regex = /^[0-9]*\.?[0-9]*$/;
  return regex.test(value) ? value : value.replace(/[^0-9.]/g, "");
};