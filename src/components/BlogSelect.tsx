import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export default function Example() {
  return (
    <div className="flex justify-center">
      <div className="flex gap-8">
        <Popover>
          <PopoverButton>Blogs</PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="divide-y rounded-xltransition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 z-30"
          >
            <div className="p-3 bg-orange-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-300 break-words leading-6 transition-colos">
              <a
                className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                href="/code"
              >
                <p className="font-semibold">Code</p>
                <p>It's time to Coding!</p>
              </a>
              <a
                className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                href="/game"
              >
                <p className="font-semibold">Game</p>
                <p>All work and no play makes Jack a dull boy</p>
              </a>
            </div>
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  );
}
