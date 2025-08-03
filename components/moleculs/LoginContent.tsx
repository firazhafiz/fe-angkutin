import LoginForm from "../atoms/LoginForm";
import GoogleAuth from "../atoms/GoogleAuth";
import Link from "next/link";

export default function LoginContent() {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login button clicked");
  };

  return (
    <div className="w-[500px] h-auto bg-white rounded-lg shadow-sm p-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-black-100 text-center mb-8 font">
        Login
      </h1>

      {/* Login Form */}
      <LoginForm />

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="w-full bg-tosca text-white font-semibold py-3 rounded-md hover:bg-tosca/90 transition-colors mt-6"
      >
        Login
      </button>

      {/* OR Separator */}
      <div className="flex items-center justify-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Google Auth */}
      <GoogleAuth text="Sign up with Google" />

      {/* Sign Up Link */}
      <p className="text-center mt-6 text-gray-600">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-tosca font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
