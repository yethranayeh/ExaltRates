const iconSize = 34;
const defaultFileSize = 108;
const sheetWidth = 2160;
const relativeSize = (iconSize / defaultFileSize) * sheetWidth;

export const CurrencyIcon = ({ index }: { index: number }) => (
	<div
		style={{
			width: iconSize,
			height: iconSize,
			backgroundImage: "url(currency/sheet.png)",
			backgroundSize: relativeSize,
			backgroundPosition: index * iconSize * -1
		}}
	/>
);
