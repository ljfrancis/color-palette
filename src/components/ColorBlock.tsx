import Link from "next/link";
import tinycolor from "tinycolor2";

export function ColorBlock({ hex, width, height }) {
	const isLight = tinycolor(hex).isLight();
	const cleanHex = tinycolor(hex).toHex();
	return (
		<div
			className="w-full rounded-xl block flex shrink-0 items-center justify-center lg:m-2 md:m-1 m-0.5 lg:px-2 md:px-1 px-0.5"
			style={{
				backgroundColor: `#${cleanHex}`,
				height: `calc(${height} * 2vw)`,
				width: `${width}%`,
			}}
		>
			<Link
				className={`text-xs md:text-lg lg:text-2xl ${isLight ? "hex-text-black" : "hex-text-white"}`}
				href={`/color?hex=${cleanHex}`}
			>
				#{cleanHex}
			</Link>
		</div>
	);
}
