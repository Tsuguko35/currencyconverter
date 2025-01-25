export function handleAmmountFormat(action, value) {
	if (action === 'blur') {
		if (!value || isNaN(value)) return '';
		return parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: 4 });
	} else if (action === 'focus') {
		return value ? value.replace(/,/g, '') : '';
	}
}
