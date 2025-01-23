export const fetchCurrencies = async () => {
	try {
		const response = await fetch(
			// `https://v6.exchangerate-api.com/v6/${import.meta.VITE_API_KEY}/latest/USD`
			// 'https://restcountries.com/v3.1/all'
			`https://openexchangerates.org/api/currencies.json`
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
