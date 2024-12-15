// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/error_boundaries/
import { Component, ErrorInfo, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "./shadcn/Alert";
import { AlertCircle } from "lucide-react";

interface Props {
	children?: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false
	};

	public static getDerivedStateFromError(_: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("EXALT_RATES_ERR:", error, errorInfo);
	}

	// TODO: Custom children
	public render() {
		if (this.state.hasError) {
			return (
				<div className='w-full h-screen grid place-items-center px-4'>
					<Alert variant='destructive' className='w-full max-w-[450px]'>
						<AlertCircle className='h-4 w-4' />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>
							<p>Something went wrong while preparing the currency conversion calculator. Please check back later.</p>
							<p className='mt-2'>
								You can also{" "}
								<a href='https://github.com/yethranayeh/ExaltRates/issues' target='_blank' className='underline'>
									submit this issue
								</a>{" "}
								with error details.
							</p>
							<p className='opacity-50'>
								The details of the error (starting with "<span className='font-bold'>EXALT_RATES_ERR</span>") can be
								viewed in the developer console.
							</p>
						</AlertDescription>
					</Alert>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
