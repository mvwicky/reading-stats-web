import { isDate, parse } from "date-fns";

export function dateGuard(input: unknown): input is Date {
  return isDate(input);
}

export function parseDate(dateStr: string): Date {
  return parse(dateStr, "yyyy-MM-dd", new Date());
}
