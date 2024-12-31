import { CurrencyMapProvider } from "@/utils/CurrencyMapProvider";
import { CalculationView } from "./CalculationView";

export const Home = () => (
	<CurrencyMapProvider mode='latest'>
		<CalculationView />
	</CurrencyMapProvider>
);
