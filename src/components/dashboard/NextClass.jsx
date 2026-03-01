import { useSchedule } from "../../context/ScheduleContext";

export default function NextClass() {
    const { filteredSchedules } = useSchedule();

    // Sort schedules by date and time
    const upcomingClasses = filteredSchedules
        .filter(s => s.type === "Kuliah")
        .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.startTime}`);
            const dateB = new Date(`${b.date}T${b.startTime}`);
            return dateA - dateB;
        });

    // For demo purposes, we'll just pick the first one as "Next Class"
    const nextClass = upcomingClasses.length > 0 ? upcomingClasses[0] : null;

    if (!nextClass) {
        return (
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-8 text-center">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Kelas Berikutnya</h2>
                <p className="text-slate-500 dark:text-slate-400">Tidak ada kelas terjadwal dalam waktu dekat.</p>
            </div>
        );
    }
    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Kelas Berikutnya
                </h2>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider">
                    Segera Mulai
                </span>
            </div>
            <div className="p-6 flex flex-col sm:flex-row gap-6">
                <div className="flex-1 flex flex-col justify-center gap-3">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                            {nextClass.title}
                        </h3>
                        <p className="text-sm text-slate-500 mb-2">{nextClass.subtitle}</p>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-[18px]">
                                schedule
                            </span>
                            <span className="text-sm font-medium">
                                {nextClass.date} • {nextClass.startTime} - {nextClass.endTime} WIB
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-1">
                            <span className="material-symbols-outlined text-[18px]">
                                location_on
                            </span>
                            <span className="text-sm font-medium">{nextClass.location || "Ruang Kelas"}</span>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-2">
                        <button
                            onClick={() => window.open('https://scholar.google.com/', '_blank')}
                            className="bg-surface-highlight hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                        >
                            Lihat Materi
                        </button>
                        <button
                            onClick={() => window.open('https://zoom.us/', '_blank')}
                            className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                        >
                            Join Zoom
                        </button>
                    </div>
                </div>
                <div
                    className="w-full sm:w-48 aspect-video rounded-lg bg-cover bg-center relative group cursor-pointer overflow-hidden shadow-inner"
                    data-alt="Code editor on a laptop screen"
                    style={{
                        backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9ZFSKwRnTOPb7h1OUPcAxNk9nNGC9jSolFF1_2NY5cx1OFwH74yoT8tMQ9u7UlOjxBsVWQzifbbkdnLvOREeDhs2exQOrmj3vPdDGyuxfZF_pFPwAgubyYsQqaG1oSBHgKMgnm3tM5nAWtgt4tNsuY7AU8yDeQ_nrMRuLNiewBwkBguflitWyNhHXdSmGVCktrcHgTo0qsm8KayUGD8iWK8CJdEzfHjNXVmrQksjCucnKQmFnNpwy9c0Zoi5vWXEjXQEm_dHNSusd")',
                    }}
                >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
                            open_in_new
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
