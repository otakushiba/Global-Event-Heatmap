
import React from 'react';
import { GlobalEvent, MapMode } from '../types';
import { UI_COLORS, CATEGORY_COLORS } from '../constants';
import { X, Share2, FileText, TrendingUp, Users, MessageSquare, Newspaper, MapPin, Building2, Zap } from 'lucide-react';

interface DetailPanelProps {
  event: GlobalEvent | null;
  onClose: () => void;
  mode: MapMode;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ event, onClose, mode }) => {
  if (!event) return null;

  return (
    <aside className="fixed top-20 right-4 bottom-4 w-[420px] bg-[#161B22] border border-[#30363D] rounded-2xl shadow-2xl z-40 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-6 pb-4 flex items-start justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-blue-500 uppercase mb-2 block">Event intelligence</span>
          <h2 className="text-xl font-bold text-white leading-tight">{event.title}</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-[#30363D] rounded-full transition-colors">
          <X className="w-5 h-5 text-[#8B949E]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-0 space-y-6">
        {/* Category & Summary */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span 
              className="px-2.5 py-1 rounded text-[10px] font-bold uppercase"
              style={{ backgroundColor: `${CATEGORY_COLORS[event.category]}20`, color: CATEGORY_COLORS[event.category] }}
            >
              {event.category}
            </span>
            <div className="flex-1 h-px bg-[#30363D]" />
          </div>
          <p className="text-[#8B949E] text-sm leading-relaxed italic">
            "{event.summary}"
          </p>
        </div>

        {/* Heat Score */}
        <div className="bg-[#0D1117] border border-[#30363D] rounded-xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#8B949E] block mb-1">Global Heat Score</span>
            <span className="text-3xl font-black text-white">{event.heatLevel}<span className="text-sm font-normal text-blue-500/60 ml-1">/100</span></span>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-[#30363D] flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke={CATEGORY_COLORS[event.category]}
                strokeWidth="4"
                strokeDasharray={`${(event.heatLevel / 100) * 175} 175`}
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
            <Zap className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard icon={<Newspaper className="w-4 h-4" />} label="News Vol" value={event.metrics.newsVolume.toLocaleString()} trend="+12%" />
          <MetricCard icon={<MessageSquare className="w-4 h-4" />} label="Reddit Vol" value={event.metrics.redditVolume.toLocaleString()} trend="+5%" />
          <MetricCard icon={<Users className="w-4 h-4" />} label="X Activity" value={event.metrics.xVolume.toLocaleString()} trend="+24%" />
          <MetricCard icon={<TrendingUp className="w-4 h-4" />} label="Google Trend" value={`${event.metrics.googleTrend}%`} trend="+2%" />
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Event Timeline</h3>
          <div className="space-y-4 border-l-2 border-[#30363D] ml-2 pl-6">
            {event.timeline.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#30363D] border-2 border-[#161B22]" />
                <span className="text-[10px] font-bold text-blue-500 uppercase">{item.time}</span>
                <p className="text-sm text-[#E6EDF3] mt-0.5">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Entity Chips */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-bold text-[#8B949E] uppercase mb-3 flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Locations
            </h3>
            <div className="flex flex-wrap gap-2">
              {event.locations.map(loc => (
                <span key={loc} className="px-2 py-1 bg-[#21262D] rounded text-xs text-white border border-[#30363D]">{loc}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#8B949E] uppercase mb-3 flex items-center gap-2">
              <Building2 className="w-3 h-3" /> Organizations
            </h3>
            <div className="flex flex-wrap gap-2">
              {event.organizations.map(org => (
                <span key={org} className="px-2 py-1 bg-[#21262D] rounded text-xs text-white border border-[#30363D]">{org}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Impact */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
          <h3 className="text-xs font-bold text-red-500 uppercase mb-2">Impact Assessment</h3>
          <p className="text-sm text-[#E6EDF3]">{event.impact}</p>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="p-6 border-t border-[#30363D] grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold text-sm transition-colors">
          <FileText className="w-4 h-4" />
          Gen Report
        </button>
        <button className="flex items-center justify-center gap-2 bg-[#21262D] hover:bg-[#30363D] text-white px-4 py-3 rounded-xl font-bold text-sm border border-[#30363D] transition-colors">
          <Share2 className="w-4 h-4" />
          Share Intelligence
        </button>
      </div>
    </aside>
  );
};

const MetricCard: React.FC<{ icon: React.ReactNode, label: string, value: string, trend: string }> = ({ icon, label, value, trend }) => (
  <div className="p-3 bg-[#0D1117] border border-[#30363D] rounded-xl">
    <div className="flex items-center gap-2 text-[#8B949E] mb-2">
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </div>
    <div className="flex items-end justify-between">
      <span className="text-lg font-bold text-white">{value}</span>
      <span className="text-[10px] font-bold text-green-500 mb-1">{trend}</span>
    </div>
  </div>
);

export default DetailPanel;
