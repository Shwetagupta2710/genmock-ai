"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const path = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "How It Works", path: "/dashboard/how-it-works" },
    { name: "About Us", path: "/dashboard/about" },
  ];

  const handleNavClick = (itemPath) => {
    router.push(itemPath);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="flex p-4 items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-sm relative z-50 transition-colors">
        <Image
          src="/custom-logo.svg"
          width={120}
          height={80}
          alt="logo"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <li
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`hover:text-primary transition-all cursor-pointer font-normal ${
                path === item.path && "text-primary font-medium"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Mobile & Desktop Right Section */}
        <div className="flex items-center gap-3">
          <UserButton />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg absolute top-[72px] left-0 right-0 z-40 backdrop-blur-sm">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b dark:border-gray-800 last:border-b-0 transition-colors ${
                  path === item.path
                    ? "bg-indigo-50 dark:bg-indigo-950/50 text-primary font-medium"
                    : "text-gray-700 dark:text-gray-300 font-normal"
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Header;
