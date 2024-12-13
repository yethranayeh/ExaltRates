import { useContext, useEffect, useState } from "react";
import { DatabaseContext } from "../context/DatabaseContext";
import { query, orderBy, limit, getDocs, collection } from "firebase/firestore";
import { convert } from "../utils/convert";
import { Currency } from "./Currency";

import { CurrencyInputs } from "./CurrencyInputs";
import { currencies } from "../constant";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./shadcn/Accordion";

export function CurrencyConverter() {
	const db = useContext(DatabaseContext);
	const [currencyMap, setCurrencyMap] = useState<RateDefinitions | null>(null);

	const [fromVal, setFromVal] = useState("");
	const [from, setFrom] = useState<CurrencyKey>("Exalted Orb");
	const [toVal, setToVal] = useState("");
	const [to, setTo] = useState<CurrencyKey>("Mirror of Kalandra");
	const [conversionRate, setConversionRate] = useState(0);

	useEffect(() => {
		const fetchLatestDocument = async () => {
			const collectionRef = collection(db, "rates");

			const q = query(collectionRef, orderBy("meta.createdAt", "desc"), limit(1)); // Query to fetch the latest document

			const querySnapshot = await getDocs(q);

			// FIXME: do I have to loop a .limit(1) data?
			querySnapshot.forEach((doc) => setCurrencyMap(doc.data() as RateDefinitions));
		};

		fetchLatestDocument()
			.then(() => {
				// TODO: on fetch success?
			})
			.catch((error) => console.error("Error fetching latest document:", error));
	}, []);

	useEffect(() => {
		if (from && to && currencyMap) {
			const conversionRate = convert(from, to, currencyMap);
			setConversionRate(conversionRate);
		}
	}, [from, to, currencyMap]);

	if (currencyMap == null) {
		// TODO: Have to grind those gears while loading
		return <p>LOADING...</p>;
	}

	return (
		<div className='w-full flex justify-center '>
			<div className='flex flex-col gap-5 container max-w-[500px]'>
				<div>
					{from && (
						<div className='flex flex-row select-none items-center opacity-50 text-sm'>
							<span>1×</span>
							<Currency name={from} />
							<span className='ml-1'>equals</span>
						</div>
					)}
					{to && (
						<div className='flex flex-row select-none items-center text-lg'>
							<span>{conversionRate.toFixed(2)}×</span> <Currency name={to} />
						</div>
					)}
					<p className='opacity-75 text-sm mt-2'>
						Last update: {new Date(currencyMap.meta.createdAt).toLocaleString()}
					</p>
				</div>
				<div className='flex flex-col gap-2'>
					<CurrencyInputs
						value={fromVal}
						setValue={(v) => {
							setFromVal(v);

							if (v) {
								const converted = parseFloat(v) * convert(from, to, currencyMap);

								setToVal(converted.toFixed(2));
							} else {
								setToVal("");
							}
						}}
						currency={from}
						setCurrency={setFrom}
						currencies={currencies}
					/>
					<CurrencyInputs
						value={toVal}
						setValue={(v) => {
							setToVal(v);

							if (v) {
								const converted = parseFloat(v) * convert(to, from, currencyMap);
								setFromVal(converted.toFixed(2));
							} else {
								setFromVal("");
							}
						}}
						currency={to}
						setCurrency={setTo}
						currencies={currencies.filter((c) => c !== from)}
					/>
				</div>
				<Accordion type='single' collapsible>
					<AccordionItem value='all'>
						<AccordionTrigger>Show All Currencies</AccordionTrigger>
						<AccordionContent>
							{currencies
								.filter((c) => c !== from && c !== to)
								.map((c) => (
									<div key={c} className='flex flex-row select-none items-center text-lg'>
										<span>{fromVal ? (convert(from, c, currencyMap) * parseFloat(fromVal)).toFixed(2) : 0}×</span>{" "}
										<Currency name={c} />
									</div>
								))}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
