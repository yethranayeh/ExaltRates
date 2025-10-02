import { Route, Routes as RouterRotues } from "react-router";

import { MainLayout } from "./layout/MainLayout";

import Home from "@/pages/Home";
import ExchangeRateCharts from "@/pages/charts";
import FAQPage from "@/pages/faq";
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/Alert";
import { AlertCircle } from "lucide-react";
import { Link } from "./layout/links/Link";

export function Routes() {
	return (
		<RouterRotues>
			<Route element={<MainLayout />}>
				<Route
					index
					element={
						<div className='max-w-[500px] flex flex-col gap-4'>
							<Alert variant='destructive'>
								<AlertCircle className='h-4 w-4' />
								<AlertTitle>Discontinued</AlertTitle>
								<AlertDescription>
									This project is no longer maintained. It may not receive any updates for the foreseeable future.
								</AlertDescription>
							</Alert>
							<div>
								<p>
									If you would like to check Path of Exile 2 currency rates, you can use one of the following websites
									that are regularly maintained:
								</p>
								<ul className='pl-4'>
									<li className='list-disc'>
										<a className='underline' href='https://poe2scout.com/economy/currency'>
											Poe2 Scout
										</a>
									</li>
									<li className='list-disc'>
										<a className='underline' href='https://www.aoeah.com/poe-2-currency/exchange-rates'>
											AOEAH
										</a>
									</li>
									<li className='list-disc'>
										<a className='underline' href='https://poe.ninja/poe2/economy/'>
											poe.ninja
										</a>
									</li>
								</ul>
							</div>
						</div>
					}
				/>
				{/* <Route path='/charts' element={<ExchangeRateCharts />} /> */}
				{/* <Route path='/graphs' element={<ExchangeRateCharts />} /> */}
				<Route
					path='/settings'
					element={
						<div>
							<p>This page is not yet available.</p>{" "}
							<p>You will be able to fine-tune your experience on Exalt Rates.</p>
						</div>
					}
				/>
				<Route path='/faq' element={<FAQPage />} />
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
