"use client";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image"
import { Disclosure } from "@headlessui/react";
import { useState, useEffect } from 'react';

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import tinycolor from "tinycolor2";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const navigation = [
    // "Palette Generator",
    // "Saved Palettes",
  ];

  const paths = [
    "generator",
    "palettes",
  ];

  const [searchText, setSearchText] = useState('');
  const [showSearchPalette, setShowSearchPalette] = useState(false);
  const [color, setColor] = useColor("");
  const { theme, setTheme } = useTheme();

  window.addEventListener("click", (e) => {
    const target = (e?.target as HTMLInputElement)
    if(!target?.className || typeof target.className != 'string') return;
    const classNames = ["searchBar", "rcp-saturation", "rcp-hue", "rcp-body", "rcp-section", "rcp-field-label", "rcp-fields", "rcp-alpha-cursor", "rcp-alpha"];

    let hideDropDown = true;
    if(["hex", "rgb", "hsv"].includes(target.id)) {
      hideDropDown = false;
    } 

    classNames.map(c => {
      if(target.className.indexOf(c) > -1) hideDropDown = false;
    })

    if(hideDropDown) setShowSearchPalette(false);

  });

  const handleSearchChange = async (e) =>  {
    let cleanSearchText = e.target.value;
    setSearchText(cleanSearchText);
  }

  const handleDropDownChange = async (e) =>  {
    setColor(e);
    setSearchText(e.hex);
    setShowSearchPalette(true);
  }

  const showDropDown = async (e) =>  {
    console.log('showDropDown')
    setShowSearchPalette(true);
  }

  const hideDropDown = async (e) =>  {
    if(theme === 'dark') {
      document.getElementById("searchButton").style.backgroundColor = "white";
      document.getElementById("searchButton").style.color = "black";
    } else {
      document.getElementById("searchButton").style.backgroundColor = "black";
      document.getElementById("searchButton").style.color = "white";
    }
    setShowSearchPalette(false);
  }

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-gray-600 dark:text-gray-100">
                    <span>
                      <Image
                        src={theme === 'dark' ? "/img/logo-white.svg" : "/img/logo.svg"}
                        alt="N"
                        width="32"
                        height="32"
                        className="w-8"
                      />
                    </span>
                    <span>Color Picker</span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-gray-400  focus:text-gray-400 focus:text-gray-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => {
                      const path = `/${paths[index]}`;
                      return (
                        <Link key={index} href={path} className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-gray-400 focus:text-gray-400 focus:text-gray-100 dark:focus:bg-gray-800 focus:outline-none">
                          {item}
                        </Link>
                      )
                    })}
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchText}
                      onChange={handleSearchChange}
                      onFocus={showDropDown}
                      className="searchBar border-2 border-slate-300 rounded-md p-2 mr-2"
                    />
                    {
                      showSearchPalette && (
                        <div
                          className="absolute top-36 left-8 z-10 w-80 h-48"
                        >
                          <ColorPicker
                            height={228}
                            color={color}
                            onChange={handleDropDownChange}
                          />
                        </div>
                      ) 
                    }
                    <Link 
                      id="searchButton"
                      onClick={hideDropDown} 
                      href={`/color?hex=${searchText.includes('#') ? searchText.substring(1) : searchText}`} 
                      style={{
                        backgroundColor: `${searchText.includes('#') ? searchText : '#' + searchText}`,
                        color: `${searchText ? (tinycolor(searchText).isLight() ? 'black' : 'white') : (theme === 'dark' ? 'black' : 'white')}`,
                        transition: `background-color 0.5s ease, color 0.5s ease`
                      }}
                      className="px-6 py-2 text-white bg-black dark:text-black dark:bg-white rounded-md md:ml-5">
                        Search
                    </Link>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => {
              const path = `/${paths[index]}`;
              return (
              <li className="mr-3 nav__item" key={index}>
                <Link href={path} className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-gray-400 dark:hover:text-gray-300 focus:text-gray-400 focus:text-gray-100 focus:outline-none dark:focus:bg-gray-800">
                    {menu}
                </Link>
              </li>
            )})}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={handleSearchChange}
              onFocus={showDropDown}
              className="searchBar border-2 border-slate-300 rounded-md p-2"
            />
            {
              showSearchPalette && (
                <div
                  className="absolute top-24 right-24 z-10 w-80 h-48"
                >
                  <ColorPicker
                    height={228}
                    color={color}
                    onChange={handleDropDownChange}
                  />
                </div>
              ) 
            }
          </div>
          <Link 
            id="searchButton"
            onClick={hideDropDown} 
            href={`/color?hex=${searchText.includes('#') ? searchText.substring(1) : searchText}`} 
            style={{
              backgroundColor: `${searchText.includes('#') ? searchText : '#' + searchText}`,
              color: `${searchText ? (tinycolor(searchText).isLight() ? 'black' : 'white') : (theme === 'dark' ? 'black' : 'white')}`,
              transition: `background-color 0.5s ease, color 0.5s ease`
            }}
            className="px-6 py-2 text-white bg-black dark:text-black dark:bg-white rounded-md md:ml-5">
              Search
          </Link>

          <ThemeChanger/>
        </div>

      </nav>
    </div>
  );
}

