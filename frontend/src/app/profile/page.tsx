"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { LogOut, UploadCloud } from "lucide-react";
import { ThemedButton } from "@/components/ui/theme-button";
import { cardStyle, gradientText, typography } from "@/lib/theme";

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          router.push("/login");
        });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleUploadClick = () => {
    router.push("/profile/upload");
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-emerald-500 border-opacity-75"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      <main className="pt-36 px-6 pb-12 max-w-md mx-auto">
        <div className={cardStyle("p-8 text-center flex flex-col items-center")}>
          <div className="relative group w-24 h-24">
            <Image
              src={user?.avatar || "/profile.svg"}
              alt="Profile"
              fill
              className="rounded-full object-cover border border-gray-700 shadow-md"
            />
            <button
              onClick={handleUploadClick}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity"
              title="Upload New Picture"
            >
              <UploadCloud className="text-white h-5 w-5" />
            </button>
          </div>

          <h1 className={`text-3xl font-semibold mt-6 ${typography.fontFamily.heading}`}>
            Hello, <span className={gradientText()}>{user?.name}</span>
          </h1>
          <p className="text-gray-400 mt-1">{user?.email}</p>

          <div className="flex flex-col gap-4 mt-8 w-full">
            <ThemedButton
              themeVariant="outline"
              icon={<LogOut className="h-5 w-5" />}
              onClick={handleLogout}
              className="w-full flex items-center justify-center"
            >
              Log out
            </ThemedButton>
          </div>
        </div>
      </main>
    </div>
  );
}
