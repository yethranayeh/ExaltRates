import { Outlet } from "react-router";

import { Header } from "./Header/Header";
import { SideMenu } from "./menu/SideMenu";
import { Footer } from "./Footer";

import { AuthGuard } from "@/utils/AuthGuard";
import ErrorBoundary from "@/components/ErrorBoundary";
import { StorageProvider } from "@/utils/StorageProvider";

export function MainLayout() {
	return (
		<div className='flex flex-col gap-4 min-h-screen overflow-x-hidden'>
			<AuthGuard>
				<StorageProvider>
					<ErrorBoundary>
						<Header />
						<SideMenu />

						<div className='w-full flex flex-1 justify-center px-4'>
							<Outlet />
						</div>
						<Footer />
					</ErrorBoundary>
				</StorageProvider>
			</AuthGuard>
		</div>
	);
}
