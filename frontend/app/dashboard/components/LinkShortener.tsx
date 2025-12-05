"use client";

import { useState } from "react";
import { Link as LinkIcon, Copy, Check, Zap } from "lucide-react";
import axios from "axios";

interface LinkShortenerProps {
  onLinkCreated: () => void;
}

export default function LinkShortener({ onLinkCreated }: LinkShortenerProps) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/links`,
        {
          originalUrl,
          customCode: customCode || undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const frontendUrl = "https://webapps.live";
      setShortUrl(`${frontendUrl}/${response.data.shortCode}`);
      setOriginalUrl("");
      setCustomCode("");
      onLinkCreated();
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to create short link");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Create Link Form */}
      <div className="glassmorphism dark:glassmorphism-dark rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="p-4 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl w-fit mx-auto mb-4">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Short Link
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Transform your long URL into a short, trackable link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Original URL *
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="url"
                required
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-lg"
                placeholder="https://example.com/very-long-url"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Custom Code (Optional)
            </label>
            <input
              type="text"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              className="w-full px-4 py-4 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-lg"
              placeholder="my-custom-link"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Leave empty for auto-generated code
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? "Creating Link..." : "Shorten URL"}
          </button>
        </form>
      </div>

      {/* Result */}
      {shortUrl && (
        <div className="glassmorphism dark:glassmorphism-dark rounded-3xl p-8 shadow-xl animate-fade-in">
          <div className="text-center mb-6">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl w-fit mx-auto mb-4">
              <Check className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Link Created Successfully!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your short link is ready to use
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Short URL:
              </p>
              <p className="text-lg font-mono text-primary-600 dark:text-primary-400 break-all">
                {shortUrl}
              </p>
            </div>
            <button
              onClick={copyToClipboard}
              className="p-3 bg-primary-100 dark:bg-primary-900/20 hover:bg-primary-200 dark:hover:bg-primary-900/40 rounded-xl transition-colors duration-200"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <Copy className="h-5 w-5 text-primary-600" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
