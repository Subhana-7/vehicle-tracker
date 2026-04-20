import { Card } from "./CardComponent";
import { NextIcon, PrevIcon } from "./Pagination";

type Tab = {
  id: string;
  name: string;
};

type TabsProps = {
  tabs: Tab[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export const Tabs = ({ tabs, activeId, onSelect }:TabsProps) => (
  <Card className="px-2 py-1">
    <div className="flex gap-1 overflow-x-auto">
      <button className="shrink-0 px-2 py-2 text-gray-400 hover:text-gray-600 transition cursor-pointer">
        <PrevIcon />
      </button>
      {tabs.map((tab:any) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`shrink-0 px-3 py-2 text-sm font-medium border-b-2 transition-all duration-150 cursor-pointer whitespace-nowrap focus:outline-none
            ${tab.id === activeId
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
        >
          {tab.name}
        </button>
      ))}
      <button className="shrink-0 px-2 py-2 text-gray-400 hover:text-gray-600 transition cursor-pointer">
        <NextIcon />
      </button>
    </div>
  </Card>
);