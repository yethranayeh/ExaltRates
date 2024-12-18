import { useState } from "react";
import clsx from "clsx";

import { useStorage } from "../../hooks/useStorage";
import { useCurrencyMapData } from "../../hooks/useCurrencyMap";

import { Gears } from "../Gears";
import { CurrencySelection } from "./CurrencySelection";
import { CalculationResults } from "./CalculationResults";
import { CurrencyInput } from "./CurrencyInput";
import ErrorBoundary from "../ErrorBoundary";

export function CalculationView() {
	const { preferences } = useStorage();
	const [selected, setSelected] = useState<CurrencyKey | "">(preferences.starred ?? "");
	const [value, setValue] = useState("1");
	const currencyMap = useCurrencyMapData();

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

					<ErrorBoundary>{selected && <CalculationResults selected={selected} value={value} />}</ErrorBoundary>
				</div>
			</div>
		</div>
	);
}
