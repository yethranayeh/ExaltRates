import "./index.css";
import "./assets/fonts/fontin/Fontin-Bold.ttf";
import "./assets/fonts/fontin/Fontin-Italic.ttf";
import "./assets/fonts/fontin/Fontin-Regular.ttf";
import "./assets/fonts/fontin/Fontin-SmallCaps.ttf";

import { BrowserRouter, Route, Routes } from "react-router";

import { MainLayout } from "./routes/layout/MainLayout";
import { CalculationView as HomePage } from "./components/CalculationView";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route index element={<HomePage />} />
					<Route path='*' element={<div>404</div>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
