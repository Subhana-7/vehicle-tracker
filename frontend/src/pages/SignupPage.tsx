import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { SpeedometerIcon } from "../components/SpeedoMeterIcon";
import { LoginCard } from "../components/CardComponent";
import { LoginInput } from "../components/InputComponent";
import { LoginButton } from "../components/Button";
import { AuthLayout } from "../components/AuthLayout";
import { signupUser } from "../services/auth.service";
import { StatusModal } from "../components/StatusModal";

const SignupPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [modal, setModal] = useState({
    open: false,
    type: "error",
    message: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await signupUser({ name, email, password });
      navigate("/verify-otp", { state: { email } });
    } catch (err: any) {
      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (status === 409) {
        setModal({
          open: true,
          type: "error",
          message: message || "User already exists",
        });
      } else {
        setModal({
          open: true,
          type: "error",
          message: message || "Signup failed",
        });
      }
    }
  };

  const validate = () => {
    const newErrors: any = {};

    if (!name) newErrors.name = "Name is required";
    else if (name.length < 2) newErrors.name = "Minimum 2 characters";

    if (!email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Minimum 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
            id="name"
            label="Name"
            placeholder="Your name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            error={errors.name}
          />

          <LoginInput
            id="email"
            label="Email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            error={errors.email}
          />

          <LoginInput
            id="password"
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            error={errors.password}
          />

          <LoginButton text="Sign up" />
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <Link to="/" className="font-semibold text-slate-800 hover:underline">
            Login here
          </Link>
        </p>
      </LoginCard>
      <StatusModal
        isOpen={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        type={modal.type as any}
        message={modal.message}
      />
    </AuthLayout>
  );
};

export default SignupPage;
