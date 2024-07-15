"use client";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import tinycolor from "tinycolor2";

import Link from "next/link";
import { Container } from "@/components/Container";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [color, setColor] = useColor(theme === "dark" ? "#fff" : "#000");

  return (
    <Container>
      <div>
        <ColorPicker
          height={228}
          color={color}
          onChange={setColor}
          hideInput={["hsv"]}
        />
      </div>

      <div className="mx-auto my-6 text-center">
        <a
          href={`/color?hex=${color.hex.substring(1)}`}
          className="px-8 py-4 text-white text-xl bg-black rounded-md md:ml-5"
          style={{
            backgroundColor: `${color.hex}`,
            color: `${tinycolor(color.hex).isLight() ? "black" : "white"}`,
            transition: `background-color 0.5s ease, color 0.5s ease`,
          }}
        >
          View Color Details
        </a>
      </div>
    </Container>
  );
}
