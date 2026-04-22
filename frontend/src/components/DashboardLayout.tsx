import type { ReactNode } from "react";
import { SpeedometerIcon } from "./SpeedoMeterIcon";

type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center px-4 sm:px-6 py-3 gap-2">
        <SpeedometerIcon />
        <span className="text-sm font-semibold text-gray-800 tracking-tight">
          Speedo
        </span>
      </div>
    </header>
    <main className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full space-y-4">
      {children}
    </main>
  </div>
);
