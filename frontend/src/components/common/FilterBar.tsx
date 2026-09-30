import React from 'react';
import { Filter } from 'lucide-react';

export interface FilterItem {
  id: string;
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
}

export interface FilterBarProps {
  filters: FilterItem[];
  onReset?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onReset }) => {
  return (
    <div className="flex items-center gap-3 flex-wrap py-2">
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Filter className="w-3.5 h-3.5" />
        <span>Filters:</span>
      </div>
      {filters.map((filter) => (
        <select
          key={filter.id}
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
        >
          {filter.options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900">
              {filter.label}: {opt.label}
            </option>
          ))}
        </select>
      ))}
      {onReset && (
        <button
          onClick={onReset}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium px-2 py-1"
        >
          Reset
        </button>
      )}
    </div>
  );
};
