type ButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  className?: string;
};

type ButtonVariant = "primary" | "secondary" | "open" | "danger" | "ghost";
type ButtonSize = "sm" | "md";

export const LoginButton = ({ text, onClick }:ButtonProps) => (
  <button
    type="submit"
    onClick={onClick}
    className="w-full py-2.5 px-4 mt-1 text-sm font-semibold text-white bg-slate-800 rounded-lg hover:bg-slate-700 active:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 transition duration-200 tracking-wide cursor-pointer"
  >
    {text}
  </button>
);


export const Button = ({
  text,
  onClick,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
}: ButtonProps) => {
  const base =
    "font-semibold rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer";

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-5 py-2 text-sm",
  };

  const variants = {
    primary:   "bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-500",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300",
    open:      "bg-slate-600 text-white hover:bg-slate-500 focus:ring-slate-400",
    danger:    "bg-white text-red-500 border border-gray-300 hover:bg-red-50 focus:ring-red-300",
    ghost:     "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 focus:ring-gray-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {text}
    </button>
  );
};