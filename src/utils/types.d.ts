type Preference = {
	pinned: null | { primary: CurrencyKey; secondary: CurrencyKey };
	starred: CurrencyKey | null;
	hide: { colorInfo: boolean };
};
