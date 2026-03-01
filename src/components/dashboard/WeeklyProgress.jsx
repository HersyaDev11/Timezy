export default function WeeklyProgress() {
    const chartData = [
        { day: "Sen", progress: "40%", labelColor: "slate-400", bgColor: "primary/40", active: false },
        { day: "Sel", progress: "65%", labelColor: "slate-400", bgColor: "primary/60", active: false },
        { day: "Rab", progress: "85%", labelColor: "slate-400", bgColor: "primary/80", active: false },
        { day: "Kam", progress: "30%", labelColor: "slate-400", bgColor: "primary/30", active: false },
        { day: "Jum", progress: "95%", labelColor: "primary", bgColor: "primary", active: true },
        { day: "Sab", progress: "20%", labelColor: "slate-400", bgColor: "primary/20", active: false },
        { day: "Min", progress: "15%", labelColor: "slate-400", bgColor: "primary/20", active: false },
    ];

    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Aktivitas Mingguan
                </h2>
                <select className="bg-slate-100 dark:bg-[#111418] border-none text-xs text-slate-600 dark:text-slate-300 rounded-lg py-1 px-3 focus:ring-1 focus:ring-primary outline-none">
                    <option>Minggu Ini</option>
                    <option>Minggu Lalu</option>
                </select>
            </div>

            {/* Simple CSS Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-48 w-full">
                {chartData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 w-full group cursor-pointer">
                        <div className="relative w-full max-w-[40px] bg-slate-100 dark:bg-slate-800 rounded-t-lg h-full overflow-hidden flex items-end">
                            <div
                                className={`w-full transition-all duration-300 rounded-t-lg ${data.active ? "bg-primary shadow-[0_0_10px_rgba(19,127,236,0.3)]" : `bg-${data.bgColor} group-hover:bg-primary`
                                    }`}
                                style={{ height: data.progress }}
                            ></div>
                        </div>
                        <span
                            className={`text-xs ${data.active ? "font-bold text-primary" : "font-medium text-slate-400 group-hover:text-primary"
                                }`}
                        >
                            {data.day}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
