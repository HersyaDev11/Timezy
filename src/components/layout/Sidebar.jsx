import { NavLink } from "react-router-dom";

export default function Sidebar() {

    return (
        <aside className="flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111418] shrink-0 h-full overflow-y-auto">
            <div className="flex flex-col gap-4 p-4 h-full">
                {/* User Profile */}
                <div className="flex gap-3 items-center mb-4">
                    <div
                        className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 border-2 border-primary"
                        data-alt="Profile picture of a male student"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuChwnY4a6b2ILynVX6jjVR4f_ys0UphyMZnKNhyTa5uQwowmL8paJvn1C_j3ksanqtOm9iUVN6tIkzAUR476COLF3EX2TZTLwkaQzlhijcU4LIBZ-1jxSghaL7zYS1GifLB39kEzajuIf2qNKmmBgzMtw5PyE2yFe_AS44H2IY5TuZnZPQQAyvlsHy4O13eYrFWRVwA7-iBOmVWw6i3jTu6HjzEsnjdt-_RhW3rzE4gHG9QyLqE1rthSDcUvd3q6tlY1_3QDCMFi8zU")',
                        }}
                    ></div>
                    <div className="flex flex-col">
                        <h1 className="text-slate-900 dark:text-white text-base font-bold leading-tight">
                            Mahasiswa Central
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-normal">
                            Semester 4
                        </p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 flex-1">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-primary/10 text-primary dark:bg-[#283039] dark:text-white font-semibold"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1c2632] font-medium"
                            }`
                        }
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                        >
                            dashboard
                        </span>
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/jadwal"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-primary/10 text-primary dark:bg-[#283039] dark:text-white font-semibold"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1c2632] font-medium"
                            }`
                        }
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                        >
                            calendar_month
                        </span>
                        <span>Jadwal</span>
                    </NavLink>
                    <a
                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1c2632] transition-colors"
                        href="#"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                        >
                            checklist
                        </span>
                        <span className="text-sm font-medium">Tugas</span>
                    </a>
                    <a
                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1c2632] transition-colors"
                        href="#"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                        >
                            timer
                        </span>
                        <span className="text-sm font-medium">Fokus</span>
                    </a>
                    <NavLink
                        to="/catatan"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-primary/10 text-primary dark:bg-[#283039] dark:text-white font-semibold"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1c2632] font-medium"
                            }`
                        }
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                        >
                            description
                        </span>
                        <span>Catatan</span>
                    </NavLink>
                    <a
                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1c2632] transition-colors"
                        href="#"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                        >
                            settings
                        </span>
                        <span className="text-sm font-medium">Pengaturan</span>
                    </a>
                </nav>

                {/* Start Focus Button */}
                <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-3 px-4 bg-primary hover:bg-blue-600 text-white shadow-lg shadow-primary/30 transition-all">
                    <span className="material-symbols-outlined text-[20px]">
                        play_arrow
                    </span>
                    <span className="text-sm font-bold tracking-wide">
                        Mulai Sesi Fokus
                    </span>
                </button>
            </div>
        </aside>
    );
}
