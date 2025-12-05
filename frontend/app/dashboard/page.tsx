"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "./components/DashboardNavbar";
import LinkShortener from "./components/LinkShortener";
import LinksList from "./components/LinksList";
import Analytics from "./components/Analytics";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("create");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/auth/login");
      return;
    }

    setUser(JSON.parse(userData));
    fetchLinks();
  }, [router]);

  const fetchLinks = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = "https://link-shortenerfix.vercel.app";
      const response = await axios.get(`${apiUrl}/links`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLinks(response.data);
    } catch (error) {
      console.error("Error fetching links:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-600/10 blur-3xl"></div>

        <div className="relative z-10">
          <DashboardNavbar user={user} onLogout={handleLogout} />

          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Tab Navigation */}
            <div className="glassmorphism dark:glassmorphism-dark rounded-2xl p-2 mb-8 inline-flex">
              <button
                onClick={() => setActiveTab("create")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === "create"
                    ? "bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
              >
                Create Link
              </button>
              <button
                onClick={() => setActiveTab("manage")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === "manage"
                    ? "bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
              >
                My Links
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === "analytics"
                    ? "bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
              >
                Analytics
              </button>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
              {activeTab === "create" && (
                <LinkShortener onLinkCreated={fetchLinks} />
              )}
              {activeTab === "manage" && (
                <LinksList links={links} onLinksUpdate={fetchLinks} />
              )}
              {activeTab === "analytics" && <Analytics links={links} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
