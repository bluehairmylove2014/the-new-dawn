function convertNumberToCurrency(
  currencyFormat: string,
  value: number
): string {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: currencyFormat === "VND" ? "VND" : "USD",
  });

  return formatter.format(value);
}

function convertCurrencyToNumber(
  currencyFormat: string,
  value: string
): number {
  const currencySymbol = currencyFormat === "VND" ? "₫" : "$";
  const numberValue = value.replace(currencySymbol, "").replace(/,/g, "");

  return parseFloat(numberValue);
}

export { convertNumberToCurrency, convertCurrencyToNumber };
