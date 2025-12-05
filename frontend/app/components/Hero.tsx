'use client';

import { ArrowRight, Zap, BarChart3, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Shorten URLs with
            <span className="block gradient-text animate-gradient bg-gradient-to-r from-primary-500 via-purple-500 to-primary-600">
              Style & Analytics
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your long URLs into powerful, trackable short links. 
            Get detailed analytics and manage all your links in one beautiful dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href="/auth/register"
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 flex items-center gap-2 group"
            >
              Start Shortening
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#features"
              className="px-8 py-4 glassmorphism dark:glassmorphism-dark text-gray-700 dark:text-gray-300 text-lg font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Learn More
            </a>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glassmorphism dark:glassmorphism-dark rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl w-fit mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Generate short links instantly with our optimized infrastructure
              </p>
            </div>

            <div className="glassmorphism dark:glassmorphism-dark rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl w-fit mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Detailed Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Track clicks, locations, and user behavior with beautiful charts
              </p>
            </div>

            <div className="glassmorphism dark:glassmorphism-dark rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl w-fit mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Secure & Reliable
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Your links are protected with enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}