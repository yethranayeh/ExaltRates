import { useContext, useEffect, useState, type PropsWithChildren } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import { CurrencyMapContext } from "../context/CurrencyMapContext";
import { DatabaseContext } from "../context/DatabaseContext";
import { setCache } from "./storage";
import { Gears } from "@/components/Gears";
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/Alert";
import { AlertCircle, LoaderCircle, RefreshCw } from "lucide-react";
import { CenterChild } from "@/components/CenterChild";
import { Button } from "@/components/shadcn/Button";

export function CurrencyMapProvider(props: PropsWithChildren) {
	const db = useContext(DatabaseContext);
	const [currencyMap, setCurrencyMap] = useState<RateDefinitions | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoadingDelayed, setIsLoadingDelayed] = useState(false);

	useEffect(() => {
		const loadingDelayTimeout = setTimeout(() => {
			setIsLoadingDelayed(true);
		}, 3000);

		const fetchLatestDocument = async () => {
			try {
				const collectionRef = collection(db, "rates");
				const q = query(collectionRef, orderBy("meta.createdAt", "desc"), limit(1));
				const querySnapshot = await getDocs(q);

				if (!querySnapshot.empty) {
					querySnapshot.forEach((doc) => {
						const data = doc.data() as RateDefinitions;
						setCurrencyMap(data);
						setCache(data);
					});
				} else {
					setError("No exchange rate data found in the database.");
				}
			} catch (err) {
				setError("Could not fetch latest exchange rate data. Please try again after a few minutes.");
			} finally {
				clearTimeout(loadingDelayTimeout);
			}
		};

		fetchLatestDocument();

		return () => clearTimeout(loadingDelayTimeout);
	}, [db]);

	if (error) {
		return (
			<CenterChild>
				<Alert variant='destructive' className='w-full max-w-[450px]'>
					<AlertCircle className='h-4 w-4' />
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
						<LoaderCircle className='w-4 h-4 animate-spin' />
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

					<Button onClick={() => window.location.reload()}>
						<RefreshCw className='h-4 w-4' /> Reload Page
					</Button>
				</div>
			</CenterChild>
		);
	}

	if (!currencyMap) {
		return <Gears isLoading />;
	}

	return <CurrencyMapContext.Provider value={currencyMap}>{props.children}</CurrencyMapContext.Provider>;
}
