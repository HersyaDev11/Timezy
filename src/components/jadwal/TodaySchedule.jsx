import { useSchedule } from "../../context/ScheduleContext";

export default function TodaySchedule() {
    const { filteredSchedules, deleteSchedule, currentDate } = useSchedule();

    // In a real app, 'today' would be dynamic (e.g., new Date().toISOString().split('T')[0]). 
    // For this dummy demo matching the UI provided earlier, we'll pretend today is "2026-03-05".
    // Or we could map it to the currently viewed month if we want to show anything, 
    // but the title is "Jadwal Hari Ini" so sticking to a constant "today" works well for mock data.
    const todayStr = "2026-03-05";

    const todaysSchedules = filteredSchedules
        .filter(s => s.date === todayStr)
        .sort((a, b) => a.startTime.localeCompare(b.startTime)); // sort by time

    // Helper functions for UI styling based on type
    const getStyles = (type, colorClass) => {
        switch (type) {
            case 'Kuliah':
                if (colorClass === 'red') {
                    return {
                        wrapper: "bg-red-500/5 border-red-500/20",
                        icon: "warning",
                        iconColor: "text-red-500",
                        timeBadge: "text-red-500 bg-red-100 dark:bg-red-900/30",
                    };
                }
                return {
                    wrapper: "bg-slate-50 dark:bg-[#111418] hover:border-primary/50 cursor-pointer",
                    icon: "book",
                    iconColor: "text-blue-500",
                    timeBadge: "text-slate-900 dark:text-white bg-white dark:bg-[#111418] border border-slate-200 dark:border-slate-800",
                };
            case 'Pribadi':
                return {
                    wrapper: "bg-slate-50 dark:bg-[#111418] hover:border-green-500/50 cursor-pointer",
                    icon: "fitness_center",
                    iconColor: "text-green-500",
                    timeBadge: "text-slate-900 dark:text-white bg-white dark:bg-[#111418] border border-slate-200 dark:border-slate-800",
                };
            case 'Organisasi':
                return {
                    wrapper: "bg-slate-50 dark:bg-[#111418] hover:border-purple-500/50 cursor-pointer",
                    icon: "groups",
                    iconColor: "text-purple-500",
                    timeBadge: "text-slate-900 dark:text-white bg-white dark:bg-[#111418] border border-slate-200 dark:border-slate-800",
                };
            case 'Tugas':
            default:
                return {
                    wrapper: "bg-slate-50 dark:bg-[#111418] hover:border-amber-500/50 cursor-pointer",
                    icon: "assignment",
                    iconColor: "text-amber-500",
                    timeBadge: "text-slate-900 dark:text-white bg-white dark:bg-[#111418] border border-slate-200 dark:border-slate-800",
                };
        }
    }


    return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111418] overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 dark:text-white">
                    Jadwal Hari Ini
                </h3>
                <span className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary">
                    5 Maret
                </span>
            </div>

            <div className="p-4 flex flex-col gap-4">
                {todaysSchedules.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-sm">
                        Tidak ada jadwal untuk hari ini.
                    </div>
                ) : (
                    todaysSchedules.map(schedule => {
                        const styles = getStyles(schedule.type, schedule.colorClass);
                        const timeString = schedule.endTime ? `${schedule.startTime} - ${schedule.endTime}` : schedule.startTime;

                        return (
                            <div key={schedule.id} className={`flex gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 items-start transition-colors relative group ${styles.wrapper}`}>
                                <div className={`mt-1 ${styles.iconColor}`}>
                                    <span className="material-symbols-outlined">{styles.icon}</span>
                                </div>
                                <div className="flex flex-col gap-1 w-full pr-6">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                        {schedule.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {schedule.subtitle}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${styles.timeBadge}`}>
                                            {timeString}
                                        </span>
                                        {schedule.location && (
                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                {schedule.location}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Delete Hover Action */}
                                <button
                                    onClick={() => deleteSchedule(schedule.id)}
                                    className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                                    title="Hapus Jadwal"
                                >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}
