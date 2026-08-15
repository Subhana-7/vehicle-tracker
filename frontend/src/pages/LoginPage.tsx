import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { SpeedometerIcon } from "../components/SpeedoMeterIcon";
import { LoginCard } from "../components/CardComponent";
import { LoginInput } from "../components/InputComponent";
import { LoginButton } from "../components/Button";
import { AuthLayout } from "../components/AuthLayout";
import { useAuthStore } from "../store/auth.store";
import { StatusModal } from "../components/StatusModal";

type LoginErrors = {
  email?: string;
  password?: string;
};

type ModalState = {
  open: boolean;
  type: "error" | "success";
  message: string;
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<LoginErrors>({});

  const [modal, setModal] = useState<ModalState>({
    open: false,
    type: "error",
    message: "",
  });

  const login = useAuthStore((s) => s.login);

  const validate = () => {
    const newErrors: LoginErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Minimum 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || "Login failed"
        : "Login failed";

      setModal({
        open: true,
        type: "error",
        message,
      });
    }
  };

  return (
    <AuthLayout>
      <LoginCard>
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <SpeedometerIcon />

          <span className="text-xl font-semibold text-gray-800 tracking-tight">
            Speedo
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <LoginInput
            id="email"
            label="Email"
            type="email"
            placeholder="Example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <LoginInput
            id="password"
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <LoginButton text="Sign in" />
        </form>

        {/* Signup Link */}
        <p className="text-sm text-center text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-slate-800 hover:underline"
          >
            Sign up here
          </Link>
        </p>
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

export default LoginPage;
