export const LoginInput = ({ id, label, type = "text", placeholder, value, onChange }:any) => (
  <div className="mb-5">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1.5 tracking-wide"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={type === "password" ? "current-password" : "email"}
      className="w-full px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200"
    />
  </div>
);

export const Input = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}:any) => (
  <div className="w-full">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
    )}
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200"
    />
  </div>
);