export type EventType = {
  id: number;
  title: string;
  banner: string;
  description: string;
  start_date: string;
  end_date: string;
};

interface ApiResponse {
  data: EventType[];
  message?: string;
}

export async function fetchEvent(): Promise<EventType | null> {
  try {
    const res = await fetch("https://angkutin.vercel.app/v1/event", {
      cache: "no-store", // Ensure fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch event: ${res.status}`);
    }

    const result: ApiResponse = await res.json();
    
    if (Array.isArray(result.data) && result.data.length > 0) {
      return result.data[0]; // Return first event
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
} 