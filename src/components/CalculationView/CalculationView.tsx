import { useMemo, useState } from "react";
import { DatabaseBackup } from "lucide-react";
import clsx from "clsx";

import { convert } from "../../utils/convert";
import { useStorage } from "../../hooks/useStorage";
import { useCurrencyMapData } from "../../hooks/useCurrencyMap";

import { Gears } from "../Gears";
import { CurrencySelection } from "./CurrencySelection";
import { CalculationResults } from "./CalculationResults";
import { CurrencyInput } from "./CurrencyInput";
import { HiddenDataInfo } from "./HiddenDataInfo";
import ErrorBoundary from "../ErrorBoundary";

import { currencies } from "../../constant";

export function CalculationView() {
	const { preferences } = useStorage();
	const [selected, setSelected] = useState<CurrencyKey | "">(preferences.starred ?? "");
	const [value, setValue] = useState(preferences.starred ? "1" : "");
	const currencyMap = useCurrencyMapData();

	const results = useMemo(() => {
		const values: ConversionResults = { conversions: [], highestConfidence: 0 };
		if (!selected || !currencyMap) {
			return values;
		}

		try {
			for (const currency of currencies.filter((c) => c !== selected)) {
				const conversion = convert(selected, currency, currencyMap);

				if (conversion.rate == null) {
					continue;
				}

				if (conversion.confidence && conversion.confidence > values.highestConfidence) {
					values.highestConfidence = conversion.confidence;
				}

				values.conversions.push({
					currency,
					calculation: value ? parseFloat(value) * conversion.rate : 0,
					confidence: conversion.confidence ?? 0
				});
			}
		} catch (e) {
			console.error(e);
		}

		return values;
	}, [selected, value, currencyMap]);

	if (currencyMap == null) {
		return (
			<div className='flex-1'>
				<Gears />
			</div>
		);
	}

	return (
		<div className='w-full flex flex-1 overflow-x-hidden justify-center px-4'>
			<div className={clsx("flex flex-col h-min gap-4", "lg:gap-6 lg:flex-row")}>
				<CurrencySelection selected={selected} setSelected={setSelected} />

				<div className='flex flex-col h-full gap-4 md:min-w-[410px]'>
					{selected ? (
						<CurrencyInput value={value} setValue={setValue} selected={selected} />
					) : (
						<p>Please select a currency</p>
					)}

					<ErrorBoundary>
						<div className='flex flex-col gap-2'>
							{selected && <CalculationResults primary={selected} results={results} />}

							<div className='flex flex-col gap-2'>
								{selected && results.conversions.length < currencies.length - 2 && <HiddenDataInfo />}

								<p className='flex items-center gap-1 text-primary-darker italic text-xs'>
									<DatabaseBackup className='w-4 h-4' /> Last Updated:{" "}
									{new Date(currencyMap.meta.createdAt).toLocaleString()}
								</p>
							</div>
						</div>
					</ErrorBoundary>
				</div>
			</div>
		</div>
	);
}
