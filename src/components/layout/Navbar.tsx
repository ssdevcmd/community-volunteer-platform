"use client";

import Link from "next/link";
import { useState } from "react";
import { HeartHandshake, Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Events", href: "/events" },
  { label: "About Us", href: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <HeartHandshake size={23} />
          </span>

          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            Together<span className="text-emerald-600">WeCan</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-medium text-gray-700 hover:text-emerald-700"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 flex gap-3 border-t border-gray-100 pt-4">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-center font-semibold"
              >
                Log in
              </Link>

              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-center font-semibold text-white"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
