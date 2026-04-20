import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-green-200 via-teal-100 to-blue-300">
    {children}
  </div>
);
