import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { setInitialStorageValues } from "./utils/storage.ts";

import App from "./App.tsx";

setInitialStorageValues();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
