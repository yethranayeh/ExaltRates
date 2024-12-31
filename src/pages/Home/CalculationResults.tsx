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
		const values: ConversionResults = { conversions: [], highestConfidence: 0 };
		if (!selected || !currencyMap) {
			return values;
		}

		try {
			for (const currency of currencies.filter((c) => c !== selected && c !== "Mirror of Kalandra")) {
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

		if (!isLowConfVisible) {
			values.conversions = values.conversions.filter((c) => c.confidence > 50);
		}

		return values;
	}, [selected, value, isLowConfVisible, currencyMap]);

	return (
		<div className='flex flex-col gap-2'>
			{selected && (
				<div className='flex flex-col w-max self-start'>
					{results.conversions.length === 0 ? (
						<Alert variant='destructive' className='max-w-[400px]'>
							<AlertCircle className='h-4 w-4' />
							<AlertTitle>No Data</AlertTitle>
							<AlertDescription>
								No exchange listing was recorded for "{selected}" at{" "}
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

							{results.conversions.map((res) => (
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
