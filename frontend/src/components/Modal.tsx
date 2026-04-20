import { useState } from "react";
import { Input } from "./InputComponent";
import { FileUploadBox } from "./FileUpload";
import { Button } from "./Button";

export const Modal = ({ isOpen, onClose }:any) => {
  const [tripName, setTripName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSave = () => {
    console.log("Save clicked:");
    // TODO: integrate with backend API
  };

  const handleCancel = () => {
    setTripName("");
    setSelectedFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center min-h-screen px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Upload Trip Modal"
      onClick={(e) => e.target === e.currentTarget && handleCancel()}
    >
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg sm:max-w-md p-6 sm:p-8">
        {/* Close button */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition text-xl leading-none focus:outline-none cursor-pointer"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="flex flex-col gap-4 mt-2">
          {/* Trip Name Input */}
          <Input
            id="trip-name"
            placeholder="Trip Name*"
            value={tripName}
            onChange={(e:any) => setTripName(e.target.value)}
            required
          />

          {/* File Upload */}
          <FileUploadBox
            onFileSelect={setSelectedFile}
            fileName={selectedFile}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <Button
              text="Cancel"
              variant="secondary"
              onClick={handleCancel}
              className="w-full sm:w-1/2"
            />
            <Button
              text="Save"
              variant="primary"
              onClick={handleSave}
              className="w-full sm:w-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
