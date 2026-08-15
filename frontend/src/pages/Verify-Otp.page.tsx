import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import { SpeedometerIcon } from "../components/SpeedoMeterIcon";
import { LoginCard } from "../components/CardComponent";
import { LoginInput } from "../components/InputComponent";
import { LoginButton, Button } from "../components/Button";
import { AuthLayout } from "../components/AuthLayout";
import { resendOtp, verifyOtp } from "../services/auth.service";
import { useLocation, useNavigate } from "react-router-dom";
import { StatusModal } from "../components/StatusModal";
import axios from "axios";

type ModalState = {
  open: boolean;
  type: "error" | "success";
  message: string;
};

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email as string;

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");

  const [modal, setModal] = useState<ModalState>({
    open: false,
    type: "error",
    message: "",
  });

  // canResend is derived from timer
  const canResend = timer <= 0;

  useEffect(() => {
    if (timer <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const validate = () => {
    if (!otp) {
      setError("OTP is required");
      return false;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must be 6 digits");
      return false;
    }

    setError("");
    return true;
  };

  const handleVerify = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await verifyOtp({ email, otp });

      setModal({
        open: true,
        type: "success",
        message: "Verified successfully",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || "Invalid OTP"
        : "Invalid OTP";

      setModal({
        open: true,
        type: "error",
        message,
      });
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp(email);

      setTimer(30);
    } catch {
      alert("Failed to resend OTP");
    }
  };

  return (
    <AuthLayout>
      <LoginCard>
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <SpeedometerIcon />

          <span className="text-xl font-semibold text-gray-800 tracking-tight">
            Speedo
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Verify OTP</h2>

          <p className="text-sm text-gray-500 mt-1">
            Enter the OTP sent to your email
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} noValidate>
          <LoginInput
            id="otp"
            label="OTP"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setError("");
            }}
            error={error}
          />

          <LoginButton text="Verify" />
        </form>

        {/* Resend Section */}
        <div className="mt-5 text-center">
          {canResend ? (
            <Button
              text="Resend OTP"
              onClick={handleResend}
              variant="secondary"
            />
          ) : (
            <p className="text-sm text-gray-500">
              Resend in <span className="font-semibold">{timer}s</span>
            </p>
          )}
        </div>
      </LoginCard>

      <StatusModal
        isOpen={modal.open}
        onClose={() => {
          setModal({ ...modal, open: false });

          if (modal.type === "success") {
            navigate("/");
          }
        }}
        type={modal.type}
        message={modal.message}
      />
    </AuthLayout>
  );
};

export default VerifyOtpPage;
