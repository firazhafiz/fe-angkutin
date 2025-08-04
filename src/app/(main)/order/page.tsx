// app/(main)/order/page.tsx
import OrderForm from "../../../../components/organisms/OrderForm";

export default function OrderPage({ params }: { params: { userId: string } }) {
  // Hapus fetchUser karena data diambil dari localStorage di OrderAddress
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
