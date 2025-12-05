'use client';

import { Link as LinkIcon, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl">
                <LinkIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">QuickLink</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              The modern URL shortener that combines simplicity with powerful analytics. 
              Create, track, and optimize your links effortlessly.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
            <div className="space-y-2">
              <a href="#features" className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                Features
              </a>
              <a href="/auth/login" className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                Login
              </a>
              <a href="/auth/register" className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                Sign Up
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Connection</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © Egi
          </p>
        </div>
      </div>
    </footer>
  );
}