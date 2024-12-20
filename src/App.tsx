import "./index.css";
import "./assets/fonts/fontin/Fontin-Bold.ttf";
import "./assets/fonts/fontin/Fontin-Italic.ttf";
import "./assets/fonts/fontin/Fontin-Regular.ttf";
import "./assets/fonts/fontin/Fontin-SmallCaps.ttf";

import { BrowserRouter } from "react-router";
import { Routes } from "./routes/Routes";

function App() {
	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	);
}

export default App;
