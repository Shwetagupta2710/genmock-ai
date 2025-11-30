"use client";
import React from "react";
import { CopyrightIcon, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start text-sm">
            <CopyrightIcon className="mr-2 h-5 w-5 text-gray-400" />
            <span>2025 GenMock AI. All Rights Reserved.</span>
          </div>

          {/* Made With Love Line */}
          <p className="text-xs text-gray-400 mt-1">Made with ❤️ by Shweta</p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-indigo-500 transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-indigo-500 transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-indigo-500 transition-colors"
          >
            <Twitter className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
