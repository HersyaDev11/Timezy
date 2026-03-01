import { useSchedule } from "../../context/ScheduleContext";

export default function CalendarHeader({ onAddClick }) {
    const { currentDate, nextMonth, prevMonth, goToToday } = useSchedule();

    // Format the header month title (e.g., "Oktober 2023")
    const monthFormatter = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' });
    const formattedDate = monthFormatter.format(currentDate);

    return (
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                {formattedDate}
            </h3>
            <div className="flex items-center gap-2">
                <button
                    onClick={onAddClick}
                    className="flex items-center justify-center gap-1 rounded bg-primary/10 text-primary px-3 py-1.5 text-sm font-semibold hover:bg-primary hover:text-white transition-colors cursor-pointer mr-2"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Tambah
                </button>
                <button
                    onClick={prevMonth}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#111418] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                >
                    <span className="material-symbols-outlined">
                        chevron_left
                    </span>
                </button>
                <button
                    onClick={goToToday}
                    className="px-3 py-1 text-sm font-medium rounded-md hover:bg-slate-100 dark:hover:bg-[#111418] dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
                >
                    Hari Ini
                </button>
                <button
                    onClick={nextMonth}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#111418] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                >
                    <span className="material-symbols-outlined">
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    );
}
