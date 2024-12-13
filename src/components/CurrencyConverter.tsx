import { useCallback, useContext, useEffect, useState } from "react";
import { DatabaseContext } from "../context/DatabaseContext";
import { query, orderBy, limit, getDocs, collection } from "firebase/firestore";
import { convert } from "../utils/convert";
import { Currency } from "./Currency";

import { CurrencyInputs } from "./CurrencyInputs";
import { currencies } from "../constant";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./shadcn/Accordion";

import { AmountDisplay } from "./AmountDisplay";
import { Toggle } from "./shadcn/Toggle";
import { Circle, CircleCheck } from "lucide-react";

export function CurrencyConverter() {
	const db = useContext(DatabaseContext);
	const [currencyMap, setCurrencyMap] = useState<RateDefinitions | null>(null);

	const [fromVal, setFromVal] = useState("");
	const [from, setFrom] = useState<CurrencyKey | "">("Exalted Orb");

	const [toVal, setToVal] = useState("");
	const [to, setTo] = useState<typeof from>("Chaos Orb");

	const [conversionRate, setConversionRate] = useState(0);

	const [convertibleCurrencies, setConvertibleCurrencies] = useState<Array<CurrencyKey>>([]);
	const [isErroredHidden, setIsErroredHidden] = useState(false);

	const getValueChangeHandler = useCallback(
		(left: typeof from, right: typeof from, leftSetter: typeof setFromVal, rightSetter: typeof setFromVal) =>
			(v: string) => {
				leftSetter(v);

				if (v && from && to && currencyMap) {
					const converted = convert(left as CurrencyKey, right as CurrencyKey, currencyMap);
					if (converted == null) {
						rightSetter("-1");
					} else {
						const ratioed = parseFloat(v) * converted;

						rightSetter(ratioed.toFixed(2));
					}
				} else {
					rightSetter("");
				}
			},
		[from, to, currencyMap]
	);

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
		if (from && currencyMap) {
			if (to) {
				const conversionRate = convert(from, to, currencyMap);
				setConversionRate(conversionRate ?? -1);
			}

			const validCurrencies: Array<CurrencyKey> = [];
			for (const currency of currencies.filter((c) => c !== from)) {
				const rate = convert(from, currency, currencyMap);
				if (rate != null) {
					validCurrencies.push(currency);
				}
			}
			setConvertibleCurrencies(validCurrencies);
		}
	}, [from, to, currencyMap]);

	if (currencyMap == null) {
		// TODO: Have to grind those gears while loading
		return <p>LOADING...</p>;
	}

	return (
		<div className='w-full flex justify-center px-3'>
			<div className='flex flex-col gap-5 container max-w-[500px]'>
				<div>
					{from && (
						<div className='flex flex-row select-none items-center text-primary-dark  text-sm mb-[-9px]'>
							<span>1×</span>
							<Currency name={from} />
							<span className='ml-1'>equals</span>
						</div>
					)}
					{to && (
						<div className={conversionRate === -1 ? "text-red-900" : undefined}>
							<AmountDisplay rate={conversionRate} currencyName={to} />
						</div>
					)}
					<p className='text-primary-dark font-[FontinItalic] text-sm mt-2'>
						Last updated: {new Date(currencyMap.meta.createdAt).toLocaleString()}
					</p>
				</div>
				<div className='flex flex-col gap-2'>
					<CurrencyInputs
						value={fromVal}
						setValue={getValueChangeHandler(from, to, setFromVal, setToVal)}
						currency={from}
						setCurrency={(c) => {
							if (to === c) {
								const nextAvailableCurrency = isErroredHidden
									? convertibleCurrencies.filter((v) => v !== c)[0]
									: currencies.filter((v) => v !== c)[0];
								setTo(nextAvailableCurrency);
							}
							setFrom(c);
						}}
						currencies={currencies}
					/>
					<CurrencyInputs
						disabled={conversionRate === -1}
						value={toVal}
						setValue={getValueChangeHandler(to, from, setToVal, setFromVal)}
						currency={to}
						setCurrency={(v) => {
							setTo(v);
							setToVal("");
						}}
						currencies={(isErroredHidden ? convertibleCurrencies : currencies).filter((c) => c !== from)}
					/>
				</div>
				<Toggle
					pressed={isErroredHidden}
					onPressedChange={(pressed) => {
						setIsErroredHidden(pressed);
						if (pressed) {
							if (!convertibleCurrencies.includes(to as CurrencyKey)) {
								setTo(convertibleCurrencies[0]);
							}
						}
					}}
					className='w-max'>
					{isErroredHidden ? <CircleCheck /> : <Circle />}
					Hide Currencies with No Data
				</Toggle>
				{from && (
					<Accordion type='single' collapsible>
						<AccordionItem value='all'>
							<AccordionTrigger>Other Currencies</AccordionTrigger>
							<AccordionContent>
								<span className='italic text-sm text-primary-dark opacity-75 mb-2 block'>
									Results are bound to {fromVal && `${fromVal}×`}
									{from}
								</span>
								{/* TODO: Refactor. hard to read */}
								{(isErroredHidden ? convertibleCurrencies : currencies)
									.filter((c) => c !== from && c !== to)
									.map((c) => {
										const converted = convert(from, c, currencyMap);

										return (
											<div key={c} className={converted == null ? "text-red-900 opacity-50" : undefined}>
												<AmountDisplay
													rate={fromVal ? (converted ? converted * parseFloat(fromVal) : -1) : 0}
													currencyName={c}
												/>
											</div>
										);
									})}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				)}
			</div>
		</div>
	);
}
