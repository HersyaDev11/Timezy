import { useState } from "react";
import { useSchedule } from "../../context/ScheduleContext";

export default function Deadlines() {
    const { filteredSchedules } = useSchedule();
    const [isExpanded, setIsExpanded] = useState(false);

    // Filter for "Tugas" items globally, sort by date
    const allDeadlines = filteredSchedules
        .filter(s => s.type === "Tugas")
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Limit to 3 items unless expanded
    const displayedDeadlines = isExpanded ? allDeadlines : allDeadlines.slice(0, 3);

    // Helper to format days remaining string
    const formatDeadlineTime = (dateStr) => {
        // Dummy logic to simulate dynamic text since the actual current date varies
        if (dateStr === "2026-03-06") return { text: "Besok", urgent: true, medium: false };
        if (dateStr === "2026-03-08") return { text: "3 Hari", urgent: false, medium: true };
        return { text: dateStr, urgent: false, medium: false };
    };

    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Deadline
                </h2>
                {allDeadlines.length > 3 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs text-primary font-bold hover:underline cursor-pointer"
                    >
                        {isExpanded ? "Tutup" : "Lihat Semua"}
                    </button>
                )}
            </div>
            <div className="p-2 flex-1 overflow-y-auto max-h-[300px] hidden-scrollbar">
                {displayedDeadlines.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-sm">
                        Tidak ada tugas tertunda.
                    </div>
                ) : (
                    displayedDeadlines.map((task) => {
                        const timeInfo = formatDeadlineTime(task.date);
                        return (
                            <div
                                key={task.id}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                            >
                                <div className="mt-1 w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 group-hover:border-primary flex items-center justify-center cursor-pointer"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-200 line-clamp-1">
                                        {task.title}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">{task.subtitle}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    {timeInfo.urgent ? (
                                        <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                                            {timeInfo.text}
                                        </span>
                                    ) : (
                                        <span
                                            className={`text-xs font-medium ${timeInfo.medium ? "text-amber-500" : "text-slate-500"
                                                }`}
                                        >
                                            {timeInfo.text}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
