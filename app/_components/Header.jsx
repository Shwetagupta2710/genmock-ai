"use client";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function Header() {
  const path = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully!");
    router.push("/sign-in");
  };

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
      <div className="sticky top-0 z-50 flex p-5 items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 transition-colors">
        <Image
          src="/custom-logo.svg"
          width={130}
          height={85}
          alt="logo"
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => router.push("/")}
        />

        <ul className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <li
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`relative transition-all cursor-pointer group ${
                path === item.path
                  ? "text-indigo-600 dark:text-indigo-400 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-normal"
              }`}
            >
              {item.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-300 ${
                path === item.path ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{user?.email?.split("@")[0]}</span>
            </Button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.email}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>

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
        <div className="md:hidden bg-white dark:bg-gray-900 border-b shadow-xl absolute top-[85px] left-0 right-0 z-40 animate-slide-down backdrop-blur-xl">
          <ul className="flex flex-col">
            {navItems.map((item, index) => (
              <li
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`px-6 py-4 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer border-b last:border-b-0 transition-colors duration-200 ${
                  path === item.path
                    ? "bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-medium border-l-4 border-l-indigo-600 dark:border-l-indigo-400"
                    : "text-gray-700 dark:text-gray-300 font-normal"
                }`}
                style={{animation: `slide-up 0.3s ease-out ${index * 0.05}s both`}}
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
