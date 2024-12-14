import { useMemo, useState } from "react";
import { InfoIcon } from "lucide-react";

import { useCurrencyMapData } from "../../hooks/useCurrencyMap";
import { convert } from "../../utils/convert";

import { Gears } from "../Gears";
import { CurrencySelection } from "./CurrencySelection";
import { CalculationResults } from "./CalculationResults";
import { CurrencyInput } from "./CurrencyInput";

import { currencies } from "../../constant";

export function CalculationView() {
	const [selected, setSelected] = useState<CurrencyKey | "">("");
	const [value, setValue] = useState("");
	const currencyMap = useCurrencyMapData();

	const convertedResults = useMemo(() => {
		if (!selected || !currencyMap) {
			return [];
		}

		const conversions = [];
		for (const currency of currencies.filter((c) => c !== selected)) {
			const conversion = convert(selected, currency, currencyMap);

			if (conversion == null) {
				continue;
			}

			conversions.push({
				currency,
				calculation: value ? parseFloat(value) * conversion : 0
			});
		}

		return conversions;
	}, [selected, value, currencyMap]);

	if (currencyMap == null) {
		return <Gears />;
	}

	return (
		<div className='w-full flex justify-center px-4'>
			<div className='grid gap-4 p-4 lg:grid-cols-2 lg:auto-rows-min lg:gap-6'>
				<CurrencySelection selected={selected} setSelected={setSelected} />

				{selected ? (
					<CurrencyInput value={value} setValue={setValue} selected={selected} />
				) : (
					<p>Please select a currency</p>
				)}

				<div className='min-h-[300px]'>
					{selected && <CalculationResults results={convertedResults} />}

					{selected && convertedResults.length < currencies.length - 2 && (
						<div className='flex gap-1 items-center text-primary-dark opacity-50 text-sm italic'>
							<InfoIcon className='w-5 h-5' />
							<p>Currencies with no data are hidden</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
