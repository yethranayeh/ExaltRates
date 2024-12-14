import { memo } from "react";

const defaultFileSize = 108;
const sheetWidth = 2160;

function getRelativeSize(size: number) {
	return (size / defaultFileSize) * sheetWidth;
}

const Component = ({ index, size = 34 }: { index: number; size?: number }) => (
	<div
		style={{
			width: size,
			height: size,
			backgroundImage: "url(currency/sheet.png)",
			backgroundSize: getRelativeSize(size),
			backgroundPosition: index * size * -1
		}}
	/>
);
export const CurrencyIcon = memo(Component);
