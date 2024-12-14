import { useMemo, useState } from "react";
import { InfoIcon } from "lucide-react";

import { useCurrencyMapData } from "../../hooks/useCurrencyMap";
import { convert } from "../../utils/convert";

import { Gears } from "../Gears";
import { CurrencySelection } from "./CurrencySelection";
import { CalculationResults } from "./CalculationResults";

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
			<div className='min-w-[300px] w-full max-w-[500px] flex flex-col gap-4'>
				<CurrencySelection value={value} setValue={setValue} selected={selected} setSelected={setSelected} />

				{selected && <CalculationResults results={convertedResults} />}

				{selected && convertedResults.length < currencies.length - 2 && (
					<div className='flex gap-1 items-center text-primary-dark opacity-50 text-sm italic'>
						<InfoIcon className='w-5 h-5' />
						<p>Currencies with no data are hidden</p>
					</div>
				)}
			</div>
		</div>
	);
}
