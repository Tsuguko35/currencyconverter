import { currencyFlags } from './currencyFlags';

export const getCountryCode = (currencyCode) => {
	const country = currencyFlags.find((currency) => currency.code === currencyCode.toUpperCase());
	return country ? country.countryCode.toLowerCase() : null;
};
