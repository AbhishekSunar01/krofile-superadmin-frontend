export const YAxisNumberTickFormatter = <T extends number>(
  value: T
): string => {
  return value > 1000 ? value / 1000 + "k" : value.toString();
};
