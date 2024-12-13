import "./index.css";
import "./assets/fonts/fontin/Fontin-Regular.ttf";

import { DatabaseContextProvider } from "./context/DatabaseContextProvider";
import { Header } from "./components/Header";
import { CurrencyConverter } from "./components/CurrencyConverter";
import { Footer } from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
	return (
		<div className='flex flex-col gap-4 min-h-screen'>
			<Header />
			<div className='flex-1 overflow-x-hidden'>
				<ErrorBoundary>
					<DatabaseContextProvider>
						<CurrencyConverter />
					</DatabaseContextProvider>
				</ErrorBoundary>
			</div>
			<Footer />
		</div>
	);
}

export default App;
