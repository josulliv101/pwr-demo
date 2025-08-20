"use client";

import { useState, useEffect, type ReactNode } from "react";

interface NavigationProps {
  children?: ReactNode;
}

export function Navigation({ children }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("section1");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["section1", "section2", "section3"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="  bottom-0 left-0 right-0 sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-t border-gray-200 w-full">
      <div className="w-full px-6 py-0">
        <div className="grid grid-cols-12 gap-4 px-4 items-center max-w-7xl mx-auto">
          {/* Navigation items - 4 columns */}
          <div className="col-span-4 flex items-center justify-start space-x-4">
            <button
              onClick={() => scrollToSection("section1")}
              className={`px-3 py-2 rounded-none font-medium transition-colors text-sm ${
                activeSection === "section1"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Compare Cities
            </button>
            <button
              onClick={() => scrollToSection("section2")}
              className={`px-3 py-2 rounded-none font-medium transition-colors text-sm ${
                activeSection === "section2"
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              City Rankings
            </button>
            <button
              onClick={() => scrollToSection("section3")}
              className={`px-3 py-2 rounded-none font-medium transition-colors text-sm ${
                activeSection === "section3"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
              }`}
            >
              Comfort Zones
            </button>
          </div>

          {/* Content area - 8 columns */}
          <div className="col-span-8 flex items-center justify-end">
            {children}
          </div>
        </div>
      </div>
    </nav>
  );
}
