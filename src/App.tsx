import "./index.css";
import "./assets/fonts/fontin/Fontin-Regular.ttf";

import { DatabaseContextProvider } from "./context/DatabaseContextProvider";
import { CurrencyConverter } from "./components/CurrencyConverter";
import ErrorBoundary from "./components/ErrorBoundary";
import { Header } from "./components/Header";

function App() {
	return (
		<div className='flex flex-col gap-4'>
			<Header />
			<ErrorBoundary>
				<DatabaseContextProvider>
					<CurrencyConverter />
				</DatabaseContextProvider>
			</ErrorBoundary>
		</div>
	);
}

export default App;
