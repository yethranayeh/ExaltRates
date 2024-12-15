import { useContext, useMemo, useState } from "react";
import { DatabaseBackup } from "lucide-react";
import clsx from "clsx";

import { convert } from "../../utils/convert";
import { CurrencyMapContext } from "../../context/CurrencyMapContext";
import { StorageContext } from "../../context/StorageContext";

import { Gears } from "../Gears";
import { CurrencySelection } from "./CurrencySelection";
import { CalculationResults } from "./CalculationResults";
import { CurrencyInput } from "./CurrencyInput";
import { HiddenDataInfo } from "./HiddenDataInfo";

import { currencies } from "../../constant";

export function CalculationView() {
	const { preferences } = useContext(StorageContext);
	const [selected, setSelected] = useState<CurrencyKey | "">(preferences.starred ?? "");
	const [value, setValue] = useState(preferences.starred ? "1" : "");
	const currencyMap = useContext(CurrencyMapContext);

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
		return (
			<div className='flex-1'>
				<Gears />
			</div>
		);
	}

	return (
		<div className='w-full flex flex-1 overflow-x-hidden justify-center px-4'>
			<div className={clsx("flex flex-col gap-4", "lg:gap-6 lg:flex-row")}>
				<CurrencySelection selected={selected} setSelected={setSelected} />

				<div className='flex flex-col gap-4 min-w-[390px]'>
					{selected ? (
						<CurrencyInput value={value} setValue={setValue} selected={selected} />
					) : (
						<p>Please select a currency</p>
					)}

					<div className='min-h-[230px] flex flex-col justify-between gap-2'>
						{selected && <CalculationResults primary={selected} results={convertedResults} />}

						{selected && convertedResults.length < currencies.length - 2 && <HiddenDataInfo />}
						<p className='flex items-center gap-1 text-primary-darker italic text-xs'>
							<DatabaseBackup className='w-4 h-4' /> Last Updated:{" "}
							{new Date(currencyMap.meta.createdAt).toLocaleString()}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
