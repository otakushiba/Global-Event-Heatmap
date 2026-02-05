
import React from 'react';
import { MapMode } from '../types';
import { Flame, Layers, ShieldAlert } from 'lucide-react';

interface ModeSwitcherProps {
  currentMode: MapMode;
  setMode: (mode: MapMode) => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ currentMode, setMode }) => {
  const modes = [
    { id: MapMode.HEAT, icon: <Flame className="w-4 h-4" />, color: 'text-orange-500' },
    { id: MapMode.CATEGORY, icon: <Layers className="w-4 h-4" />, color: 'text-blue-500' },
    { id: MapMode.RISK, icon: <ShieldAlert className="w-4 h-4" />, color: 'text-red-500' },
  ];

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#161B22]/90 backdrop-blur-xl border border-[#30363D] p-1.5 rounded-2xl shadow-2xl flex items-center gap-1 z-50">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
            currentMode === m.id
              ? 'bg-[#30363D] text-white shadow-lg'
              : 'text-[#8B949E] hover:text-white hover:bg-[#21262D]'
          }`}
        >
          <span className={currentMode === m.id ? m.color : ''}>{m.icon}</span>
          {m.id}
        </button>
      ))}
    </div>
  );
};

export default ModeSwitcher;
