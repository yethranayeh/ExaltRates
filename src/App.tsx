import "./index.css";
import "./assets/fonts/fontin/Fontin-Bold.ttf";
import "./assets/fonts/fontin/Fontin-Italic.ttf";
import "./assets/fonts/fontin/Fontin-Regular.ttf";
import "./assets/fonts/fontin/Fontin-SmallCaps.ttf";

import { AuthGuard } from "./utils/AuthGuard";
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
					<AuthGuard>
						<CurrencyConverter />
					</AuthGuard>
				</ErrorBoundary>
			</div>
			<Footer />
		</div>
	);
}

export default App;
