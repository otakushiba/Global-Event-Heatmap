
import React from 'react';
import { Search, SlidersHorizontal, Map as MapIcon, ShieldAlert, Layers } from 'lucide-react';
import { UI_COLORS } from '../constants';

interface HeaderProps {
  onSearch: (term: string) => void;
  toggleFilters: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, toggleFilters }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0D1117]/80 backdrop-blur-md border-b border-[#30363D] flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
          <MapIcon className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white leading-none">GLOBAL EVENT</h1>
          <p className="text-[10px] font-semibold text-blue-500 tracking-widest uppercase">Heatmap v1.0</p>
        </div>
      </div>

      <div className="flex-1 max-w-xl px-12">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B949E] group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search global events, locations, or keywords..."
            className="w-full bg-[#161B22] border border-[#30363D] rounded-full py-2.5 pl-11 pr-4 text-sm text-white placeholder-[#8B949E] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleFilters}
          className="flex items-center gap-2 bg-[#161B22] border border-[#30363D] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#21262D] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-blue-500" />
          <span>Filters</span>
        </button>
        <div className="flex items-center gap-2 border-l border-[#30363D] pl-4">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <ShieldAlert className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-xs font-semibold text-[#8B949E]">Status: <span className="text-green-500">Live</span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
