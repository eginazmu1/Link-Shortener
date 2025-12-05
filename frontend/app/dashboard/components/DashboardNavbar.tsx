'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { User, LogOut, Moon, Sun, Link as LinkIcon, Menu, X } from 'lucide-react';

interface DashboardNavbarProps {
  user: any;
  onLogout: () => void;
}

export default function DashboardNavbar({ user, onLogout }: DashboardNavbarProps) {
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
              <span className="text-2xl font-bold gradient-text">QuickLink</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <User className="h-4 w-4" />
                </div>
                <span className="font-medium">{user?.name}</span>
              </div>
              
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
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
                <div className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 mx-4 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}