let currencySymbol = "CAD";

export const setCurrencySymbol = (newSymbol: string) => {
  currencySymbol = newSymbol;
};

export const getCurrencySymbol = () => {
  return currencySymbol;
};
