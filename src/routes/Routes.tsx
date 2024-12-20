import { Route, Routes as RouterRotues } from "react-router";

import { MainLayout } from "./layout/MainLayout";
import { CalculationView as HomePage } from "@/components/CalculationView";
export function Routes() {
	return (
		<RouterRotues>
			<Route element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route
					path='/graphs'
					element={
						<div>
							<p>This page is not yet available.</p> <p>There will be graphs about rate trends.</p>
						</div>
					}
				/>
				<Route
					path='/settings'
					element={
						<div>
							<p>This page is not yet available.</p>{" "}
							<p>You will be able to fine-tune your experience on Exalt Rates.</p>
						</div>
					}
				/>
				<Route
					path='/faq'
					element={
						<div>
							<p>This page is not yet available.</p>
						</div>
					}
				/>
				<Route
					path='*'
					element={
						<div>
							<h1>404</h1>
							<p>Page not found</p>
						</div>
					}
				/>
			</Route>
		</RouterRotues>
	);
}
