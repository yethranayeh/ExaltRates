import { memo } from "react";
import { currencies } from "../constant";

const defaultFileSize = 108;
const sheetWidth = 2160;

function getRelativeSize(size: number) {
	return (size / defaultFileSize) * sheetWidth;
}

const Component = ({ name, size = 34 }: { name: CurrencyKey; size?: number }) => (
	<div
		style={{
			width: size,
			height: size,
			backgroundImage: "url(currency/sheet.png)",
			backgroundSize: getRelativeSize(size),
			backgroundPosition: currencies.indexOf(name) * size * -1
		}}
	/>
);
export const CurrencyIcon = memo(Component);
