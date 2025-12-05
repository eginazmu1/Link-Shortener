'use client';

import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center px-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="glassmorphism dark:glassmorphism-dark rounded-3xl p-12 shadow-2xl max-w-md mx-auto">
            <div className="p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl w-fit mx-auto mb-6">
              <AlertCircle className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Link Not Found
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              The short link you're looking for doesn't exist or has been removed. 
              Please check the URL and try again.
            </p>
            
            <div className="space-y-4">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                Go Home
              </a>
              
              <div className="text-center">
                <a
                  href="/dashboard"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                >
                  Go to Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}