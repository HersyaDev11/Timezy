import { useSchedule } from "../../context/ScheduleContext";

export default function WeekGrid() {
    const { filteredSchedules, currentDate } = useSchedule();

    // Calculate the 7 days of the current week (Sunday to Saturday)
    const getWeekDays = (date) => {
        const current = new Date(date);
        const day = current.getDay(); // 0 is Sunday
        const diff = current.getDate() - day; // Adjust date to the previous Sunday

        const sunday = new Date(current.setDate(diff));
        const weekDays = [];

        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(sunday);
            nextDay.setDate(sunday.getDate() + i);

            // Format YYYY-MM-DD
            const year = nextDay.getFullYear();
            const monthStr = String(nextDay.getMonth() + 1).padStart(2, '0');
            const dayStr = String(nextDay.getDate()).padStart(2, '0');

            weekDays.push({
                date: nextDay.getDate(),
                dayName: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'][i],
                fullDate: `${year}-${monthStr}-${dayStr}`,
                isToday: new Date().getFullYear() === year &&
                    new Date().getMonth() === nextDay.getMonth() &&
                    new Date().getDate() === nextDay.getDate()
            });
        }
        return weekDays;
    };

    const weekDays = getWeekDays(currentDate);

    const getEventStyles = (colorClass) => {
        switch (colorClass) {
            case 'red': return "bg-red-500/10 text-red-600 dark:text-red-400 border-l-2 border-red-500";
            case 'blue': return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-l-2 border-blue-500";
            case 'purple': return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-l-2 border-purple-500";
            case 'green': return "bg-green-500/10 text-green-600 dark:text-green-400 border-l-2 border-green-500";
            case 'amber': return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-l-2 border-amber-500";
            default: return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-l-2 border-slate-500";
        }
    };

    return (
        <div className="flex-1 overflow-x-auto overflow-y-auto hidden-scrollbar flex flex-col">
            <div className="min-w-[800px] flex-1 flex flex-col pb-4 px-4">
                {/* Headers */}
                <div className="grid grid-cols-7 gap-4 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                    {weekDays.map(day => (
                        <div key={day.fullDate} className="flex flex-col items-center">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{day.dayName}</span>
                            <div className={`mt-1 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${day.isToday ? 'bg-primary text-white' : 'text-slate-900 dark:text-white'
                                }`}>
                                {day.date}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Columns */}
                <div className="grid grid-cols-7 gap-4 flex-1">
                    {weekDays.map(day => {
                        const dayEvents = filteredSchedules
                            .filter(s => s.date === day.fullDate)
                            .sort((a, b) => a.startTime.localeCompare(b.startTime));

                        return (
                            <div key={`col-${day.fullDate}`} className="flex flex-col gap-2 min-h-[300px] border-l border-slate-100 dark:border-slate-800/50 pl-2 -ml-2">
                                {dayEvents.map(event => (
                                    <div key={event.id} className={`p-2 rounded-lg text-xs ${getEventStyles(event.colorClass)}`}>
                                        <div className="font-bold truncate" title={event.title}>{event.title}</div>
                                        <div className="mt-1 opacity-80">{event.startTime} {event.endTime && `- ${event.endTime}`}</div>
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
