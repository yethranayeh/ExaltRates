export function convert(from: CurrencyKey, to: CurrencyKey, ratesData: RateDefinitions) {
	if (ratesData[from]?.[to]) {
		const [num, denom] = ratesData[from][to].split(":");
		return parseFloat(num) / parseFloat(denom);
	}
	return -1;
}
