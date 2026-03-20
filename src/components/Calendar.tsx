import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarProps {
  selectedDate: string;
  onChange: (date: string) => void;
}

export function Calendar({ selectedDate, onChange }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const formatted = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8 md:h-10 md:w-10"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isSelected = selectedDate === dateStr;
      
      days.push(
        <button
          key={i}
          type="button"
          onClick={(e) => handleDateClick(i, e)}
          className={`h-8 w-8 md:h-10 md:w-10 flex items-center justify-center text-sm transition-all duration-300 rounded-full ${
            isSelected 
              ? 'bg-ink text-sand font-medium' 
              : 'text-ink hover:bg-ink/10'
          }`}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  const displayDate = selectedDate 
    ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <div className="relative w-full">
      <div
        className="w-full bg-transparent border-b border-ink/25 py-4 cursor-pointer flex justify-between items-center transition-colors duration-300 hover:border-gold/40"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-sm font-sans transition-colors duration-300 ${displayDate ? 'text-ink' : 'text-ink/55'}`}>
          {displayDate || 'Select a date'}
        </span>
        <svg className={`w-4 h-4 text-ink/55 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 mt-2 w-full md:w-[320px] bg-sand text-ink border border-ink/10 shadow-2xl z-50 p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <button type="button" onClick={handlePrevMonth} className="p-2 hover:bg-ink/5 rounded-full transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <span className="font-serif text-lg text-ink">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button type="button" onClick={handleNextMonth} className="p-2 hover:bg-ink/5 rounded-full transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="h-8 flex items-center justify-center text-[10px] uppercase tracking-widest text-ink/50">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {renderDays()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
