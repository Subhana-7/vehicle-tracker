import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { SpeedometerIcon } from "../components/SpeedoMeterIcon";
import { LoginCard } from "../components/CardComponent";
import { LoginInput } from "../components/InputComponent";
import { LoginButton } from "../components/Button";
import { AuthLayout } from "../components/AuthLayout";
import { signupUser } from "../services/auth.service";

const SignupPage = () => {
 const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await signupUser({ name, email, password });

      // pass email to OTP page
      navigate("/verify-otp", { state: { email } });

    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
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
            id="name"
            label="Name"
            placeholder="Your name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />

          <LoginInput
            id="email"
            label="Email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />

          <LoginInput
            id="password"
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />

          <LoginButton text="Sign up" />
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-slate-800 hover:underline"
          >
            Login here
          </Link>
        </p>
      </LoginCard>
    </AuthLayout>
  );
};

export default SignupPage;