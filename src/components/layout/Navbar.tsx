
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  if (!parts.length) return "U";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

function getDashboardHref(role?: string) {
  switch (role) {
    case "ORGANIZER":
      return "/dashboard/organizer";
    case "VOLUNTEER":
      return "/dashboard/volunteer";
    case "USER":
      return "/dashboard/user";
    default:
      return "/dashboard";
  }
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const role = (user as typeof user & { role?: string })?.role;
  const dashboardHref = getDashboardHref(role);

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!userMenuOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setUserMenuOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [userMenuOpen]);

  async function handleSignOut() {
    try {
      setSigningOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message || "Unable to sign out.");
      }

      setMenuOpen(false);
      setUserMenuOpen(false);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setSigningOut(false);
    }
  }

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
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/90 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8"
      >
        <Link
          href="/"
          aria-label="TogetherWeCan home"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm transition group-hover:bg-emerald-700">
            <HeartHandshake size={24} strokeWidth={2.2} />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-gray-950 sm:text-2xl">
            Together<span className="text-emerald-600">WeCan</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                isActive(link.href)
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div
              aria-hidden="true"
              className="h-11 w-44 animate-pulse rounded-xl bg-gray-100"
            />
          ) : user ? (
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((open) => !open)}
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
                  className={`text-gray-500 transition-transform ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
                >
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                    {role && (
                      <p className="mt-1 text-xs font-semibold text-emerald-700">
                        {role}
                      </p>
                    )}
                  </div>

                  <Link
                    href={dashboardHref}
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                  >
                    <LayoutDashboard size={16} />
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
                      <LoaderCircle size={16} className="animate-spin" />
                    ) : (
                      <LogOut size={16} />
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
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-xl p-2.5 text-gray-700 transition hover:bg-gray-100 md:hidden"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-gray-100 bg-white px-5 py-5 shadow-lg md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive(link.href)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 border-t border-gray-100 pt-4">
              {isPending ? (
                <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
              ) : user ? (
                <>
                  <div className="flex items-center gap-3 px-2">
                    {avatar}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Link
                      href={dashboardHref}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-3 text-sm font-semibold text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      <LayoutDashboard size={17} />
                      Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                    >
                      {signingOut ? (
                        <LoaderCircle size={17} className="animate-spin" />
                      ) : (
                        <LogOut size={17} />
                      )}
                      {signingOut ? "Signing out..." : "Log out"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
