export const faqItems = [
	{
		question: "What is Exalt Rates?",
		answer:
			"Exalt Rates is simply an exchange rate calculator. The main goal of this website is to be able to provide reliable exchange rates for currency listings posted on Path of Exile 2 trade page."
	},
	{
		question: "How is data collected?",
		answer:
			"Unfortunately, Grinding Gear Games currently does not provide API registrations for PoE 2, so it is a manual process. The data is collected from the official Path of Exile 2 trade and exchange page. For each currency that is available on Exalt Rates, the trade results listed for that curency are checked on PoE 2 trade page, collected, then collectively processed through some functions to calculate mean/median rates. The trade listings are recorded more than a couple of times throughout the day to improve overall accuracy. Though, you can still occasionally see results like 1x Divine Orb = 1x Orb of Augmentation, with a high confidence score. It is sadly the nature of this type of data collecting, and it is currently the best I can personally do."
	},
	{
		question: "Why should I use this instead of in-game Currency Exchange?",
		answer:
			"Honestly, you shouldn't. The in-game Currency Exchange will always be the most reliable and accurate place to check for the latest exchange rates. At the time I started building this website, I did not even progress far enough to know there was a Currency Exchange vendor, so I wanted to build something myself to be able to have an idea for the latest exchange rates."
	},
	{
		question: "Why should I use this at all?",
		answer:
			"Since the data provided here is based on PoE 2 trade listings, it still provides information that is not readily available in the trade page itself. You can also check the exchange rates from your mobile device at any time, which is an added convenience."
	},
	{
		question: "How do you calculate the exchange rates between currencies?",
		answer:
			'The exchange rate calculation is a 3 step process that is repeated for each currency. Firstly, the collected data is checked for any outliers, like people intentionally listing 1x Armourer\'s Scrap for 9999999x Exalted Orb. Secondly, the "mean" and the "median" values for exchange rates are calculated. Then, a "confidence score" is calculated for both the mean and the median values. Between the mean and the median values, the one with the higher confidence score is prioritized as the calculation result. Finally, all these values come together to provide a conversion data between CurrencyA and CurrencyB.'
	},
	{
		question: "How accurate are the exchange rates?",
		answer:
			'The accuracy of the exchange rates completely depend on the amount of data that was available when the listings were recorded. At max, a total of 200 trade listings can be recorded between two currencies at any given time, since the PoE 2 trade page limits the total shown listings to 100. So, as mentioned in the "data collection" question, the trade listings are recorded multiple times throughout each day to improve accuracy.'
	},
	{
		question: "Why are some currencies missing from the results?",
		answer:
			"It is most likely because there was not enough data recorded for that particular exhange. So, with only a limited amount of data available, it is impossible to show exchange rates between every currency."
	},
	{
		question: "Do the rates account for regional differences (e.g., Standard vs. Hardcore)?",
		answer: "The current exchange rates only reflect Standard prices."
	},
	{
		question: "Does Exalt Rates handle trading or transactions?",
		answer:
			"Exalt Rates does not and will not handle trading or transactions. It only provides exchange rates for currency listings on the Path of Exile 2 trade page."
	},
	{
		question: "Why is currency X not listed here?",
		answer:
			'The list of currencies that are currently available were created to include both the "main" currencies people mostly use and some others, chosen at random. Thus, it has more than the currencies listed on the "Buyout" filter, but it also has significantly less selections from the in-game Currency Exchange. If and when an API access can be obtained, the options will also increase.'
	},
	{
		question: "How often are the exchange rates updated?",
		answer:
			"Since the process is not fully automated yet, it still requires a human to operate the collection, processing and updating steps. In short, the rates are updated as often as I can find the time to do it."
	}
];
