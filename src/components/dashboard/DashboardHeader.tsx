"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell, ChevronDown, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type DashboardHeaderProps = {
    onMenuClick?: () => void;
};

const pageInfo: Record<string, { title: string; subtitle: string }> = {
    "/dashboard/user": {
        title: "Dashboard",
        subtitle: "Explore events and manage your activity.",
    },
    "/dashboard/volunteer": {
        title: "Volunteer Dashboard",
        subtitle: "Track your registrations and volunteering activities.",
    },
    "/dashboard/organizer": {
        title: "Organizer Dashboard",
        subtitle: "Manage your events and volunteers.",
    },
};

export default function DashboardHeader({
    onMenuClick,
}: DashboardHeaderProps) {
    const pathname = usePathname();
    const { data: session } = authClient.useSession();
    const [profileOpen, setProfileOpen] = useState(false);

    const currentPage =
        pageInfo[pathname] ??
        (pathname.includes("/create-event")
            ? {
                title: "Create Event",
                subtitle: "Create and publish a new community event.",
            }
            : pathname.includes("/events")
                ? {
                    title: "Manage Events",
                    subtitle: "View and manage your community events.",
                }
                : {
                    title: "Dashboard",
                    subtitle: "Welcome to your dashboard.",
                });

    const user = session?.user;

    return (
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
            <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left section */}
                <div className="flex items-center gap-3">
                    {onMenuClick && (
                        <button
                            type="button"
                            onClick={onMenuClick}
                            aria-label="Open sidebar"
                            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
                        >
                            <Menu size={23} />
                        </button>
                    )}

                    <div>
                        <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
                            {currentPage.title}
                        </h1>
                        <p className="hidden text-sm text-gray-500 sm:block">
                            {currentPage.subtitle}
                        </p>
                    </div>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3 sm:gap-5">
                    {/* Notifications */}
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
                    >
                        <Bell size={21} />
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                    </button>

                    {/* Profile */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setProfileOpen((prev) => !prev)}
                            className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-gray-100"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600">
                                <UserRound size={19} />
                            </div>

                            <div className="hidden text-left sm:block">
                                <p className="max-w-32 truncate text-sm font-semibold text-gray-800">
                                    {user?.name ?? "User"}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {user?.role ?? "USER"}
                                </p>
                            </div>

                            <ChevronDown size={16} className="hidden text-gray-500 sm:block" />
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                                <p className="truncate text-sm font-semibold text-gray-800">
                                    {user?.name ?? "User"}
                                </p>
                                <p className="truncate text-xs text-gray-500">
                                    {user?.email ?? ""}
                                </p>

                                <div className="my-3 border-t border-gray-100" />

                                <button
                                    type="button"
                                    onClick={() => setProfileOpen(false)}
                                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                                >
                                    My Profile
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
