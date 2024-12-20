import { Outlet } from "react-router";

import { Header } from "./Header/Header";
import { Footer } from "./Footer";

import { AuthGuard } from "../../utils/AuthGuard";
import { CurrencyMapProvider } from "../../utils/CurrencyMapProvider";
import { StorageProvider } from "../../utils/StorageProvider";
import ErrorBoundary from "../../components/ErrorBoundary";
import { SideMenu } from "./menu/SideMenu";

export function MainLayout() {
	return (
		<div className='flex flex-col gap-4 min-h-screen'>
			<AuthGuard>
				<CurrencyMapProvider>
					<StorageProvider>
						<ErrorBoundary>
							<Header />
							<SideMenu />

							<div className='w-full flex flex-1 overflow-x-hidden justify-center px-4'>
								<Outlet />
							</div>
							<Footer />
						</ErrorBoundary>
					</StorageProvider>
				</CurrencyMapProvider>
			</AuthGuard>
		</div>
	);
}
