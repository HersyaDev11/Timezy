import { useSchedule } from "../../context/ScheduleContext";

export default function FilterActions() {
    const { activeFilter, setActiveFilter, currentView, setCurrentView } = useSchedule();

    const getBtnClass = (filterName) => {
        return activeFilter === filterName
            ? "flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium shadow-md shadow-primary/20 transition-all whitespace-nowrap"
            : "flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#111418] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all whitespace-nowrap";
    };

    return (
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto overflow-y-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <button
                    onClick={() => setActiveFilter("Semua")}
                    className={getBtnClass("Semua")}
                >
                    {activeFilter === "Semua" && <span className="material-symbols-outlined text-lg">check</span>}
                    Semua
                </button>
                <button
                    onClick={() => setActiveFilter("Mata Kuliah")}
                    className={`${getBtnClass("Mata Kuliah")} hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10`}
                >
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Mata Kuliah
                </button>
                <button
                    onClick={() => setActiveFilter("Organisasi")}
                    className={`${getBtnClass("Organisasi")} hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10`}
                >
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Organisasi
                </button>
                <button
                    onClick={() => setActiveFilter("Pribadi")}
                    className={`${getBtnClass("Pribadi")} hover:border-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/10`}
                >
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Pribadi
                </button>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-[#111418] p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                <button
                    onClick={() => setCurrentView("calendar")}
                    className={`p-1.5 cursor-pointer rounded transition-colors ${currentView === 'calendar' ? 'bg-slate-50 dark:bg-[#1c2632] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`}
                >
                    <span className="material-symbols-outlined text-xl">calendar_month</span>
                </button>
                <button
                    onClick={() => setCurrentView("week")}
                    className={`p-1.5 cursor-pointer rounded transition-colors ${currentView === 'week' ? 'bg-slate-50 dark:bg-[#1c2632] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`}
                >
                    <span className="material-symbols-outlined text-xl">view_week</span>
                </button>
                <button
                    onClick={() => setCurrentView("list")}
                    className={`p-1.5 cursor-pointer rounded transition-colors ${currentView === 'list' ? 'bg-slate-50 dark:bg-[#1c2632] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`}
                >
                    <span className="material-symbols-outlined text-xl">list</span>
                </button>
            </div>
        </section>
    );
}
