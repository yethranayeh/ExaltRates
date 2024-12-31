import { useMemo } from "react";

import { convert } from "@/utils/convert";
import { useCurrencyMapData } from "@/hooks/useCurrencyMap";

import { AmountDisplay } from "@/components/AmountDisplay";
import { PinButton } from "./PinButton";
import { ConfidenceColor } from "./ConfidenceColor";
import { ColorInfo } from "./Informational/ColorInfo";
import { UpdateTime } from "./UpdateTime";

import { currencies } from "@/constant";
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/Alert";
import { AlertCircle } from "lucide-react";

type Props = {
	selected: CurrencyKey;
	value: string;
};

export const CalculationResults = ({ selected, value }: Props) => {
	const currencyMap = useCurrencyMapData()![0];

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

		return values;
	}, [selected, value, currencyMap]);

	return (
		<div className='flex flex-col gap-2'>
			{selected && (
				<div className='flex flex-col w-max self-start'>
					{results.conversions.length === 0 && (
						<Alert variant='destructive' className='max-w-[400px]'>
							<AlertCircle className='h-4 w-4' />
							<AlertTitle>No Data</AlertTitle>
							<AlertDescription>
								No exchange listing was recorded for "{selected}" at{" "}
								{new Date(currencyMap.meta.createdAt).toLocaleTimeString()}
							</AlertDescription>
						</Alert>
					)}
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
				</div>
			)}

			<div className='flex flex-col gap-2'>
				<ColorInfo />

				<UpdateTime />
			</div>
		</div>
	);
};
