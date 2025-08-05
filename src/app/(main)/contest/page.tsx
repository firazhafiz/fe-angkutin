import Games from "../../../../components/organisms/Games";
import { fetchEvent } from "../../../../lib/fetchEvent";

export default async function ContestPage() {
  // Fetch event data on server-side for better performance
  const eventData = await fetchEvent();

  return (
    <main className="w-full relative min-h-screen bg-gray-100 overflow-hidden">
      <section className="max-w-6xl mx-auto mt-40 mb-20">
        <Games initialEventData={eventData} />
      </section>
    </main>
  );
}
