import { useState } from "react";

import { SpeedometerIcon } from "../components/SpeedoMeterIcon";
import { LoginCard } from "../components/CardComponent";
import { LoginInput } from "../components/InputComponent";
import { LoginButton } from "../components/Button";

import { AuthLayout } from "../components/AuthLayout";

// ─── Login Page ───────────────────────────────────────────────────────────────
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // TODO: integrate with backend auth API
    console.log("Sign in attempted:", { email, password });
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
            onChange={(e:any) => setEmail(e.target.value)}
          />
          <LoginInput
            id="password"
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e:any) => setPassword(e.target.value)}
          />
          <LoginButton text="Sign in" />
        </form>
      </LoginCard>
    </AuthLayout>
  );
};

export default LoginPage;