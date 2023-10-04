class CurrencyConverter {
  private static instance: CurrencyConverter;
  private exchangeRate: number;

  private constructor() {
    // Khởi tạo giá trị tỷ giá mặc định
    this.exchangeRate = 23000;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CurrencyConverter();
    }
    return this.instance;
  }

  setExchangeRate(rate: number) {
    this.exchangeRate = rate;
  }

  convertToUSD(amount: number) {
    return amount / this.exchangeRate;
  }

  convertToVND(amount: number) {
    return amount * this.exchangeRate;
  }

  convertNumberToCurrency(currencyFormat: string, value: number): string {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currencyFormat,
    });

    return formatter.format(
      currencyFormat === "USD" ? this.convertToUSD(value) : value
    );
  }

  convertCurrencyToNumber(currencyFormat: string, value: string): number {
    const currencySymbol = currencyFormat === "VND" ? "₫" : "$";
    const numberValue = value.replace(currencySymbol, "").replace(/,/g, "");

    return parseFloat(numberValue);
  }
}

export default CurrencyConverter;
