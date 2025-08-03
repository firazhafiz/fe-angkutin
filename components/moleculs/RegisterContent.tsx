import RegisterForm from "../atoms/RegisterForm";
import GoogleAuth from "../atoms/GoogleAuth";
import Link from "next/link";

export default function RegisterContent() {
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle register logic here
    console.log("Register button clicked");
  };

  return (
    <div className="w-[570px] bg-white rounded-lg shadow-sm p-8">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
        Register
      </h1>

      {/* Register Form */}
      <RegisterForm />

      {/* Register Button */}
      <button
        onClick={handleRegister}
        className="w-full bg-tosca text-white font-semibold py-3 rounded-md hover:bg-tosca/90 transition-colors mt-4"
      >
        Register
      </button>

      {/* OR Separator */}
      <div className="flex items-center justify-center my-4">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Google Auth */}
      <GoogleAuth text="Sign up with Google" />

      {/* Sign In Link */}
      <p className="text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-tosca font-semibold hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
