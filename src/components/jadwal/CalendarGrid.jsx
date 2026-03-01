import { useSchedule } from "../../context/ScheduleContext";

export default function CalendarGrid() {
    const { filteredSchedules, currentDate } = useSchedule();

    // Helper to generate calendar days for the current month
    const generateCalendarDays = (dateData) => {
        const year = dateData.getFullYear();
        const month = dateData.getMonth();

        // Get number of days in the month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Get the starting day of the week (0 = Sunday, 1 = Monday ...)
        const startDayOfWeek = new Date(year, month, 1).getDay();

        // Get days from the previous month to pad the start of the grid
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        const prevMonthDays = [];
        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            prevMonthDays.push(daysInPrevMonth - i);
        }

        // Generate current month days
        const currentDays = [];
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

        for (let i = 1; i <= daysInMonth; i++) {
            // pad with 0 for YYYY-MM-DD format
            const monthStr = String(month + 1).padStart(2, '0');
            const dayStr = String(i).padStart(2, '0');
            const fullDate = `${year}-${monthStr}-${dayStr}`;

            const isToday = isCurrentMonth && today.getDate() === i;

            currentDays.push({
                date: i,
                fullDate,
                isToday
            });
        }

        return { prevMonthDays, currentDays };
    };

    const { prevMonthDays, currentDays } = generateCalendarDays(currentDate);

    const getEventStyles = (colorClass) => {
        switch (colorClass) {
            case 'red': return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500";
            case 'blue': return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500";
            case 'purple': return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500";
            case 'green': return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500";
            case 'amber': return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500";
            default: return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500";
        }
    };

    return (
        <div className="flex-1 p-4 md:p-6 overflow-y-auto hidden-scrollbar">
            <div className="grid grid-cols-7 gap-y-4 gap-x-2 md:gap-x-4 h-full text-center">
                {/* Days Header */}
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
                    <div key={day} className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider py-2">
                        {day}
                    </div>
                ))}

                {/* Days Content (Previous Month Padding) */}
                {prevMonthDays.map((dateNum, idx) => (
                    <div key={`prev-${idx}`} className="h-24 md:h-32 p-1 border rounded-xl border-transparent opacity-30">
                        <span className="block text-sm font-medium text-right mb-1">{dateNum}</span>
                    </div>
                ))}

                {/* Days Content (Current Month) */}
                {currentDays.map((day) => {
                    // Find schedules matching this day out of the FILTERED schedules
                    const dayEvents = filteredSchedules
                        .filter(s => s.date === day.fullDate)
                        .sort((a, b) => a.startTime.localeCompare(b.startTime));

                    return (
                        <div
                            key={day.date}
                            className={`group h-24 md:h-32 p-2 border rounded-xl transition-colors cursor-pointer relative flex flex-col overflow-hidden ${day.isToday
                                ? "border-primary bg-primary/5 dark:bg-primary/10"
                                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111418]/30 hover:border-primary"
                                }`}
                        >
                            {day.isToday ? (
                                <span className="flex items-center justify-end mb-1">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">
                                        {day.date}
                                    </span>
                                </span>
                            ) : (
                                <span className="block text-sm font-medium text-right mb-1 text-slate-900 dark:text-white">
                                    {day.date}
                                </span>
                            )}

                            {/* Render Events */}
                            <div className="flex flex-col gap-1 overflow-y-auto hidden-scrollbar mt-auto">
                                {dayEvents.map(event => (
                                    <div
                                        key={event.id}
                                        className={`text-[10px] md:text-xs px-1 md:px-2 py-1 rounded truncate border-l-2 font-medium ${getEventStyles(event.colorClass)}`}
                                        title={event.title}
                                    >
                                        {event.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
