import { useSchedule } from "../../context/ScheduleContext";

export default function DayDetailsModal({ isOpen, onClose, date }) {
    const { filteredSchedules } = useSchedule();

    if (!isOpen || !date) return null;

    // Filter schedules for the selected date
    const dayEvents = filteredSchedules
        .filter(s => s.date === date)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

    // Format date for display (e.g. "5 Maret 2026")
    const formattedDate = new Date(date).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const getEventStyles = (colorClass) => {
        switch (colorClass) {
            case 'red': return "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800/50";
            case 'blue': return "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800/50";
            case 'purple': return "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200 dark:border-purple-800/50";
            case 'green': return "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800/50";
            case 'amber': return "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800/50";
            default: return "bg-slate-50 text-slate-700 dark:bg-slate-900/20 dark:text-slate-400 border-slate-200 dark:border-slate-800/50";
        }
    };

    const getIconForType = (type) => {
        switch (type) {
            case 'Kuliah': return 'school';
            case 'Tugas': return 'assignment';
            case 'Organisasi': return 'groups';
            case 'Pribadi': return 'person';
            default: return 'event';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#0f172a] rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] animate-[slideIn_0.2s_ease-out]">
                
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Detail Jadwal</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{formattedDate}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined font-bold text-xl">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 overflow-y-auto hidden-scrollbar flex-1">
                    {dayEvents.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {dayEvents.map(event => (
                                <div 
                                    key={event.id}
                                    className={`flex p-4 rounded-xl border ${getEventStyles(event.colorClass)}`}
                                >
                                    <div className="flex flex-col items-center justify-center w-12 shrink-0 border-r border-current/20 mr-4 pr-4">
                                        <span className="font-bold text-sm">{event.startTime || '--:--'}</span>
                                        {event.endTime && (
                                            <span className="text-xs opacity-75">{event.endTime}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="material-symbols-outlined text-sm">
                                                {getIconForType(event.type)}
                                            </span>
                                            <h3 className="font-bold text-sm truncate">{event.title}</h3>
                                        </div>
                                        {event.subtitle && (
                                            <p className="text-xs opacity-90 truncate mb-1">{event.subtitle}</p>
                                        )}
                                        {event.location && (
                                            <div className="flex items-center gap-1 mt-auto text-xs opacity-75">
                                                <span className="material-symbols-outlined text-[14px]">location_on</span>
                                                <span className="truncate">{event.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-3xl text-slate-400">event_busy</span>
                            </div>
                            <h3 className="text-slate-900 dark:text-white font-bold mb-1">Tidak ada kegiatan</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Anda bisa bersantai atau menambahkan jadwal baru untuk hari ini.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer (Optional actions) */}
                <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f172a] rounded-b-2xl">
                    <button
                        onClick={() => {
                            onClose();
                            // Optional: Could trigger the "Tambah Jadwal" modal and pre-fill the date here.
                            // Assuming there's a custom event listening for it:
                            window.dispatchEvent(new CustomEvent('open-schedule-modal', { detail: { date } }));
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-lg">add</span>
                        Tambah Jadwal di Hari Ini
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes slideIn {
                    from { transform: translateY(20px) scale(0.95); opacity: 0; }
                    to { transform: translateY(0) scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
