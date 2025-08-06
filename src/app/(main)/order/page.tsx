// app/(main)/order/page.tsx
import OrderForm from "../../../../components/organisms/OrderForm";
import { headers } from "next/headers";

// Preload function untuk address data
async function preloadAddressData() {
  try {
    const headersList = await headers();
    const token = headersList.get("authorization")?.replace("Bearer ", "");

    if (token) {
      // Preload address data in background
      fetch("https://angkutin.vercel.app/v1/address", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).catch(console.error); // Silent fail untuk preload
    }
  } catch (error) {
    // Silent fail untuk preload
  }
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const resolvedParams = await params;

  // Preload address data
  preloadAddressData();

  return (
    <main className="w-full relative min-h-screen bg-gray-100 overflow-hidden">
      <section className="max-w-6xl mx-auto mt-40 mb-20">
        <div className="flex justify-center">
          <OrderForm />
        </div>
      </section>
    </main>
  );
}
