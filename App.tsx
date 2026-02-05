
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import WorldMap from './components/WorldMap';
import FilterPanel from './components/FilterPanel';
import DetailPanel from './components/DetailPanel';
import ModeSwitcher from './components/ModeSwitcher';
import { MOCK_EVENTS } from './mockData';
import { FilterState, EventCategory, HeatSource, MapMode, GlobalEvent } from './types';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    categories: Object.values(EventCategory),
    source: HeatSource.COMBINED,
    timeRange: '24h',
    region: 'global',
  });

  const [mapMode, setMapMode] = useState<MapMode>(MapMode.HEAT);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedEvent = MOCK_EVENTS.find(e => e.id === selectedEventId) || null;

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredEvents = MOCK_EVENTS.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm) || 
                          e.summary.toLowerCase().includes(searchTerm) ||
                          e.locations.some(l => l.toLowerCase().includes(searchTerm));
    return matchesSearch;
  });

  return (
    <div className="relative w-screen h-screen bg-[#0D1117] text-[#E6EDF3] select-none">
      {/* HUD Layer */}
      <Header 
        onSearch={handleSearch} 
        toggleFilters={() => setIsFilterPanelOpen(!isFilterPanelOpen)} 
      />
      
      {/* Sidebar - Filters */}
      <FilterPanel 
        filters={filters} 
        setFilters={setFilters} 
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
      />

      {/* Main Map View */}
      <main className="w-full h-full relative">
        <WorldMap 
          events={filteredEvents}
          selectedEventId={selectedEventId}
          onSelectEvent={setSelectedEventId}
          mode={mapMode}
          filters={filters}
        />

        {/* Legend Overlay */}
        <div className="fixed bottom-10 left-10 p-4 bg-[#161B22]/80 backdrop-blur-md border border-[#30363D] rounded-xl shadow-xl hidden lg:block pointer-events-none">
          <h4 className="text-[10px] font-bold text-[#8B949E] uppercase tracking-widest mb-3">Live Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
              <span className="text-[10px] font-bold text-white uppercase">Critical Alert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-[10px] font-bold text-white uppercase">High Volatility</span>
            </div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-2 h-2 rounded-full bg-[#30363D]" />
              <span className="text-[10px] font-bold text-[#8B949E] uppercase">Stabilized</span>
            </div>
          </div>
        </div>
      </main>

      {/* Detail Overlay */}
      <DetailPanel 
        event={selectedEvent} 
        onClose={() => setSelectedEventId(null)}
        mode={mapMode}
      />

      {/* Mode Switcher */}
      <ModeSwitcher currentMode={mapMode} setMode={setMapMode} />

      {/* Interaction Hints */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 pointer-events-none animate-bounce">
         <div className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
            Zoom & Pan Enabled
         </div>
      </div>
    </div>
  );
};

export default App;
