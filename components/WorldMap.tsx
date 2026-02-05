
import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { GlobalEvent, EventCategory, MapMode, FilterState } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { Maximize, RotateCcw } from 'lucide-react';

interface WorldMapProps {
  events: GlobalEvent[];
  selectedEventId: string | null;
  onSelectEvent: (id: string) => void;
  mode: MapMode;
  filters: FilterState;
}

const WorldMap: React.FC<WorldMapProps> = ({ events, selectedEventId, onSelectEvent, mode, filters }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const [worldData, setWorldData] = useState<any>(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [hoveredEvent, setHoveredEvent] = useState<GlobalEvent | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Store zoom behavior to trigger it programmatically
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch Map Data
  useEffect(() => {
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((data) => setWorldData(data));
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(e => filters.categories.includes(e.category));
  }, [events, filters.categories]);

  useEffect(() => {
    if (!worldData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous

    const { width, height } = dimensions;
    const projection = d3.geoMercator()
      .scale(width / 6.5)
      .translate([width / 2, height / 1.6]);

    const path = d3.geoPath().projection(projection);

    // Zoom container
    const g = svg.append('g').attr('class', 'map-content');
    (gRef as any).current = g.node();

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 12])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    zoomBehaviorRef.current = zoom;
    svg.call(zoom);

    // Double click to zoom is enabled by default in d3.zoom
    // We can customize the double click behavior if needed:
    svg.on('dblclick.zoom', (event) => {
      event.preventDefault();
      const [x, y] = d3.pointer(event);
      svg.transition()
        .duration(750)
        .call(zoom.scaleBy, 2, [x, y]);
    });

    // Draw Countries
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(res => res.json())
      .then(data => {
        g.selectAll('path')
          .data(data.features)
          .enter()
          .append('path')
          .attr('d', path as any)
          .attr('fill', '#161B22')
          .attr('stroke', '#30363D')
          .attr('stroke-width', 0.5)
          .style('transition', 'fill 0.3s ease');

        // Draw Events
        const eventGroups = g.selectAll('.event-marker')
          .data(filteredEvents)
          .enter()
          .append('g')
          .attr('class', 'event-marker')
          .style('cursor', 'pointer')
          .on('click', (e, d) => {
            e.stopPropagation();
            onSelectEvent(d.id);
          })
          .on('mouseover', (e, d) => {
            setHoveredEvent(d);
            setTooltipPos({ x: e.clientX, y: e.clientY });
          })
          .on('mousemove', (e) => {
            setTooltipPos({ x: e.clientX, y: e.clientY });
          })
          .on('mouseout', () => {
            setHoveredEvent(null);
          });

        // Event Glow
        eventGroups.append('circle')
          .attr('cx', d => projection([d.lng, d.lat])![0])
          .attr('cy', d => projection([d.lng, d.lat])![1])
          .attr('r', d => (d.heatLevel / 5) + 5)
          .attr('fill', d => {
            if (mode === MapMode.RISK) return '#EF4444';
            return CATEGORY_COLORS[d.category];
          })
          .attr('opacity', 0.2)
          .attr('class', 'pulse-animation');

        // Main Circle
        eventGroups.append('circle')
          .attr('cx', d => projection([d.lng, d.lat])![0])
          .attr('cy', d => projection([d.lng, d.lat])![1])
          .attr('r', d => (d.heatLevel / 10) + 3)
          .attr('fill', d => {
            if (mode === MapMode.RISK) return '#EF4444';
            return CATEGORY_COLORS[d.category];
          })
          .attr('stroke', '#FFFFFF')
          .attr('stroke-width', d => d.id === selectedEventId ? 2 : 0)
          .attr('filter', d => d.heatLevel > 80 ? 'drop-shadow(0 0 8px ' + CATEGORY_COLORS[d.category] + ')' : 'none');
      });

  }, [worldData, dimensions, filteredEvents, selectedEventId, mode, onSelectEvent]);

  const handleResetView = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
    }
  };

  return (
    <div className="w-full h-full bg-[#0D1117] overflow-hidden relative">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="block touch-none"
      />

      {/* Map Controls */}
      <div className="fixed top-24 right-6 flex flex-col gap-2 z-30">
        <button
          onClick={handleResetView}
          className="group flex items-center gap-2 bg-[#161B22]/90 backdrop-blur-md border border-[#30363D] p-3 rounded-xl shadow-xl hover:bg-[#21262D] hover:border-[#58A6FF]/50 transition-all text-[#8B949E] hover:text-white"
          title="Reset Map View"
        >
          <RotateCcw className="w-5 h-5 group-active:rotate-[-180deg] transition-transform duration-500" />
          <span className="text-xs font-bold uppercase tracking-wider pr-1">Reset View</span>
        </button>
      </div>

      {/* Hover Tooltip */}
      {hoveredEvent && (
        <div
          className="fixed pointer-events-none z-[100] bg-[#161B22]/95 backdrop-blur-md border border-[#30363D] px-4 py-3 rounded-xl shadow-2xl min-w-[200px]"
          style={{
            left: `${tooltipPos.x + 15}px`,
            top: `${tooltipPos.y + 15}px`,
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: CATEGORY_COLORS[hoveredEvent.category] }} 
            />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
              {hoveredEvent.category}
            </span>
          </div>
          <h4 className="text-sm font-bold text-white leading-tight mb-2">
            {hoveredEvent.title}
          </h4>
          <div className="flex items-center justify-between border-t border-[#30363D] pt-2 mt-2">
            <span className="text-[10px] font-bold text-[#8B949E] uppercase">Heat Level</span>
            <span className="text-xs font-black text-white bg-blue-500/10 px-1.5 rounded leading-none py-0.5">
              {hoveredEvent.heatLevel}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
