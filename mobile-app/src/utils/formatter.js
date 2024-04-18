import { COLORS } from "./theme";
export const moneyFormat = number => {
  const formatt = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  return formatt.format(number);
};
export const numberFormat = number => {
  const formatt = new Intl.NumberFormat('en-IN', {
    maximumSignificantDigits: 3,
  });
  return formatt.format(number);
};
export function getColor(status) {
  switch (status) {
    case 'In-Transit':
      return COLORS.COLOR_BLUE
    case 'Delivered':
      return COLORS.COLOR_GREEN
    default:
      return COLORS.COLOR_BLACK
  }
}