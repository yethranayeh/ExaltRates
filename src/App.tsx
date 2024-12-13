import "./index.css";
import { DatabaseContextProvider } from "./context/DatabaseContextProvider";
import { CurrencyConverter } from "./components/CurrencyConverter";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
	return (
		<div>
			<ErrorBoundary>
				<DatabaseContextProvider>
					<CurrencyConverter />
				</DatabaseContextProvider>
			</ErrorBoundary>
		</div>
	);
}

export default App;
