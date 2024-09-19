export const XAxisTickFormatter = <
  S extends string | number | Date,
  T extends { length: number }
>(
  value: S,
  index: number,
  chartData: T
): string => {
  // Display only the first and last date on the X-axis
  if (index === 0) {
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  if (index === chartData.length - 1) {
    console.log(
      "index",
      chartData,
      index,
      "chartdatalength",
      chartData.length - 1
    );
    return "Today";
  }
  return ""; // Hide other tick values
};
