"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/Container";
import { ColorBlock } from "@/components/ColorBlock";
import tinycolor from "tinycolor2";

const ColorPage = () => {
	const router = useRouter();
  const searchParams = useSearchParams();
  let colorHex = searchParams.get('hex');

  const tinyColor = tinycolor(colorHex);
  const tinyColorTint = tinycolor(colorHex);
  const tinyColorShade = tinycolor(colorHex);
  const compliment = tinyColor.complement().toHex();
  const triads = tinyColor.triad().map(function(t) { return t.toHex(); });

	return (
		<Container>
      <div className="flex flex-col">
        <ColorBlock
          hex={colorHex} 
          height="20"
        />
        <div className="flex flex-row my-4">
          <div className="grow-[1]">
            <h1 className="text-lg lg:text-2xl lg:m-2 m-1 text-gray-800 dark:text-gray-200">Compliment</h1>
            <ColorBlock
              hex={compliment} 
              height="21"
            />
          </div>
          <div className="flex flex-col grow-[2] ml-6">
            <h1 className="text-lg lg:text-2xl lg:my-6 md:my-4 md:m-2 m-1 text-gray-800 dark:text-gray-200">Analogous Colors</h1>
            <div className="flex flex-row">
              <ColorBlock
                hex={tinyColor.spin(40).toHex()}
                height="7.4" 
                width="30"
              />
              <ColorBlock
                hex={colorHex} 
                height="7.4"
                width="30"
              />
              <ColorBlock
                hex={tinyColor.spin(-80).toHex()}
                height="7.4"
                width="30"
              />
            </div>
            <h1 className="text-lg lg:text-2xl lg:my-6 md:my-4 md:m-2 m-1 text-gray-800 dark:text-gray-200">Triadic Colors</h1>
            <div className="flex flex-row">
              <ColorBlock
                hex={triads[1]}
                height="8" 
                width="30"
              />
              <ColorBlock
                hex={triads[0]} 
                height="8"
                width="30"
              />
              <ColorBlock
                hex={triads[2]} 
                height="8"
                width="30"
              />
            </div>
          </div>
        </div>
        <h1 className="text-lg lg:text-2xl ml-2 text-gray-800 dark:text-gray-200">Tints</h1>
        <div className="flex flex-row lg:my-2 my-1">
          <ColorBlock
            hex={colorHex}
            height="7.4" 
            width="18"
          />
          <ColorBlock
            hex={tinyColorTint.brighten(6).toHex()} 
            height="7.4"
            width="18"
          />
          <ColorBlock
            hex={tinyColorTint.brighten(6).toHex()} 
            height="7.4"
            width="18"
          />
          <ColorBlock
            hex={tinyColorTint.brighten(6).toHex()} 
            height="7.4"
            width="18"
          />
          <ColorBlock
            hex={tinyColorTint.brighten(6).toHex()} 
            height="7.4"
            width="18"
          />
        </div>
        <h1 className="text-lg lg:text-2xl ml-2 text-gray-800 dark:text-gray-200">Shades</h1>
        <div className="flex flex-row lg:my-2 my-1">
          <ColorBlock
            hex={colorHex}
            height="7.4" 
            width="18"
          />
          <ColorBlock
            hex={tinyColorShade.darken(6).toHex()} 
            height="7.4"
            width="18"
          />
          <ColorBlock
            hex={tinyColorShade.darken(6).toHex()} 
            height="7.4"
            width="18"
          />
          <ColorBlock
            hex={tinyColorShade.darken(6).toHex()} 
            height="7.4"
            width="18"
          />
          <ColorBlock
            hex={tinyColorShade.darken(6).toHex()} 
            height="7.4"
            width="18"
          />
        </div>
      </div>
		</Container>
	)
}

export default ColorPage