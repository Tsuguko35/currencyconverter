export const fetchCurrencies = async () => {
	try {
		const response = await fetch(
			`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`
		);
		if (!response.ok) {
			throw new Error('Failed to fetch currencies');
		}
		const data = await response.json();

		return data;
	} catch (error) {
		return { error: error.message };
	}
};
