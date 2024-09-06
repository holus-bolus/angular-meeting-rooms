const START_VALUE = 0;

export function getStartOfDay(date: Date): number {
  return date.setHours(START_VALUE, START_VALUE, START_VALUE, START_VALUE);
}
