import Link from "next/link";
import tinycolor from "tinycolor2";
import { ColorPicker, useColor } from "react-color-palette";
import { useState, useEffect, useCallback } from "react";

export function PaletteColor({
  hex,
  width,
  deleteColor,
  editColor,
  i,
  first,
  last,
}) {
  const isLight = tinycolor(hex).isLight();
  const cleanHex = tinycolor(hex).toHex();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useColor(`#${hex}`);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  // Hide search color picker when clicked outside of ColorPicker or search
  const DropDownClickListener = (setShowColorPicker) => {
    useEffect(() => {
      if (typeof window !== "undefined") {
        const handleClick = (e) => {
          const target = e?.target as HTMLInputElement;
          if (!target?.className || typeof target.className != "string") return;
          const classNames = [
            "editColorButton",
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
          classNames.forEach((c) => {
            if (target.className.indexOf(c) > -1) hideDropDown = false;
          });
          if (hideDropDown) setShowColorPicker(false);
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
      }
    }, [setShowColorPicker]);
  };

  DropDownClickListener(setShowColorPicker);

  // Detect window resize to rerender different view if width changes
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSearchPalette = useCallback(
    (e) => {
      setShowColorPicker(true);
    },
    [setColor],
  );

  const handleColorChange = useCallback(
    (newColor) => {
      setColor(newColor);
    },
    [setColor],
  );

  return (
    <div
      className={`block items-center text-center justify-center m-0 md:pt-28 pt-8 md:h-80 h-40 ${first && windowWidth < 768 ? "rounded-t-lg" : first ? "rounded-l-lg" : ""} ${last && windowWidth < 768 ? "rounded-b-lg" : last ? "rounded-r-lg" : ""}`}
      style={{
        backgroundColor: `#${cleanHex}`,
        width: `${windowWidth < 768 ? "80" : width}%`,
      }}
    >
      <div className="flex flex-col">
        <p
          className={`cursor-pointer editColorButton lg:text-2xl text-lg w-32 m-auto p-2 rounded-lg hover:bg-white/10 ${isLight ? "text-black" : "text-white"}`}
          onClick={(e) => toggleSearchPalette(e)}
        >
          {`#${cleanHex}`}
        </p>
        <Link
          className={`lg:text-2xl text-xl ${isLight ? "hex-text-black" : "hex-text-white"}`}
          href={`/color?hex=${cleanHex}`}
          target="_blank"
        >
          ↗
        </Link>
        <p
          onClick={() => deleteColor(`${i}${hex}`)}
          className={`lg:text-3xl text-xl m-2 cursor-pointer md:text-lg md:text-2xl ${isLight ? "hex-text-black" : "hex-text-white"}`}
        >
          ⓧ
        </p>

        {/* Color Picker drop down when color is being edited */}
        {showColorPicker && (
          <div
            className="relative bottom-36 left-12 z-10 w-80 h-48"
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
              onClick={() => {
                editColor(`${i}${hex}`, color);
                setShowColorPicker(false);
              }}
              className="px-6 py-2 mt-2 width-full text-white bg-black dark:text-black dark:bg-white rounded-md cursor-pointer"
            >
              Update
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
