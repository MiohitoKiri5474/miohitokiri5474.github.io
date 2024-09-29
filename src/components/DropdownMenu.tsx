import React, { Fragment } from "react";
import { Menu, MenuItems, MenuButton, Transition } from "@headlessui/react";
import { IoMenu } from "react-icons/io5";
import BlogSelect from "./BlogSelect";

export default function DropdownMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex justify-center rounded-md border border-zinc-400 dark:border-zinc-700 px-2 py-2 text-sm font-medium shadow-sm hover:bg-orange-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 transition-all"
          aria-label="menu"
        >
          <IoMenu className="h-4 w-5" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="py-1">
          <a href="/" className="px-3 py-2 uppercase font-bold text-xs">
            Home
          </a>
          <a href="/code" className="px-3 py-2 uppercase font-bold text-xs">
            Code
          </a>
          <a href="/game" className="px-3 py-2 uppercase font-bold text-xs">
            Game
          </a>
          <a href="/about" className="px-3 py-2 uppercase font-bold text-xs">
            About
          </a>
          <a href="/" className="px-3 py-2 uppercase font-bold text-xs"></a>
        </div>
      </Transition>
    </Menu>
  );
}
