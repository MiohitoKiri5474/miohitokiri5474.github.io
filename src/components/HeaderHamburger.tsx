import React, { Fragment } from "react";
import { Menu, MenuItems, MenuButton, Transition } from "@headlessui/react";
import { IoMenu } from "react-icons/io5";

export default function DropdownMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex justify-center rounded-md border border-zinc-400 dark:border-zinc-700 px-2 py-2 text-sm font-medium shadow-sm hover:bg-orange-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 transition-all no-underline"
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
        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-md border border-zinc-400 dark:border-zinc-700 bg-orange-50 dark:bg-zinc-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-zinc-400 dark:divide-zinc-700">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/"
                  className={`block px-4 py-2 text-sm uppercase font-bold no-underline ${
                    active ? "bg-orange-200 dark:bg-zinc-700" : ""
                  }`}
                >
                  Home
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/post"
                  className={`block px-4 py-2 text-sm uppercase font-bold no-underline ${
                    active ? "bg-orange-200 dark:bg-zinc-700" : ""
                  }`}
                >
                  Posts
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/about"
                  className={`block px-4 py-2 text-sm uppercase font-bold no-underline ${
                    active ? "bg-orange-200 dark:bg-zinc-700" : ""
                  }`}
                >
                  About
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/coffee-timer"
                  className={`block px-4 py-2 text-sm uppercase font-bold no-underline ${
                    active ? "bg-orange-200 dark:bg-zinc-700" : ""
                  }`}
                >
                  Timer
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href="/bubbles"
                  className={`block px-4 py-2 text-sm uppercase font-bold no-underline ${
                    active ? "bg-orange-200 dark:bg-zinc-700" : ""
                  }`}
                >
                  Bubbles
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="https://github.com/MiohitoKiri5474"
                  className={`block px-4 py-2 text-sm uppercase font-bold no-underline ${
                    active ? "bg-orange-200 dark:bg-zinc-700" : ""
                  }`}
                >
                  GitHub
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
