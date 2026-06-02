import { useState } from "react";
import { FileUploadBox } from "./FileUpload";
import { Button } from "./Button";
import { uploadTripFile } from "../services/trip.service";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: () => void;
};

export const Modal = ({ isOpen, onClose, onUploadSuccess }: ModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      const res = await uploadTripFile(file);
      console.log("Upload success:", res);
      onUploadSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-100 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Upload Trip</h2>

        <FileUploadBox
          onFileSelect={(f) => {
            setFile(f);
            setError("");
          }}
          onError={setError}
          fileName={file?.name}
        />

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <Button
          text={loading ? "Uploading..." : "Upload"}
          onClick={handleUpload}
          disabled={!file || loading}
        />

        <Button text="Cancel" onClick={onClose} />
      </div>
    </div>
  );
};
