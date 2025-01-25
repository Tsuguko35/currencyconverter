export const convertCurrency = (ammount, exchangeRate, action) => {
	let result;
	if (action === 'to') {
		result = ammount / exchangeRate;
	} else if (action === 'from') {
		result = ammount * exchangeRate;
	}
	return Number(result.toPrecision(4)).toLocaleString();
};
