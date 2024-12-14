export function convert(from: CurrencyKey, to: CurrencyKey, ratesData: RateDefinitions) {
	return ratesData[from][to].median;
}
