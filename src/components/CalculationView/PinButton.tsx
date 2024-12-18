import { Pin, PinOff } from "lucide-react";
import clsx from "clsx";

import { useStorage } from "../../hooks/useStorage";

export function PinButton({ primary, secondary }: { primary: CurrencyKey; secondary: CurrencyKey }) {
	const {
		setPreferences,
		preferences: { pinned }
	} = useStorage();

	const isCurrentlyPinned = pinned?.primary === primary && pinned?.secondary === secondary;

	return (
		<button
			title={isCurrentlyPinned ? "Unpin" : "Pin to top"}
			type='button'
			className={clsx(
				"hover:text-primary-main transition-colors",
				isCurrentlyPinned ? "text-primary-main" : "text-primary-dark"
			)}
			onClick={() => {
				setPreferences(
					isCurrentlyPinned
						? { pinned: null }
						: {
								pinned: {
									primary: primary,
									secondary: secondary
								}
						  }
				);
			}}>
			{isCurrentlyPinned ? <PinOff className='w-4 h-4' /> : <Pin className='w-4 h-4' />}
		</button>
	);
}
