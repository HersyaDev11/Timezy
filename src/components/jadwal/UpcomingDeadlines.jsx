import { useState } from "react";
import { useSchedule } from "../../context/ScheduleContext";

export default function UpcomingDeadlines() {
    const { filteredSchedules, deleteSchedule } = useSchedule();
    const [isExpanded, setIsExpanded] = useState(false);

    // Filter for "Tugas" items globally, sort by date (closest to 2023-10-05)
    // For simplicity, we just sort them chronologically regardless of relative 'Besok' logic for this dummy data layout
    const allDeadlines = filteredSchedules
        .filter(s => s.type === "Tugas")
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Limit to 3 items unless expanded
    const deadlines = isExpanded ? allDeadlines : allDeadlines.slice(0, 3);

    // Colors mapping helper
    const getBulletColor = (colorClass) => {
        switch (colorClass) {
            case 'amber': return 'bg-amber-500';
            case 'blue': return 'bg-blue-500';
            case 'purple': return 'bg-purple-500';
            case 'red': return 'bg-red-500';
            case 'green': return 'bg-green-500';
            default: return 'bg-slate-500';
        }
    };

    // Helper for relative strings
    const getRelativeDateString = (dateStr) => {
        switch (dateStr) {
            case "2023-10-06": return "Besok, 23:59";
            case "2023-10-08": return "3 hari lagi";
            case "2023-10-12": return "Minggu depan";
            default: return `${dateStr}`;
        }
    };

    return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111418] overflow-hidden shadow-sm flex-1 flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center shrink-0">
                <h3 className="font-bold text-slate-900 dark:text-white">
                    Deadline Tugas
                </h3>
                {allDeadlines.length > 3 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs text-primary font-medium hover:underline cursor-pointer"
                    >
                        {isExpanded ? "Tutup" : "Lihat Semua"}
                    </button>
                )}
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-800 flex-1 overflow-y-auto hidden-scrollbar">
                {deadlines.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-sm">
                        Tidak ada tugas tertunda.
                    </div>
                ) : (
                    deadlines.map(deadline => (
                        <div key={deadline.id} className="p-4 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-[#1c2632] transition-colors cursor-pointer relative">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${getBulletColor(deadline.colorClass)}`}></div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                        {deadline.title}
                                    </span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {getRelativeDateString(deadline.date)}
                                    </span>
                                </div>
                            </div>

                            {/* Actions Group (Show on Hover) */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteSchedule(deadline.id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-opacity rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                                    title="Hapus"
                                >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                </button>

                                <div className="text-slate-500 dark:text-slate-400 opacity-100 group-hover:opacity-0 transition-opacity">
                                    <span className="material-symbols-outlined text-lg">
                                        chevron_right
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-3 bg-slate-50 dark:bg-[#1c2632]/50 shrink-0">
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-schedule-modal'))}
                    className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg py-2 border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Tambah Tugas Baru
                </button>
            </div>
        </div>
    );
}
