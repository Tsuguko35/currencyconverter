export const getExchangeRate = (currencyRate, code) => {
	const entry = Object.entries(currencyRate).find(
		([key]) => key.toLowerCase() === code.toLowerCase()
	);

	return entry ? entry[1] : null;
};
