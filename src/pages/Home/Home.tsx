import { CurrencyMapProvider } from "@/utils/CurrencyMapProvider";
import { StorageProvider } from "@/utils/StorageProvider";
import { CalculationView } from "./CalculationView";

export const Home = () => (
	<CurrencyMapProvider mode='latest'>
		<StorageProvider>
			<CalculationView />
		</StorageProvider>
	</CurrencyMapProvider>
);
