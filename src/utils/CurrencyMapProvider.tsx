import { useContext, useEffect, useState, type PropsWithChildren } from "react";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { sub } from "date-fns";

import { useStorage } from "@/hooks/useStorage";

import { CenterChild } from "@/components/CenterChild";
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/Alert";
import { Button } from "@/components/shadcn/Button";
import { Gears } from "@/components/Gears";

import { DatabaseContext } from "@/context/DatabaseContext";
import { CurrencyMapContext } from "@/context/CurrencyMapContext";
import { gameVersion } from "@/config";

interface CurrencyMapProviderProps extends PropsWithChildren {
	mode: "latest" | "monthly";
}

export function CurrencyMapProvider({ mode, children }: CurrencyMapProviderProps) {
	const db = useContext(DatabaseContext);
	const [currencyMap, setCurrencyMap] = useState<RateDefinitions[] | null>(null);
	const storage = useStorage();

	const [error, setError] = useState<string | null>(null);
	const [isLoadingDelayed, setIsLoadingDelayed] = useState(false);

	useEffect(() => {
		const loadingDelayTimeout = setTimeout(() => {
			setIsLoadingDelayed(true);
		}, 3000);

		const fetchCurrencyData = async () => {
			try {
				if (mode === "latest") {
					const collectionRef = collection(db, gameVersion);
					const q = query(collectionRef, orderBy("meta.createdAt", "desc"), limit(1));
					const querySnapshot = await getDocs(q);

					if (!querySnapshot.empty) {
						querySnapshot.forEach((doc) => {
							const data = doc.data() as RateDefinitions;
							setCurrencyMap([data]);
						});
					} else {
						setError("No exchange rate data found in the database.");
					}
				} else if (mode === "monthly") {
					const thirtyDaysAgo = sub(new Date(), { days: 30 });

					const collectionRef = collection(db, "rates");

					const q = query(
						collectionRef,
						where("meta.createdAt", ">=", thirtyDaysAgo.toISOString()),
						orderBy("meta.createdAt", "asc")
					);
					const querySnapshot = await getDocs(q);

					if (!querySnapshot.empty) {
						const dailyLatest: { [key: string]: RateDefinitions } = {};

						querySnapshot.forEach((doc) => {
							const data = doc.data() as RateDefinitions;
							const dateKey = new Date(data.meta.createdAt).toISOString().split("T")[0];

							if (!dailyLatest[dateKey]) {
								dailyLatest[dateKey] = data;
							}
						});

						setCurrencyMap(Object.values(dailyLatest));
					} else {
						setError("No exchange rate data found for the last 30 days.");
					}
				} else {
					throw new Error("Invalid mode provided.");
				}
			} catch (err) {
				setError("Could not fetch exchange rate data. Please try again later.");
			} finally {
				clearTimeout(loadingDelayTimeout);
			}
		};

		fetchCurrencyData();

		return () => clearTimeout(loadingDelayTimeout);
	}, [db, mode]);

	useEffect(() => {
		if (currencyMap?.length) {
			const latest = currencyMap.slice(-1)[0];

			if (storage.cache?.meta.createdAt !== latest.meta.createdAt) {
				storage.setCache(latest);
			}
		}
	}, [currencyMap, storage.cache]);

	if (error) {
		return (
			<CenterChild>
				<Alert variant='destructive' className='w-full max-w-[450px]'>
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			</CenterChild>
		);
	}

	if (isLoadingDelayed && !currencyMap) {
		return (
			<CenterChild>
				<div className='flex flex-col gap-6 items-center'>
					<Alert variant='default' className='w-full max-w-[450px]'>
						<AlertTitle>Warning!</AlertTitle>
						<AlertDescription>
							<p>
								The data is still trying to load, but it is taking longer than expected.{" "}
								<span className='font-semibold'>It may keep loading indefinitely.</span>
							</p>
							<p>
								If the app does not launch within a few seconds, you can{" "}
								<span className='underline'>reload the page</span> or try again later.
							</p>
						</AlertDescription>
					</Alert>

					<Button onClick={() => window.location.reload()}>Reload Page</Button>
				</div>
			</CenterChild>
		);
	}

	if (!currencyMap) {
		return <Gears isLoading />;
	}

	return <CurrencyMapContext.Provider value={currencyMap}>{children}</CurrencyMapContext.Provider>;
}
