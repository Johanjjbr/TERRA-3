import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

interface CalendarEvent {
  id: string;
  ticketId: string;
  time: string;
  cliente: string;
  zona: string;
  operador: string;
  operadorColor: string;
  day: number;
}

const events: CalendarEvent[] = [
  {
    id: '1',
    ticketId: '219714',
    time: '09:30',
    cliente: 'JULIO CESAR GUZMAN',
    zona: 'Caucete Centro',
    operador: 'JULIO',
    operadorColor: 'bg-green-700',
    day: 19,
  },
];

const zonasData = [
  { id: '1', name: 'Caucete Centro', checked: true },
  { id: '2', name: 'Bermejo', checked: true },
  { id: '3', name: 'Casuarinas', checked: true },
  { id: '4', name: 'Caucete - Área 1', checked: true },
  { id: '5', name: 'Caucete - Área 2', checked: true },
  { id: '6', name: 'Villa Independencia', checked: false },
  { id: '7', name: 'Barrio Norte', checked: false },
  { id: '8', name: 'Centro Histórico', checked: false },
  { id: '9', name: 'Villa del Parque', checked: false },
  { id: '10', name: 'Zona Industrial', checked: false },
];

const daysOfWeek = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];

// Generate calendar days for March 2026
const generateCalendarDays = () => {
  const days = [];
  // March 2026 starts on Sunday (day 0), so Monday is day 1
  // Add empty cells for days before the 1st
  for (let i = 0; i < 6; i++) {
    days.push(null);
  }
  // Add days 1-31 for March
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  return days;
};

export function CalendarioView() {
  const [zonas, setZonas] = useState(zonasData);
  const [filtrarPorZonas, setFiltrarPorZonas] = useState(false);
  const [selectedOperador, setSelectedOperador] = useState('JULIO');
  const [viewMode, setViewMode] = useState<'mes' | 'semana' | 'dia'>('mes');
  const today = 18;

  const calendarDays = generateCalendarDays();

  const handleZonaChange = (id: string, checked: boolean) => {
    setZonas(prev =>
      prev.map(zona => (zona.id === id ? { ...zona, checked } : zona))
    );
  };

  const getEventsForDay = (day: number) => {
    return events.filter(event => event.day === day);
  };

  return (
    <div className="flex-1 flex bg-[#F8FAFC] overflow-hidden">
      {/* Main Calendar Area - 80% */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">MI CALENDARIO</h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                <Checkbox 
                  checked={filtrarPorZonas}
                  onCheckedChange={(checked) => setFiltrarPorZonas(checked as boolean)}
                />
                <span>Filtrar por mis zonas</span>
              </label>
              <select
                value={selectedOperador}
                onChange={(e) => setSelectedOperador(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-xs outline-none bg-white"
              >
                <option value="todos">Todos los operadores</option>
                <option value="JULIO">JULIO</option>
                <option value="MARCELO">MARCELO</option>
                <option value="NATALIA">NATALIA</option>
                <option value="MARIA">MARIA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-sm font-semibold text-gray-900 min-w-[120px] text-center">marzo 2026</span>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
            <button className="ml-2 px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              Hoy
            </button>
          </div>

          <div className="flex items-center gap-1 bg-gray-100 rounded p-1">
            <button
              onClick={() => setViewMode('mes')}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                viewMode === 'mes' ? 'bg-white shadow-sm font-semibold' : 'hover:bg-gray-200'
              }`}
            >
              Mes
            </button>
            <button
              onClick={() => setViewMode('semana')}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                viewMode === 'semana' ? 'bg-white shadow-sm font-semibold' : 'hover:bg-gray-200'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setViewMode('dia')}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                viewMode === 'dia' ? 'bg-white shadow-sm font-semibold' : 'hover:bg-gray-200'
              }`}
            >
              Día
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            {/* Days of week header */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="px-3 py-2 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-200 last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                const dayEvents = day ? getEventsForDay(day) : [];
                const isToday = day === today;

                return (
                  <div
                    key={index}
                    className={`min-h-[100px] border-r border-b border-gray-200 last:border-r-0 p-2 ${
                      day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
                    } ${isToday ? 'bg-blue-50' : ''}`}
                  >
                    {day && (
                      <>
                        <div className={`text-xs font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                          {day}
                        </div>
                        {/* Events for this day */}
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`mt-1 p-1.5 rounded text-[11px] leading-tight cursor-pointer hover:shadow-md transition-shadow ${event.operadorColor} bg-opacity-10 border-l-2 border-green-700`}
                          >
                            <div className="font-medium text-gray-900">
                              {event.time} {event.ticketId}
                            </div>
                            <div className="text-gray-700">
                              {event.cliente} - {event.zona}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Zonas Panel - 20% */}
      <div className="w-64 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <h3 className="text-sm font-bold text-gray-900 uppercase">Zonas</h3>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-3">
            {zonas.map((zona) => (
              <label
                key={zona.id}
                className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
              >
                <Checkbox
                  checked={zona.checked}
                  onCheckedChange={(checked) => handleZonaChange(zona.id, checked as boolean)}
                />
                <span className="text-xs text-gray-700">{zona.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
