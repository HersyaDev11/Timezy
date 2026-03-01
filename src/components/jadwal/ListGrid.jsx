import { useSchedule } from "../../context/ScheduleContext";

export default function ListGrid() {
    const { filteredSchedules } = useSchedule();

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
        <div className="flex-1 p-4 md:p-6 overflow-y-auto hidden-scrollbar min-h-[400px]">
            <div className="flex flex-col gap-3">
                {filteredSchedules.length === 0 ? (
                    <div className="text-center py-10 text-slate-500">Tidak ada jadwal ditemukan.</div>
                ) : (
                    filteredSchedules
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map(schedule => (
                            <div key={schedule.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111418]/50 items-start sm:items-center">
                                <div className="min-w-[100px]">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white block">{schedule.date}</span>
                                    <span className="text-xs text-slate-500">{schedule.startTime}</span>
                                </div>
                                <div className={`flex-1 px-4 py-2 border-l-4 rounded bg-white dark:bg-[#1c2632] ${getEventStyles(schedule.colorClass)}`}>
                                    <h4 className="font-bold text-sm">{schedule.title}</h4>
                                    <p className="text-xs opacity-80">{schedule.subtitle}</p>
                                </div>
                                <div className="text-xs text-slate-500 hidden md:block w-32 text-right">
                                    {schedule.location || "-"}
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
}
