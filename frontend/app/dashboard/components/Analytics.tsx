'use client';

import { TrendingUp, MousePointer, Calendar, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsProps {
  links: any[];
}

export default function Analytics({ links }: AnalyticsProps) {
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const totalLinks = links.length;
  const averageClicks = totalLinks > 0 ? Math.round(totalClicks / totalLinks) : 0;

  // Generate mock data for chart
  const chartData = [
    { name: 'Mon', clicks: 12 },
    { name: 'Tue', clicks: 19 },
    { name: 'Wed', clicks: 8 },
    { name: 'Thu', clicks: 25 },
    { name: 'Fri', clicks: 15 },
    { name: 'Sat', clicks: 9 },
    { name: 'Sun', clicks: 6 },
  ];

  const topLinks = links
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glassmorphism dark:glassmorphism-dark rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
              <MousePointer className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {totalClicks.toLocaleString()}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Total Clicks</p>
        </div>

        <div className="glassmorphism dark:glassmorphism-dark rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {totalLinks}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Total Links</p>
        </div>

        <div className="glassmorphism dark:glassmorphism-dark rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {averageClicks}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Avg. Clicks</p>
        </div>

        <div className="glassmorphism dark:glassmorphism-dark rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
              <Globe className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            24/7
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Availability</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Clicks Chart */}
        <div className="glassmorphism dark:glassmorphism-dark rounded-3xl p-8 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Weekly Clicks
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.6)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.6)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="url(#colorGradient)"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Links */}
        <div className="glassmorphism dark:glassmorphism-dark rounded-3xl p-8 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Top Performing Links
          </h3>
          <div className="space-y-4">
            {topLinks.length > 0 ? (
              topLinks.map((link, index) => (
                <div
                  key={link._id}
                  className="flex items-center justify-between p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      /{link.shortCode}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {link.originalUrl}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {link.clicks}
                    </span>
                    <span className="text-sm text-gray-500">clicks</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No links to display
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}