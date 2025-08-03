import OrderAddress from "../moleculs/OrderAddress";
import BookingInformation from "../moleculs/BookingInformation";

export default function OrderForm() {
  return (
    <div className="w-full max-w-[750px] mx-auto bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-8 pb-6">
        <h1 className="text-3xl font-bold text-tosca mb-2">Order Form</h1>
        <p className="text-gray-600 text-sm">
          Manage your order and fill all the form section.
        </p>
      </div>

      {/* Form Content */}
      <div className="px-8 pb-8 space-y-6">
        <OrderAddress />
        <BookingInformation />
        <button className="w-full bg-tosca text-white font-semibold py-3 text-md rounded-md shadow-md hover:bg-tosca/90 hover:shadow-lg transition-all duration-200">
          Place Order
        </button>
      </div>

      {/* Place Order Button */}
    </div>
  );
}
