// components/organisms/OrderForm.tsx
import OrderAddressClient from "../moleculs/OrderAddressClient";
import BookingInformation from "../moleculs/BookingInformation";
import Link from "next/link";
import { Suspense } from "react";
// Hapus impor User karena tidak lagi digunakan
// import { User } from "../../types/user";

export default function OrderForm() {
  // Hapus prop user dari parameter
  return (
    <div className="w-full max-w-[750px] mx-auto bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-8 pb-6">
        <h1 className="text-3xl font-bold text-tosca mb-2">Order Form</h1>
        <p className="text-gray-600 text-sm">Manage your order and fill all the form section.</p>
      </div>

      {/* Form Content */}
      <div className="px-8 pb-8 space-y-6">
        <Suspense fallback={<div className="bg-gray-200 animate-pulse h-40 w-full rounded-lg"></div>}>
          <OrderAddressClient /> {/* Hapus prop user */}
        </Suspense>
        <BookingInformation />
        <Link href="/order/id">
          <button className="w-full bg-tosca text-white font-semibold py-3 text-md rounded-md shadow-md hover:bg-tosca/90 hover:shadow-lg transition-all duration-200">Place Order</button>
        </Link>
      </div>
    </div>
  );
}
