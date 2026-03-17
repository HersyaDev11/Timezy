import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useScheduleNotifications } from "../../hooks/useScheduleNotifications";
import FocusConfigModal from "../dashboard/FocusConfigModal";

export default function Sidebar({ onClose }) {
    const { isSupported, permission, requestPermission } = useScheduleNotifications();
    const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <aside className="flex w-64 lg:w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shrink-0 h-full overflow-y-auto">
            <div className="flex flex-col gap-4 p-4 h-full">
                {/* Mobile Header inside Sidebar */}
                <div className="flex lg:hidden justify-between items-center mb-2">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">schedule</span>
                        Timezy
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* User Profile */}
                <div className="flex gap-3 items-center mb-2 lg:mb-4">
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
                            Taufan
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-normal">
                            Semester 6
                        </p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 flex-1">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-primary/10 text-primary dark:bg-[#283039] dark:text-white font-semibold"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E293B] font-medium"
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
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E293B] font-medium"
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
                    <NavLink
                        to="/tugas"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-primary/10 text-primary dark:bg-[#283039] dark:text-white font-semibold"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E293B] font-medium"
                            }`
                        }
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                        >
                            checklist
                        </span>
                        <span className="text-sm font-medium">Tugas</span>
                    </NavLink>
                    <NavLink
                        to="/fokus"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-primary/10 text-primary dark:bg-[#283039] dark:text-white font-semibold"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E293B] font-medium"
                            }`
                        }
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                        >
                            timer
                        </span>
                        <span className="text-sm font-medium">Fokus</span>
                    </NavLink>
                    <NavLink
                        to="/catatan"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-primary/10 text-primary dark:bg-[#283039] dark:text-white font-semibold"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E293B] font-medium"
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
                </nav>

                {/* Notification Settings */}
                {isSupported && permission !== 'granted' && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mt-auto">
                        <div className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-amber-500 text-lg">
                                notifications_active
                            </span>
                            <div className="flex-1">
                                <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 mb-1">
                                    Aktifkan Pengingat
                                </h4>
                                <p className="text-[10px] text-amber-700 dark:text-amber-500 mb-2 leading-tight">
                                    Dapatkan notifikasi sebelum jadwal Anda dimulai.
                                </p>
                                <button
                                    onClick={requestPermission}
                                    className="text-[10px] font-bold bg-amber-500 text-white px-2 py-1 rounded w-full hover:bg-amber-600 transition-colors"
                                >
                                    Izinkan Notifikasi
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Start Focus Button */}
                <button 
                    onClick={() => setIsFocusModalOpen(true)}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-3 px-4 bg-primary hover:bg-blue-600 text-white shadow-lg shadow-primary/30 transition-all mt-4"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        play_arrow
                    </span>
                    <span className="text-sm font-bold tracking-wide">
                        Mulai Sesi Fokus
                    </span>
                </button>
                <button onClick={() => navigate("/")} className="flex w-full cursor-pointer items-center justify-center rounded-lg py-3 px-4 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-primary/30 transition-all mt-1">
                    <span className="material-symbols-outlined text-[20px]">
                        logout
                    </span>
                    <span className="text-sm font-bold tracking-wide">
                        Log out
                    </span>
                </button>
            </div>

            {/* Render Focus Modal if open */}
            {isFocusModalOpen && (
                <FocusConfigModal onClose={() => setIsFocusModalOpen(false)} />
            )}
        </aside>
    );
}
