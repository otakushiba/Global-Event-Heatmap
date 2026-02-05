
import React from 'react';
import { FilterState, EventCategory, HeatSource } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { X, Check } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isOpen: boolean;
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters, isOpen, onClose }) => {
  const toggleCategory = (cat: EventCategory) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  return (
    <aside className={`fixed top-16 left-0 bottom-0 w-72 bg-[#161B22] border-r border-[#30363D] z-40 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl`}>
      <div className="p-6 h-full flex flex-col overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#8B949E]">System Filters</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#30363D] rounded transition-colors lg:hidden">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-white mb-4">EVENT CATEGORIES</h3>
          <div className="space-y-2">
            {Object.values(EventCategory).map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                  filters.categories.includes(cat)
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-transparent border-transparent hover:bg-[#21262D]'
                }`}
              >
                <div 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: CATEGORY_COLORS[cat] }} 
                />
                <span className={`text-sm flex-1 text-left ${filters.categories.includes(cat) ? 'text-white' : 'text-[#8B949E]'}`}>
                  {cat}
                </span>
                {filters.categories.includes(cat) && <Check className="w-4 h-4 text-blue-500" />}
              </button>
            ))}
          </div>
        </div>

        {/* Heat Source */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-white mb-4">HEAT SOURCE</h3>
          <div className="grid grid-cols-1 gap-2">
            {Object.values(HeatSource).map((source) => (
              <button
                key={source}
                onClick={() => setFilters(prev => ({ ...prev, source }))}
                className={`text-sm px-4 py-2.5 rounded-lg border transition-all text-left ${
                  filters.source === source
                    ? 'bg-[#30363D] border-[#8B949E] text-white'
                    : 'bg-transparent border-[#30363D] text-[#8B949E] hover:border-[#8B949E]/50'
                }`}
              >
                {source} Analysis
              </button>
            ))}
          </div>
        </div>

        {/* Time Range */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-white mb-4">TIME RANGE</h3>
          <div className="flex bg-[#0D1117] p-1 rounded-lg border border-[#30363D]">
            {(['24h', '7d', '30d'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilters(prev => ({ ...prev, timeRange: t }))}
                className={`flex-1 py-1.5 text-xs font-medium rounded transition-all ${
                  filters.timeRange === t ? 'bg-[#30363D] text-white shadow-sm' : 'text-[#8B949E]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div className="mt-auto pt-6 border-t border-[#30363D]">
          <h3 className="text-xs font-semibold text-white mb-4">GEO REGION</h3>
          <select 
            value={filters.region}
            onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value as any }))}
            className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
          >
            <option value="global">Global View</option>
            <option value="north-america">North America</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="africa">Africa</option>
          </select>
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
