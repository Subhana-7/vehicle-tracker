import { useRef } from "react";

export const UploadIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 16V4M12 4L8 8M12 4L16 8" />
    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
  </svg>
);

export const FileUploadBox = ({ onFileSelect, fileName }:any) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e:any) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      onFileSelect?.(file);
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="w-full border border-blue-400 rounded-lg py-8 px-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-blue-50 transition duration-200"
    >
      <UploadIcon />
      {fileName ? (
        <p className="text-sm text-blue-600 font-medium">{fileName}</p>
      ) : (
        <p className="text-sm text-blue-500 text-center">
          Click here to upload the{" "}
          <span className="underline font-semibold">Excel</span>{" "}
          sheet of your trip
        </p>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={handleChange}
        aria-label="Upload Excel file"
      />
    </div>
  );
};