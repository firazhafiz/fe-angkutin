import { MdEdit } from "react-icons/md";
import BookingForm from "../atoms/BookingForm";

export default function BookingInformation() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <MdEdit className="text-tosca text-xl" />
        <h2 className="text-xl font-bold text-tosca">Booking Information</h2>
      </div>

      {/* Form */}
      <BookingForm />
    </div>
  );
}
