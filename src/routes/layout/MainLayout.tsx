import { Outlet } from "react-router";

import { Header } from "./Header/Header";
import { SideMenu } from "./menu/SideMenu";
import { Footer } from "./Footer";

import { AuthGuard } from "@/utils/AuthGuard";
import ErrorBoundary from "@/components/ErrorBoundary";
import { StorageProvider } from "@/utils/StorageProvider";
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/Alert";

export function MainLayout() {
	return (
		<div className='flex flex-col gap-4 min-h-screen overflow-x-hidden'>
			<AuthGuard>
				<StorageProvider>
					<ErrorBoundary>
						<Header />
						<SideMenu />

						<Alert variant='warning' className='p-4 m-auto max-w-[400px]'>
							<AlertTitle>Dawn of the Hunt Update</AlertTitle>
							<AlertDescription>
								The website is currently <span className='font-bold underline'>outdated</span> and does not display
								current currency ratios. There is currently work in progress to update the page for 0.2.0 Dawn of the
								Hunt update.
							</AlertDescription>
						</Alert>
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
