import { useCurrencyMapData } from "@/hooks/useCurrencyMap";
import { formatDistance } from "date-fns";
import { DatabaseBackup } from "lucide-react";
import { useEffect, useState } from "react";

function getUpdateText(createdAt: string) {
	return formatDistance(new Date(createdAt), new Date(), { addSuffix: true, includeSeconds: true });
}

export function UpdateTime() {
	const currencyMap = useCurrencyMapData()![0];
	const [lastUpdated, setLastUpdated] = useState(getUpdateText(currencyMap.meta.createdAt));

	useEffect(() => {
		const interval = setInterval(() => {
			setLastUpdated(getUpdateText(currencyMap.meta.createdAt));
		}, 30_000);

		return () => clearInterval(interval);
	}, [currencyMap.meta.createdAt]);

	return (
		<div className='flex flex-col gap-1'>
			<p className='flex items-center gap-1 italic text-xs'>
				<DatabaseBackup className='w-4 h-4' /> Last updated {lastUpdated}
			</p>
			<p className='text-primary-dark text-sm'>
				*Data is collected from{" "}
				<a href='https://www.pathofexile.com/trade2/search/poe2/Standard' target='_blank' className='underline'>
					PoE 2 Trade
				</a>
			</p>
		</div>
	);
}
