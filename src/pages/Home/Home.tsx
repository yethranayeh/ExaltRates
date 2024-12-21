import { CurrencyMapProvider } from "@/utils/CurrencyMapProvider";
import { StorageProvider } from "@/utils/StorageProvider";
import { CalculationView } from "./CalculationView";

export const Home = () => (
	<CurrencyMapProvider>
		<StorageProvider>
			<CalculationView />
		</StorageProvider>
	</CurrencyMapProvider>
);
