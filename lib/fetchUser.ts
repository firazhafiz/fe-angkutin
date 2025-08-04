// lib/fetchUser.ts
import { User } from "../types/user";

export async function fetchUser(userId: string): Promise<User | null> {
  try {
    const response = await fetch(
      `https://angkutin.vercel.app/v1/user/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    } else {
      const data = await response.json();
      if (data.data && typeof data.data === "object") {
        return data.data as User;
      }
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}
