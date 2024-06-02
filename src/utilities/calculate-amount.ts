export function calculateAmount(amount: string, rate: number) {
  return parseFloat((parseFloat(amount) * rate).toFixed(2));
}
