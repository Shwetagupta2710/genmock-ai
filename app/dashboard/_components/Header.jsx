"use client";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Menu, X, LogOut, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PricingModal from "./PricingModal";

function Header() {
  const path = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
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
          {/* Upgrade Button */}
          <Button
            onClick={() => setPricingModalOpen(true)}
            size="sm"
            className="hidden sm:flex bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
          >
            <Zap className="h-4 w-4 mr-1" />
            Upgrade
          </Button>
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
                    ? "bg-blue-50 dark:bg-blue-950/50 text-primary font-medium"
                    : "text-gray-700 dark:text-gray-300 font-normal"
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pricing Modal */}
      <PricingModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        userEmail={user?.email}
      />
    </>
  );
}

export default Header;
