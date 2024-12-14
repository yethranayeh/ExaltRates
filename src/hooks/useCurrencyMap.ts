import { useContext, useEffect, useState } from "react";
import { query, orderBy, limit, getDocs, collection } from "firebase/firestore";

import { DatabaseContext } from "../context/DatabaseContext";
import { setCache } from "../utils/storage";

export function useCurrencyMapData() {
	const db = useContext(DatabaseContext);
	const [currencyMap, setCurrencyMap] = useState<RateDefinitions | null>(null);

	useEffect(() => {
		const fetchLatestDocument = async () => {
			const collectionRef = collection(db, "rates");

			const q = query(collectionRef, orderBy("meta.createdAt", "desc"), limit(1)); // Query to fetch the latest document

			const querySnapshot = await getDocs(q);

			// FIXME: do I have to loop a .limit(1) data?
			querySnapshot.forEach((doc) => {
				const data = doc.data() as RateDefinitions;
				setCurrencyMap(data);
				setCache(data);
			});
		};

		fetchLatestDocument()
			.then(() => {
				// TODO: on fetch success?
			})
			.catch((error) => {
				console.error("Error fetching latest document:", error);
			});
	}, []);

	return currencyMap;
}
