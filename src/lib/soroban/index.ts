export * from "./sorobanTypes";
export * from "./numberToSoroban";
export * from "./sorobanToNumber";

/** Sinh số ngẫu nhiên có đúng `digits` chữ số (không có 0 ở đầu). */
export function randomNumberWithDigits(digits: number): number {
  if (digits < 1 || digits > 11) throw new Error("Số chữ số phải từ 1 đến 11");
  if (digits === 1) return Math.floor(Math.random() * 10);
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function formatNumberGroups(value: number | string): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatDuration(ms: number): string {
  const total = Math.max(0, ms);
  const minutes = Math.floor(total / 60000);
  const seconds = Math.floor((total % 60000) / 1000);
  const hundredths = Math.floor((total % 1000) / 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(hundredths).padStart(2, "0")}`;
}
