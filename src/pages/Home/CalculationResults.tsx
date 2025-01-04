import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";

import { convert } from "@/utils/convert";
import { useCurrencyMapData } from "@/hooks/useCurrencyMap";

import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/Alert";
import { AmountDisplay } from "@/components/AmountDisplay";
import { Checkbox } from "@/components/shadcn/Checkbox";
import { PinButton } from "./PinButton";
import { ConfidenceColor } from "./ConfidenceColor";
import { ColorInfo } from "./Informational/ColorInfo";
import { UpdateTime } from "./UpdateTime";

import { currencies } from "@/constant";

type Props = {
	selected: CurrencyKey;
	value: string;
};

export const CalculationResults = ({ selected, value }: Props) => {
	const currencyMap = useCurrencyMapData()![0];
	const [isLowConfVisible, setIsLowConfVisible] = useState(false);

	const results = useMemo(() => {
		const values: ConversionResults = { all: [], highConfidence: [], highestConfidence: 0 };
		if (!selected || !currencyMap) {
			return values;
		}

		const filteredCurrencies = currencies.filter((c) => c !== selected && c !== "Mirror of Kalandra");

		try {
			for (const currency of filteredCurrencies) {
				const conversion = convert(selected, currency, currencyMap);

				if (conversion.rate == null) {
					continue;
				}

				if (conversion.confidence && conversion.confidence > values.highestConfidence) {
					values.highestConfidence = conversion.confidence;
				}

				const result = {
					currency,
					calculation: value ? parseFloat(value) * conversion.rate : 0,
					confidence: conversion.confidence ?? 0
				};
				values.all.push(result);

				if (result.confidence > 50) {
					values.highConfidence.push(result);
				}
			}
		} catch (e) {
			console.error(e);
		}

		return values;
	}, [selected, value, currencyMap]);

	return (
		<div className='flex flex-col gap-2'>
			{selected && (
				<div className='flex flex-col w-max self-start'>
					{results.all.length === 0 ? (
						<Alert variant='destructive' className='max-w-[400px]'>
							<AlertCircle className='h-4 w-4' />
							<AlertTitle>No Data</AlertTitle>
							<AlertDescription>
								No reliable data was collected for "{selected}" at{" "}
								{new Date(currencyMap.meta.createdAt).toLocaleTimeString()}
							</AlertDescription>
						</Alert>
					) : (
						<>
							<div className='flex items-center space-x-2 cursor-pointer mb-4'>
								<Checkbox
									id='show-low-confidence'
									checked={isLowConfVisible}
									onCheckedChange={(c) => setIsLowConfVisible(!!c)}
								/>
								<label htmlFor='show-low-confidence' className='text-sm font-medium leading-none cursor-pointer'>
									Show low confidence
								</label>
							</div>

							{/* TODO: refactor. maybe a separate component */}
							{isLowConfVisible === false && results["highConfidence"].length === 0 && (
								<Alert variant='destructive' className='max-w-[400px]'>
									<AlertCircle className='h-4 w-4' />
									<AlertTitle>No High Confidence</AlertTitle>
									<AlertDescription>
										Out of the <span className='font-[FontinBold]'>{results.all.length}</span> exchange results, none of
										them have higher than <span className='font-[FontinBold]'>50%</span> confidence rating. If you still
										want to view those exchange rates, you can check the{" "}
										<span className='underline'>Show low confidence</span> option above.
									</AlertDescription>
								</Alert>
							)}

							{results[isLowConfVisible ? "all" : "highConfidence"].map((res) => (
								<div key={res.currency} className='mt-[-4px] flex gap-2 w-full items-center relative'>
									<PinButton primary={selected} secondary={res.currency} />

									<div
										className='flex flex-row items-center gap-1'
										title={`Based on the collected data, confidence rating for this calculation is: ${res.confidence}%`}>
										<ConfidenceColor
											confidence={res.confidence}
											highestConfidence={results.highestConfidence}
											timeString={currencyMap.meta.createdAt}
										/>
										<AmountDisplay rate={res.calculation} currencyName={res.currency} />
									</div>
								</div>
							))}
						</>
					)}
				</div>
			)}

			<div className='flex flex-col gap-2'>
				<ColorInfo />

				<UpdateTime />
			</div>
		</div>
	);
};
