import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function BlogSelect({ className = "" }) {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    // Determine the current path and set the active link
    const currentPath = window.location.pathname;
    if (currentPath.includes("/code")) {
      setActiveLink("code");
    } else if (currentPath.includes("/game")) {
      setActiveLink("game");
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex gap-8 no-underline">
        <Popover>
          <PopoverButton
            className={`${activeLink === "code" || activeLink === "game" ? "font-bold underline" : ""}`}
          >
            Blogs
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className={`backdrop-blur-lg divide-y rounded-xltransition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 z-30 ${className}`}
          >
            <div className="p-3 break-words leading-6 transition-colors">
              <a
                className={`block rounded-lg py-2 px-3 transition hover:bg-white/5 ${activeLink === "code" ? "" : "no-underline"}`}
                href="/code"
              >
                <p className="font-semibold">Code</p>
                <p>It's time to Coding!</p>
              </a>
              <a
                className={`block rounded-lg py-2 px-3 transition hover:bg-white/5 ${activeLink === "game" ? "" : "no-underline"}`}
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
