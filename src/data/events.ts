import type { CommunityEvent } from "@/types";

export const events: CommunityEvent[] = [
  {
    id: "1",
    title: "Community Tree Plantation",
    description:
      "Help us create a greener neighborhood by planting trees in local public spaces.",
    category: "Environment",
    date: "2026-11-05",
    location: "Narayanganj, Bangladesh",
    volunteersNeeded: 30,
    volunteersRegistered: 18,
    organizer: "Green Future Foundation",
    theme: "green",
  },
  {
    id: "2",
    title: "Free Education for All",
    description:
      "Support students through mentoring, learning activities, and educational resources.",
    category: "Education",
    date: "2026-11-10",
    location: "Dhaka, Bangladesh",
    volunteersNeeded: 25,
    volunteersRegistered: 12,
    organizer: "Bright Tomorrow",
    theme: "orange",
  },
  {
    id: "3",
    title: "Community Health Camp",
    description:
      "Help organize a local health awareness event and support community members.",
    category: "Health",
    date: "2026-11-15",
    location: "Chattogram, Bangladesh",
    volunteersNeeded: 40,
    volunteersRegistered: 27,
    organizer: "Healthy Communities",
    theme: "blue",
  },
];