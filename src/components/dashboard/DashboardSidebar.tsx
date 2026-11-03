
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  LayoutDashboard,
  User,
  CalendarDays,
  PlusCircle,
  Users,
  ClipboardList,
  Settings,
  LogOut,
  HeartHandshake,
  Menu,
  X,
  CalendarCheck,
} from "lucide-react";

type Role = "USER" | "VOLUNTEER" | "ORGANIZER";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const navigation: Record<Role, NavItem[]> = {
  USER: [
    {
      label: "Dashboard",
      href: "/dashboard/user",
      icon: LayoutDashboard,
    },
    {
      label: "Browse Events",
      href: "/events",
      icon: CalendarDays,
    },
    {
      label: "My Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ],

  VOLUNTEER: [
    {
      label: "Dashboard",
      href: "/dashboard/volunteer",
      icon: LayoutDashboard,
    },
    {
      label: "Browse Events",
      href: "/events",
      icon: CalendarDays,
    },
    {
      label: "My Registrations",
      href: "/dashboard/volunteer/registrations",
      icon: ClipboardList,
    },
    {
      label: "My Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ],

  ORGANIZER: [
    {
      label: "Dashboard",
      href: "/dashboard/organizer",
      icon: LayoutDashboard,
    },
    {
      label: "Create Event",
      href: "/dashboard/organizer/create-event",
      icon: PlusCircle,
    },
    {
      label: "Manage Events",
      href: "/dashboard/organizer/events",
      icon: CalendarDays,
    },
    {
      label: "Volunteers",
      href: "/dashboard/organizer/volunteers",
      icon: Users,
    },
    {
      label: "My Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ],
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const role = (
    ["USER", "VOLUNTEER", "ORGANIZER"].includes(
      user?.role?.toUpperCase() ?? "",
    )
      ? user?.role?.toUpperCase()
      : "USER"
  ) as Role;

  const navItems = navigation[role];

  const handleLogout = async () => {
    await authClient.signOut();
    router.replace("/");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/events") {
      return pathname === "/events";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const sidebarContent = (
    <aside className="flex min-h-full w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="border-b border-gray-100 p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-600 p-2 text-white">
            <HeartHandshake size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              CommunityHub
            </h2>
            <p className="text-xs text-gray-500">
              Volunteer Platform
            </p>
          </div>
        </Link>
      </div>

      {/* User Information */}
      <div className="border-b border-gray-100 p-5">
        {isPending ? (
          <p className="text-sm text-gray-500">Loading profile...</p>
        ) : (
          <>
            <h3 className="truncate font-semibold text-gray-900">
              {user?.name ?? "Community Member"}
            </h3>

            <p className="mt-1 truncate text-sm text-gray-500">
              {user?.email ?? ""}
            </p>

            <span className="mt-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {role}
            </span>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              <Icon size={19} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-100 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white p-4 lg:hidden">
        <Link href="/" className="text-lg font-bold text-emerald-700">
          CommunityHub
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <div className="relative h-full w-64">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden min-h-screen lg:fixed lg:inset-y-0 lg:left-0 lg:block">
        {sidebarContent}
      </div>
    </>
  );
}
