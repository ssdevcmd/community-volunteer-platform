export type EventStatus = "DRAFT" | "PUBLISHED" | "CLOSED";

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  maxVolunteers: number;
  requiredSkills: string[];
  registrationDeadline: string;
  organizerId: string;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
}
