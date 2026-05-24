"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = ["home", "projects", "about", "contact"];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;

      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPos >= top && scrollPos < top + height) {
            setActive(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = (section: string) =>
    `transition-colors duration-200 ${
      active === section ? "text-white" : "text-gray-500 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-gray-900 shadow-sm shadow-black/40">

      <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="text-xl font-bold text-white">
          Sid AI Lab
        </div>

        {/* Links */}
        <div className="flex gap-6">

          <a href="#" className={linkClass("home")}>
            Home
          </a>

          <a href="#projects" className={linkClass("projects")}>
            Projects
          </a>

          <a href="#about" className={linkClass("about")}>
            About
          </a>

          <a href="#contact" className={linkClass("contact")}>
            Contact
          </a>

        </div>

      </div>
    </nav>
  );
}