import numbro from 'numbro';

export const numberFormat = number => numbro(number).format({ thousandSeparated: true });