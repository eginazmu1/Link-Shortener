'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Menu, X, Moon, Sun, Link as LinkIcon } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="relative z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="glassmorphism dark:glassmorphism-dark rounded-2xl px-6 py-4 shadow-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl">
                <LinkIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">
                QuickLink
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                Features
              </a>
              <a href="/auth/login" className="px-4 py-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200">
                Login
              </a>
              <a href="/auth/register" className="px-6 py-2 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Get Started
              </a>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700 animate-slide-up">
              <div className="flex flex-col space-y-3">
                <a href="#features" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  Features
                </a>
                <a href="/auth/login" className="px-4 py-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg">
                  Login
                </a>
                <a href="/auth/register" className="px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg text-center">
                  Get Started
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}