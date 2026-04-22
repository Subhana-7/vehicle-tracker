import type { ReactNode } from "react";
import { Button } from "./Button";

type CardProps = {
  children:ReactNode;
  className?:string
}

export const LoginCard = ({ children }:CardProps) => (
  <div className="bg-white rounded-2xl shadow-lg w-full max-w-md sm:max-w-sm md:max-w-md p-6 sm:p-8 md:p-10">
    {children}
  </div>
);

export const Card = ({ children, className = "" }:CardProps) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

export const HeaderCard = ({ title, onNew }:any) => (
  <Card className="p-4 flex items-center justify-between">
    <span className="text-base font-semibold text-gray-800">{title}</span>
    <Button text="New" onClick={onNew} />
  </Card>
);


export const StatCard = ({ value, label, icon, color = "text-slate-800" }:any) => (
  <Card className="p-4 flex flex-col gap-2">
    <span className="text-lg">{icon}</span>
    <p className={`text-lg font-bold ${color}`}>{value}</p>
    <p className="text-xs text-gray-500 leading-tight">{label}</p>
  </Card>
);

export const StatsGrid = ({ stats }:any) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
    {stats.map((s:any) => (
      <StatCard key={s.id} {...s} />
    ))}
  </div>
);