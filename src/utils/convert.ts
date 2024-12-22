// TODO: refactor to reduce complexity
export function convert(from: CurrencyKey, to: CurrencyKey, ratesData: RateDefinitions) {
	const { mean, median, confidence } = ratesData[from][to];
	const result: { rate: number | null; confidence: number | null } = { rate: null, confidence: null };

	if (!confidence) {
		result.rate = mean;
		result.confidence = null;

		return result;
	}

	if (confidence.mean != null && confidence.median != null) {
		if (confidence.mean > confidence.median) {
			result.rate = mean;
			result.confidence = confidence.mean;
		} else {
			result.rate = median;
			result.confidence = confidence.median;
		}
	} else if (confidence.mean != null) {
		result.rate = mean;
		result.confidence = confidence.mean;
	} else if (confidence.median != null) {
		result.rate = median;
		result.confidence = confidence.median;
	}

	return result;
}
