import "./index.css";
import { DatabaseContextProvider } from "./context/DatabaseContextProvider";
import { CurrencyConverter } from "./components/CurrencyConverter";

function App() {
	return (
		<div>
			<div>
				<DatabaseContextProvider>
					<CurrencyConverter />
				</DatabaseContextProvider>
			</div>
		</div>
	);
}

export default App;
