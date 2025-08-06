type Props = {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
};

export default function RegisterForm({ formData, onChange }: Props) {
  return (
    <form className="w-full space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-md font-medium text-gray-700 mb-2"
        >
          Fullname
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Input your fullname"
          className="w-full px-3 py-2 border text-sm text-black-100 placeholder:text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca"
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-md font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Input your email"
          className="w-full px-3 py-2 border text-sm text-black-100 placeholder:text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-md font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Input your password"
          className="w-full px-3 py-2 border text-sm text-black-100 placeholder:text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca"
          required
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-md font-medium text-gray-700 mb-2"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onChange}
          placeholder="Repeat your password"
          className="w-full px-3 py-2 border text-sm text-black-100 placeholder:text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca"
          required
        />
      </div>
    </form>
  );
}
