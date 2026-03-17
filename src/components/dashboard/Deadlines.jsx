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
        if (dateStr === "2026-03-06") return { text: "Besok", urgent: true, medium: false, progress: 90 };
        if (dateStr === "2026-03-08") return { text: "3 Hari", urgent: false, medium: true, progress: 60 };
        return { text: dateStr, urgent: false, medium: false, progress: 20 };
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
            <div className="p-4 flex-1 overflow-y-auto max-h-[300px] hidden-scrollbar flex flex-col gap-3">
                {displayedDeadlines.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-sm">
                        Tidak ada tugas tertunda.
                    </div>
                ) : (
                    displayedDeadlines.map((task, idx) => {
                        const timeInfo = formatDeadlineTime(task.date);
                        return (
                            <div
                                key={task.id}
                                className="relative overflow-hidden bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer group"
                            >
                                {/* Background Accent line */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${timeInfo.urgent ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : timeInfo.medium ? 'bg-amber-500' : 'bg-primary'}`}></div>
                                
                                <div className="flex justify-between items-start mb-2 pl-2">
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-200 line-clamp-1 group-hover:text-primary transition-colors">
                                            {task.title}
                                        </p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{task.subtitle}</p>
                                    </div>
                                    <div className="flex flex-col items-end shrink-0 ml-2">
                                        {timeInfo.urgent ? (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-100 dark:bg-red-900/40 dark:text-red-400 px-2 py-1 rounded-md">
                                                <span className="material-symbols-outlined text-[12px]">timer</span>
                                                {timeInfo.text}
                                            </span>
                                        ) : (
                                            <span
                                                className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md ${timeInfo.medium ? "text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400" : "text-blue-700 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                                                    }`}
                                            >
                                                <span className="material-symbols-outlined text-[12px]">event</span>
                                                {timeInfo.text}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Progress Indicator */}
                                <div className="pl-2 mt-3">
                                    <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-medium">
                                        <span>Progres Pengerjaan</span>
                                        <span>{idx === 0 ? '90%' : idx === 1 ? '40%' : '10%'}</span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${timeInfo.urgent ? 'bg-red-500' : timeInfo.medium ? 'bg-amber-500' : 'bg-primary'}`} 
                                            style={{ width: idx === 0 ? '90%' : idx === 1 ? '40%' : '10%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
