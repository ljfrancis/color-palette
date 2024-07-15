"use client";
import { PaletteColor } from "@/components/PaletteColor";
import { ColorPicker, useColor } from "react-color-palette";
import tinycolor from "tinycolor2";
import { useState, useEffect } from "react";
import Link from "next/link";

const Generator = () => {
	const [showColorPicker, setShowColorPicker] = useState(false);
	const [color, setColor] = useColor("#000000");
	const [paletteColors, setPaletteColors] = useState([]);
	const [generatorText, setGeneratorText] = useState("");
	const [errorText, setErrorText] = useState("");
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 0,
	);

	// Hide search color picker when clicked outside of ColorPicker or search
	const DropDownClickListener = () => {
		useEffect(() => {
			if (typeof window !== "undefined") {
				window.addEventListener("click", (e) => {
					const target = e?.target as HTMLInputElement;
					if (!target?.className || typeof target.className != "string") return;
					const classNames = [
						"addColorButton",
						"rcp-saturation",
						"rcp-hue",
						"rcp-body",
						"rcp-section",
						"rcp-field-label",
						"rcp-fields",
						"rcp-alpha-cursor",
						"rcp-alpha",
					];

					let hideDropDown = true;
					if (["hex", "rgb", "hsv"].includes(target.id)) {
						hideDropDown = false;
					}

					classNames.map((c) => {
						if (target.className.indexOf(c) > -1) hideDropDown = false;
					});

					if (hideDropDown) setShowColorPicker(false);
				});
			}
		}, []);
	};

	DropDownClickListener();

	// Detect window resize to rerender different view if width changes
	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);
	});

	const toggleSearchPalette = () => {
		setShowColorPicker(true);
	};

	const handleColorChange = (newColor) => {
		setColor(newColor);
	};

	const addColor = (e) => {
		e.stopPropagation();
		const newPaletteColors = paletteColors.concat([color]);
		setPaletteColors(newPaletteColors);
		setShowColorPicker(false);
	};

	function editColor(id, newColor) {
		//iterate through all colors in palette and update the edited one
		const editedColors = paletteColors.map((color, i) => {
			if (`${i}${color.hex}` === id) {
				return { ...color, hex: newColor.hex };
			}
			return color;
		});
		setPaletteColors(editedColors);
	}

	const deleteColor = (id) => {
		const newColors = paletteColors.filter(
			(color, i) => `${i}${color.hex}` !== id,
		);
		setPaletteColors(newColors);
	};

	//Generate input x random colors to populate paletteColors
	const generateRandomPalette = (generatorText) => {
		const number = parseInt(generatorText);
		if (isNaN(number) || number > 6) {
			setErrorText("Please input a number equal or less than 6.");
			return;
		}

		setErrorText("");
		const randomColors = [];

		for (let i = 0; i < number; i++) {
			randomColors.push({ hex: tinycolor.random().toHex() });
		}

		setPaletteColors(randomColors);
	};

	const handleGeneratorChange = async (e) => {
		let newGeneratorText = e.target.value;
		setGeneratorText(newGeneratorText);
	};

	return (
		<>
			<div className="flex flex-col">
				<div className="flex md:flex-row flex-col mx-12 w-full">
					{/* Create palette color block for each color in palette, width dependent on number of colors */}
					{paletteColors.map((color, i) => {
						return (
							<PaletteColor
								key={`paletteColor${i}`}
								hex={color.hex}
								width={
									paletteColors?.length < 6
										? (1 / paletteColors.length) * 100 - 26 / paletteColors.length
										: (1 / paletteColors.length) * 100 - 2
								}
								deleteColor={deleteColor}
								editColor={editColor}
								i={i}
								first={i === 0}
								last={
									paletteColors?.length >= 6 && i === paletteColors.length - 1
								}
							/>
						);
					})}
					{/* Add another color button - hidden if already 6 colors in palette */}
					{paletteColors?.length < 6 && (
						<div
							className={`addColorButton block items-center bg-gray-100 justify-center m-0 py-8 md:h-80 h-40 text-center align-center ${windowWidth < 768 && paletteColors.length ? "rounded-b-lg" : paletteColors.length ? "rounded-r-lg" : "rounded-lg"}`}
							onClick={toggleSearchPalette}
							style={{
								width: `${windowWidth < 768 ? "80%" : !paletteColors.length ? "88%" : "16%"}`,
							}}
						>
							<p className="addColorButton md:pt-24 pt-8 text-4xl cursor-pointer">
								+
							</p>
							{/* Color picker to select new color added */}
							{showColorPicker && (
								<div
									className={`relative bottom-36 z-10 w-80 h-48 ${windowWidth >= 768 && paletteColors.length ? "right-36" : ""}`}
									onClick={(e) => e.stopPropagation()}
								>
									<ColorPicker
										height={140}
										color={color}
										onChange={handleColorChange}
										hideInput={["hsv"]}
									/>

									<div
										id="paletteButton"
										onClick={addColor}
										className="px-6 py-2 mt-2 width-full text-white bg-black dark:text-black dark:bg-white rounded-md cursor-pointer"
									>
										Add
									</div>
								</div>
							)}
						</div>
					)}
				</div>

				{/* Random Palette Generator */}
				<div className="flex justify-center m-8">
					<input
						type="text"
						placeholder="No. of Colors"
						size={12}
						value={generatorText}
						onChange={handleGeneratorChange}
						className="searchBar border-2 border-slate-300 rounded-md p-2"
					/>
					<p
						id="searchButton"
						onClick={() => generateRandomPalette(generatorText)}
						className="md:px-6 px-2 py-2 text-center text-white bg-black dark:text-black dark:bg-white rounded-md md:ml-4 ml-2 cursor-pointer"
					>
						Generate Palette
					</p>
				</div>
				<p id="generatorError" className="text-center text-red-600 text-sm">
					{errorText}
				</p>
			</div>
		</>
	);
};

export default Generator;
