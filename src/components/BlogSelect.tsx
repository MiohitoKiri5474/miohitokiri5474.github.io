import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export default function BlogSelect() {
  return (
    <Popover className="relative inline-block text-center z-30">
      <PopoverButton className="text-zinc-900 dark:text-zinc-300 p-2 rounded-md">
        Blog
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className="flex flex-col z-40 w-40 mt-2 rounded-md shadow-lg backdrop-blur-md text-center"
      >
        <div className="flex flex-col p-2 space-y-2">
          <a href="/code" className="p-2 rounded-md">
            Code
          </a>
          <a href="/game" className="p-2 rounded-md">
            Game
          </a>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
