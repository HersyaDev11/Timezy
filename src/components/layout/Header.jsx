export default function Header() {
    return (
        <header className="flex justify-between items-end flex-wrap gap-4">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Selamat Pagi, Alex! 👋
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base font-medium">
                    Siap untuk menaklukkan hari ini?
                </p>
            </div>
            <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Minggu, 1 Maret
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Minggu 1 - Semester Genap
                    </p>
                </div>
                <div className="h-10 w-10 bg-slate-200 dark:bg-surface-dark rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                </div>
            </div>
        </header>
    );
}
