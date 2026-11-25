export type VolunteerApplicationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface VolunteerApplication {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  motivation: string;
  skills: string[];
  status: VolunteerApplicationStatus;
  submittedAt: string;
  updatedAt: string;
}
