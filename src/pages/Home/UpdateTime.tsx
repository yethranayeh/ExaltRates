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
		<p className='flex items-center gap-1 text-selected-dark italic text-xs'>
			<DatabaseBackup className='w-4 h-4' /> Last updated {lastUpdated}
		</p>
	);
}
