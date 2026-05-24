"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `transition-colors duration-200 ${
      pathname === path
        ? "text-white"
        : "text-gray-500 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-gray-900">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-bold text-white"
        >
          Sid's Portfolio
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 text-sm">

          {/* HOME */}
          <Link
            href="/"
            className={linkClass("/")}
          >
            Home
          </Link>

          {/* PROJECTS SECTION */}
          <a
            href="/#projects"
            className="text-gray-500 hover:text-white transition-colors duration-200"
          >
            Projects
          </a>

          {/* ABOUT PAGE */}
          <Link
            href="/about"
            className={linkClass("/about")}
          >
            About Me
          </Link>

        </div>

      </div>
    </nav>
  );
}