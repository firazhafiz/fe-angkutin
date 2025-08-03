import { FcGoogle } from "react-icons/fc";

interface GoogleAuthProps {
  text?: string;
}

export default function GoogleAuth({
  text = "Sign up with Google",
}: GoogleAuthProps) {
  const handleGoogleAuth = () => {
    // Handle Google authentication logic here
    console.log("Google auth clicked");
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
    >
      <FcGoogle className="w-5 h-5" />
      <span>{text}</span>
    </button>
  );
}
