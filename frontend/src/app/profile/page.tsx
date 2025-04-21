"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cardStyle, gradientText, typography } from "@/lib/theme";
import { ThemedButton } from "@/components/ui/theme-button";
import { User, Mail, LogOut } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
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

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-emerald-500 border-opacity-75"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      <main className="pt-36 px-6 pb-12 max-w-3xl mx-auto">
        <div className={cardStyle("p-8 text-center")}>
          <div className="mb-6">
            <h1 className={`text-4xl font-bold ${typography.fontFamily.heading}`}>
              Hello, <span className={gradientText()}>{user?.name}</span>
            </h1>
            <p className="text-gray-400 mt-2">{user?.email}</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <User className="h-4 w-4 text-emerald-400" />
              <span>Name:</span>
              <span className="text-white font-medium">{user?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Mail className="h-4 w-4 text-cyan-400" />
              <span>Email:</span>
              <span className="text-white font-medium">{user?.email}</span>
            </div>
          </div>

          <ThemedButton
            themeVariant="outline"
            icon={<LogOut className="h-5 w-5" />}
            className="mt-8"
            onClick={handleLogout}
          >
            Log out
          </ThemedButton>
        </div>
      </main>
    </div>
  );
}
