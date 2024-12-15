interface IStorage {
	cache: ReturnType<typeof getCache>;
	setCache: (data: RateDefinitions) => void;
	preferences: Preference;
	setPreferences: (pref: Partial<Preference> | ((pref: Preference) => Partial<Preference>)) => void;
}
