// app/(main)/order/page.tsx
import OrderForm from "../../../../components/organisms/OrderForm";

export default function OrderPage() {
  // Preload address data

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
