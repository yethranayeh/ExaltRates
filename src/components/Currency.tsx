import { currencies } from "../constant";

const iconSize = 34;
const defaultFileSize = 108;
const sheetWidth = 2160;
const relativeSize = (iconSize / defaultFileSize) * sheetWidth;

export function Currency({ name }: { name: CurrencyKey }) {
	return (
		<div className='flex flex-row items-center'>
			<div
				style={{
					width: iconSize,
					height: iconSize,
					backgroundImage: "url(currency/sheet.png)",
					backgroundSize: relativeSize,
					backgroundPosition: currencies.indexOf(name) * iconSize * -1
				}}
			/>
			<span className='font-[FontinBold]'>{name}</span>
		</div>
	);
}
