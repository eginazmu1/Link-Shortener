"use client";

import { useState } from "react";
import { Copy, ExternalLink, Trash2, BarChart3, Check } from "lucide-react";
import axios from "axios";

interface LinksListProps {
  links: any[];
  onLinksUpdate: () => void;
}

export default function LinksList({ links, onLinksUpdate }: LinksListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const deleteLink = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    try {
      const token = localStorage.getItem("token");
      const apiUrl = "https://link-shortenerfix.vercel.app";
      await axios.delete(`${apiUrl}/links/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onLinksUpdate();
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  if (links.length === 0) {
    return (
      <div className="glassmorphism dark:glassmorphism-dark rounded-3xl p-12 text-center shadow-xl">
        <div className="p-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl w-fit mx-auto mb-4">
          <BarChart3 className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          No Links Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Create your first short link to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glassmorphism dark:glassmorphism-dark rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Your Links ({links.length})
        </h2>

        <div className="space-y-4">
          {links.map((link) => (
            <div
              key={link._id}
              className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {`https://link-shortener-jm7t.vercel.app/${link.shortCode}`}
                    </h3>
                    <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs rounded-full">
                      {link.clicks} clicks
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
                    {link.originalUrl}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    Created {new Date(link.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `https://link-shortener-jm7t.vercel.app/${link.shortCode}`,
                        link._id
                      )
                    }
                    className="p-2 bg-primary-100 dark:bg-primary-900/20 hover:bg-primary-200 dark:hover:bg-primary-900/40 rounded-lg transition-colors duration-200"
                    title="Copy short URL"
                  >
                    {copiedId === link._id ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-primary-600" />
                    )}
                  </button>

                  <a
                    href={link.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    title="Open original URL"
                  >
                    <ExternalLink className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </a>

                  <button
                    onClick={() => deleteLink(link._id)}
                    className="p-2 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 rounded-lg transition-colors duration-200"
                    title="Delete link"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
