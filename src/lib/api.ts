import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is missing.");
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Authentication token is missing. Please log in again.");
  }

  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${data.token}`);

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    cache: options.cache ?? "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || `Request failed with status ${response.status}`,
    );
  }

  return result as T;
}
