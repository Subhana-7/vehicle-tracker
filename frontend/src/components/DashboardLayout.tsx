import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { SpeedometerIcon } from "./SpeedoMeterIcon";
import { Button } from "./Button";
import { useAuthStore } from "../store/auth.store";
import { logoutUser } from "../services/auth.service";

type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

const handleLogout = async () => {
  try {
    await logoutUser(); // ✅ clears cookies from backend
  } catch (err) {
    console.log("Logout failed");
  }

  logout(); // Zustand
  navigate("/");
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <SpeedometerIcon />
            <span className="text-sm font-semibold text-gray-800 tracking-tight">
              Speedo
            </span>
          </div>

          {/* Right: Logout */}
          <Button
            text="Logout"
            onClick={handleLogout}
            variant="danger"
            size="sm"
          />
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full space-y-4">
        {children}
      </main>
    </div>
  );
};