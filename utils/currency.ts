export const currency = {
  format: (
    amount: number,
    currency: string = "USD",
    locale: string = "en-US",
  ): string => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(amount);
  },

  convertCurrency: (
    amount: number,
    fromCurrency: string,
    toCurrency: string,
    exchangeRates: { [key: string]: number },
  ): number => {
    const baseAmount = amount / exchangeRates[fromCurrency];
    return baseAmount * exchangeRates[toCurrency];
  },

  roundToDecimal: (amount: number, decimals: number = 2): number => {
    return Number(
      Math.round(Number(amount + "e" + decimals)) + "e-" + decimals,
    );
  },
};
