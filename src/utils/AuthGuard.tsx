import clsx from "clsx";
import { PropsWithChildren, useEffect, useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { AlertCircle } from "lucide-react";

import { DatabaseContext } from "../context/DatabaseContext";

import { app } from "../firebase";
import { Gears } from "../components/Gears";
import { Alert, AlertDescription, AlertTitle } from "../components/shadcn/Alert";

export function AuthGuard(props: PropsWithChildren) {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [isSignedIn, setIsSignedIn] = useState(false);

	useEffect(() => {
		const auth = getAuth();
		signInAnonymously(auth)
			.then(() => {
				setIsSignedIn(true);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);

				const errorCode = error.code;
				const errorMessage = error.message;
				setError(`[${errorCode}]: ${errorMessage}`);
			});
	}, []);

	if (!isSignedIn && !isLoading) {
		return (
			<div className={clsx("flex flex-1 flex-col items-center mt-4", isLoading ? "loading" : undefined)}>
				<Alert variant='destructive' className='w-full max-w-[450px] z-50 bg-black'>
					<AlertCircle className='h-4 w-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						<p>There was a problem while connecting to the server. Please try again later.</p>
						{error && <p>{error}</p>}
					</AlertDescription>
				</Alert>
				<Gears />
			</div>
		);
	}

	return <DatabaseContext.Provider value={getFirestore(app)}>{props.children}</DatabaseContext.Provider>;
}
