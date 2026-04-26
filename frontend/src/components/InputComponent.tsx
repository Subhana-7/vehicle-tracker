export const LoginInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: any) => (
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
      className={`w-full px-4 py-2.5 text-sm rounded-lg bg-gray-50 border ${
        error ? "border-red-400" : "border-gray-200"
      } focus:outline-none focus:ring-2 ${
        error ? "focus:ring-red-300" : "focus:ring-blue-300"
      }`}
    />

    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
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
}: any) => (
  <div className="w-full">
    {label && (
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
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
