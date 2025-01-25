export const fetchExchangeRates = async (baseCurrency, date) => {
	console.log(date);

	try {
		const response = await fetch(
			`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${baseCurrency}.json`
		);

		const data = await response.json();

		return data;
	} catch (error) {
		return { error: error.message };
	}
};
