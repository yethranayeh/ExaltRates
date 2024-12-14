import "./index.css";
import "./assets/fonts/fontin/Fontin-Bold.ttf";
import "./assets/fonts/fontin/Fontin-Italic.ttf";
import "./assets/fonts/fontin/Fontin-Regular.ttf";
import "./assets/fonts/fontin/Fontin-SmallCaps.ttf";

import { AuthGuard } from "./utils/AuthGuard";
import { CurrencyMapProvider } from "./utils/CurrencyMapProvider";
import { StorageProvider } from "./utils/StorageProvider";

import { Header } from "./components/Header/Header";
import { CalculationView } from "./components/CalculationView";
import { Footer } from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
	return (
		<div className='flex flex-col gap-4 min-h-screen'>
			<AuthGuard>
				<CurrencyMapProvider>
					<StorageProvider>
						<ErrorBoundary>
							<Header />
							<CalculationView />
							<Footer />
						</ErrorBoundary>
					</StorageProvider>
				</CurrencyMapProvider>
			</AuthGuard>
		</div>
	);
}

export default App;
