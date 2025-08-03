import Image from "next/image";
import BackToHomeButton from "../atoms/BackToHomeButton";

export default function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Logo Angkutin Tosca */}
      <div className="mb-8">
        <Image
          src="/assets/angkutin_tosca.png"
          alt="Angkut.in Logo"
          width={1000}
          height={1000}
          className="w-auto h-12"
          priority
        />
      </div>

      {/* Kurir Icon */}
      <div className="mb-8">
        <Image
          src="/assets/kurir.svg"
          alt="Kurir Icon"
          width={120}
          height={120}
          className="w-96 h-auto"
        />
      </div>

      {/* Success Message */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#016A70] mb-2">
          Order Success!
        </h1>
        <p className="text-gray-600 text-lg font-light">
          Your order has been successfully placed. We'll pick up your waste
          soon!
        </p>
      </div>

      {/* Back to Home Button */}
      <div className="mt-2">
        <BackToHomeButton />
      </div>
    </div>
  );
}
