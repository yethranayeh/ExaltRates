const cacheKey = "currencyMapCache";
const preferencesKey = "preferences";
const initialPreferences: Preference = {
	pinned: null,
	starred: null,
	hide: { colorInfo: false }
};

export function getCache() {
	const cacheData = localStorage.getItem(cacheKey);

	if (!cacheData) {
		return null;
	}

	return JSON.parse(cacheData) as RateDefinitions;
}

export function setCache(data: RateDefinitions) {
	localStorage.setItem(cacheKey, JSON.stringify(data));
}

export function setPreferences(data: Preference) {
	localStorage.setItem(preferencesKey, JSON.stringify(data));
}
export function getPreferences() {
	return JSON.parse(localStorage.getItem(preferencesKey)!) as Preference;
}

if (!localStorage.getItem(preferencesKey)) {
	setPreferences(initialPreferences);
} else {
	// Even if preferences exist, new additions to here will have to be considered. So, it is better to always write inital values on load, then overwrite with existing values.
	const pref = getPreferences();

	setPreferences({ ...initialPreferences, ...pref });
}
