type StatusModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type?: "success" | "error";
  title?: string;
  message?: string;
};

export const StatusModal = ({
  isOpen,
  onClose,
  type = "error",
  title,
  message,
}: StatusModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[320px] text-center space-y-3">
        <div
          className={`text-3xl ${type === "success" ? "text-green-500" : "text-red-500"}`}
        >
          {type === "success" ? "✓" : "X"}
        </div>

        <h3 className="text-lg font-semibold text-gray-800">
          {title || (type === "success" ? "Success" : "Error")}
        </h3>

        <p className="text-sm text-gray-600">{message}</p>

        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-slate-800 text-white rounded-md text-sm"
        >
          OK
        </button>
      </div>
    </div>
  );
};
