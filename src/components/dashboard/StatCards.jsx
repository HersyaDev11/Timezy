export default function StatCards() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-[80px] text-primary">
                        school
                    </span>
                </div>
                <div className="flex flex-col gap-1 relative z-10">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">
                        Kelas Hari Ini
                    </p>
                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white">4</h3>
                    <div className="flex items-center gap-1 mt-2 text-emerald-500 text-sm font-medium">
                        <span className="material-symbols-outlined text-[16px]">
                            check_circle
                        </span>
                        <span>1 Selesai</span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-[80px] text-purple-500">
                        task_alt
                    </span>
                </div>
                <div className="flex flex-col gap-1 relative z-10">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">
                        Tugas Selesai
                    </p>
                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                        12
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-emerald-500 text-sm font-medium">
                        <span className="material-symbols-outlined text-[16px]">
                            trending_up
                        </span>
                        <span>+2 dari minggu lalu</span>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-slate-900 dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <span className="material-symbols-outlined text-[80px]">timer</span>
                </div>
                <div className="flex flex-col gap-1 relative z-10">
                    <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider">
                        Waktu Fokus
                    </p>
                    <h3 className="text-4xl font-bold">
                        2.5 <span className="text-lg font-normal text-blue-200">Jam</span>
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-blue-300 text-sm font-medium">
                        <span className="material-symbols-outlined text-[16px]">bolt</span>
                        <span>Target: 4 Jam</span>
                    </div>
                    <div className="w-full bg-blue-950/50 rounded-full h-1.5 mt-3">
                        <div
                            className="bg-primary h-1.5 rounded-full"
                            style={{ width: "62%" }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
