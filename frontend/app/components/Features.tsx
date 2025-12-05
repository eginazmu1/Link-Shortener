'use client';

import { Check, Link as LinkIcon, MousePointer, TrendingUp, Users, Globe } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: LinkIcon,
      title: 'Custom Short URLs',
      description: 'Create branded short links that match your style and brand identity.'
    },
    {
      icon: MousePointer,
      title: 'Click Tracking',
      description: 'Monitor every click with real-time analytics and detailed insights.'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Understand your audience with comprehensive performance metrics.'
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Organize and manage all your links from a centralized dashboard.'
    },
    {
      icon: Globe,
      title: 'Global CDN',
      description: 'Lightning-fast redirects powered by our global content delivery network.'
    }
  ];

  return (
    <section id="features" className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Everything you need to
            <span className="block gradient-text">manage your links</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful features designed to help you create, track, and optimize your short links
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glassmorphism dark:glassmorphism-dark rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl w-fit mb-6">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="glassmorphism dark:glassmorphism-dark rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to get started?
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust QuickLink for their URL shortening needs
          </p>
          <a
            href="/auth/register"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 gap-2"
          >
            <Check className="h-5 w-5" />
            Create Free Account
          </a>
        </div>
      </div>
    </section>
  );
}