"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import Link from "next/link";
import { User, Wallet, LayoutGrid, LogOut, PlusSquare } from "lucide-react";

export function ProtectedLayoutWrapper({ children }: { children: ReactNode }) {
  const { token, user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) {
      router.push("/login");
    }
  }, [token, isLoading, router]);

  if (isLoading || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-zinc-200 border-t-black rounded-full animate-spin" />
          <span className="meta-label animate-pulse text-zinc-400">
            Verifying Identity...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      {/* Persistent Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center group">
            <span className="text-xl md:text-2xl font-serif tracking-tight font-medium uppercase leading-none text-black">
              Aureus
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link href="/auctions" className="nav-link flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" />
              Gallery
            </Link>
            {user?.role === "SELLER" && (
              <Link href="/seller" className="nav-link flex items-center gap-2">
                <PlusSquare className="w-4 h-4" />
                Sell
              </Link>
            )}
            <Link href="/wallet" className="nav-link flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Vault
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => logout()}
              className="nav-link flex items-center gap-2 text-zinc-400 hover:text-black transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 md:pt-32">{children}</main>

      {/* Persistent Footer */}
      <footer className="py-12 md:py-16 border-t border-zinc-100 mt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <span className="meta-label">Aureus International</span>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium">
              © 2026 Institutional Auctions
            </p>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="meta-label hover:text-black">
              Privacy
            </Link>
            <Link href="#" className="meta-label hover:text-black">
              Terms
            </Link>
            <Link href="#" className="meta-label hover:text-black">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
