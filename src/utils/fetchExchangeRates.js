export const fetchExchangeRates = async (baseCurrency, date) => {
	if (!date) return;

	try {
		const response = await fetch(
			`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${baseCurrency}.json`
		);

		let data;

		if (response.ok) {
			data = await response.json();
		} else {
			const responseLatest = await fetch(
				`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`
			);

			data = await responseLatest.json();
		}

		return data;
	} catch (error) {
		return { error: error.message };
	}
};
