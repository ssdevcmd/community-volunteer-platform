"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  HeartHandshake,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Events", href: "/events" },
  { label: "About Us", href: "/about" },
];

function getInitials(name?: string | null) {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const [userMenuOpen, setUserMenuOpen] = useState(false); // desktop dropdown
  const [signingOut, setSigningOut] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close the desktop dropdown on outside click or Escape
  useEffect(() => {
    if (!userMenuOpen) return;

    const onMouseDown = (event: MouseEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) setUserMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setUserMenuOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [userMenuOpen]);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setUserMenuOpen(false);
            setMenuOpen(false);
            router.push("/login");
            router.refresh(); // make server components re-read the (now empty) session
          },
        },
      });
    } finally {
      setSigningOut(false);
    }
  }

  // Photo if available, initials otherwise (initials stay underneath if the image fails to load)
  const avatar = user && (
    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
      {getInitials(user.name)}
      {user.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.image}
          alt=""
          referrerPolicy="no-referrer"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </span>
  );

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

        {/* Desktop right side: skeleton -> user dropdown -> login buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div aria-hidden="true" className="h-11 w-44 animate-pulse rounded-xl bg-gray-100" />
          ) : user ? (
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((value) => !value)}
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-3 transition hover:border-emerald-600"
              >
                {avatar}
                <span className="max-w-[9rem] truncate text-sm font-medium text-gray-800">
                  {user.name}
                </span>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`text-gray-500 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
                >
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="truncate text-xs text-gray-500">{user.email}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                  >
                    <LayoutDashboard size={16} aria-hidden="true" />
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                  >
                    {signingOut ? (
                      <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                    ) : (
                      <LogOut size={16} aria-hidden="true" />
                    )}
                    {signingOut ? "Signing out..." : "Log out"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
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

            {/* Mobile bottom area: user info + actions, or login buttons */}
            {!isPending &&
              (user ? (
                <div className="mt-2 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-3">
                    {avatar}
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-gray-900">{user.name}</p>
                      <p className="truncate text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 font-semibold"
                    >
                      <LayoutDashboard size={16} aria-hidden="true" />
                      Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-600 disabled:opacity-60"
                    >
                      <LogOut size={16} aria-hidden="true" />
                      {signingOut ? "Signing out..." : "Log out"}
                    </button>
                  </div>
                </div>
              ) : (
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
              ))}
          </div>
        </div>
      )}
    </header>
  );
}
