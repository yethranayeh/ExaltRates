import { ExchangeChartView } from "./ExchangeChartView";
import { CurrencyMapProvider } from "@/utils/CurrencyMapProvider";

export function ExchangeRateCharts() {
	return (
		<div className='flex flex-col w-screen'>
			<CurrencyMapProvider mode='monthly'>
				<ExchangeChartView />
			</CurrencyMapProvider>
		</div>
	);
}
