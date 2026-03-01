import { useState, useEffect } from "react";
import FilterActions from "../components/jadwal/FilterActions";
import CalendarHeader from "../components/jadwal/CalendarHeader";
import CalendarGrid from "../components/jadwal/CalendarGrid";
import WeekGrid from "../components/jadwal/WeekGrid";
import ListGrid from "../components/jadwal/ListGrid";
import TodaySchedule from "../components/jadwal/TodaySchedule";
import UpcomingDeadlines from "../components/jadwal/UpcomingDeadlines";
import ScheduleModal from "../components/jadwal/ScheduleModal";
import { useSchedule } from "../context/ScheduleContext";

export default function Jadwal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { searchQuery, setSearchQuery, currentView, notification } = useSchedule();

    useEffect(() => {
        const handleOpenModal = () => setIsModalOpen(true);
        window.addEventListener('open-schedule-modal', handleOpenModal);
        return () => window.removeEventListener('open-schedule-modal', handleOpenModal);
    }, []);

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Page Header & Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-2">
                <div className="flex-1 w-full max-w-md">
                    <div className="relative w-full max-w-md">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Cari mata kuliah, tugas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-[#111418] border-none rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-500"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 align-middle">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                            Minggu, 1 Maret
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            Minggu 1 - Semester Genap
                        </p>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#111418] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-all relative shadow-sm cursor-pointer">
                        <span className="material-symbols-outlined">
                            notifications
                        </span>
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border border-white dark:border-[#111418]"></span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <FilterActions />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side: Calendar / Main View */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111418] overflow-hidden shadow-sm flex flex-col h-full min-h-[500px]">
                        <CalendarHeader onAddClick={() => setIsModalOpen(true)} />
                        {currentView === 'calendar' && <CalendarGrid />}
                        {currentView === 'week' && <WeekGrid />}
                        {currentView === 'list' && <ListGrid />}
                    </div>
                </div>

                {/* Right Side: Schedules & Deadlines */}
                <div className="flex flex-col gap-6">
                    <TodaySchedule />
                    <UpcomingDeadlines />
                </div>
            </div>

            {/* Modal */}
            <ScheduleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {/* Notification Toast */}
            {notification && (
                <div className={`fixed bottom-6 right-6 z-[100] px-5 py-3 rounded-xl shadow-lg shadow-black/5 flex items-center gap-3 animate-[slideIn_0.3s_ease-out] border ${notification.type === 'error'
                        ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
                        : 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
                    }`}>
                    <span className="material-symbols-outlined text-xl">
                        {notification.type === 'error' ? 'info' : 'check_circle'}
                    </span>
                    <p className="text-sm font-semibold">{notification.message}</p>
                </div>
            )}

            <style>{`
                @keyframes slideIn {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
