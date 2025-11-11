export enum currency {
  'USD' = 'USD',
  'UAH' = 'UAH',
}
export enum paymentMethod {
  'PayPal' = 'PayPal',
  'Stripe' = 'Stripe',
}

export const getCurrency = (curr: currency) => {
  switch (curr) {
    case 'USD':
      return '$';
    case 'UAH':
      return '₴';
    default:
      return '';
  }
};

export const getPaymentMethod = (pay: paymentMethod) => {
  switch (pay) {
    case paymentMethod.PayPal:
      return 'PayPal';
    case paymentMethod.Stripe:
      return 'Stripe';
    default:
      return '';
  }
};
