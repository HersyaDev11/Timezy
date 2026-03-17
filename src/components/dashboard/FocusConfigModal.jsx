import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FocusConfigModal({ onClose }) {
    const navigate = useNavigate();
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(25);

    const handleStart = () => {
        const totalMinutes = (parseInt(hours) || 0) * 60 + (parseInt(minutes) || 0);
        if (totalMinutes > 0) {
            navigate(`/fokus?m=${totalMinutes}`);
        }
    };

    const applyRecommendation = (h, m) => {
        setHours(h);
        setMinutes(m);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-slide-up">
                
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-[#18212c]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">timer</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Set Timer Fokus</h3>
                            <p className="text-sm text-slate-500 font-medium">Berapa lama kamu ingin fokus?</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6">
                    {/* Time Inputs */}
                    <div className="flex justify-center items-center gap-6 mb-8">
                        <div className="flex flex-col items-center">
                            <input
                                type="number"
                                value={hours}
                                onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-24 h-24 text-center text-5xl font-mono font-bold bg-slate-100 dark:bg-slate-800 border items-center justify-center rounded-2xl border-transparent focus:border-primary focus:bg-white dark:focus:bg-surface-dark transition-all outline-none text-slate-800 dark:text-white"
                                min="0"
                            />
                            <span className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">Jam</span>
                        </div>
                        <span className="text-4xl font-black text-slate-300 dark:text-slate-700 pb-6">:</span>
                        <div className="flex flex-col items-center">
                            <input
                                type="number"
                                value={minutes}
                                onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-24 h-24 text-center text-5xl font-mono font-bold bg-slate-100 dark:bg-slate-800 border items-center justify-center rounded-2xl border-transparent focus:border-primary focus:bg-white dark:focus:bg-surface-dark transition-all outline-none text-slate-800 dark:text-white"
                                min="0"
                                max="59"
                            />
                            <span className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">Menit</span>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="mb-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Metode Rekomendasi</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* Pomodoro */}
                            <button 
                                onClick={() => applyRecommendation(0, 25)}
                                className="flex flex-col text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer"
                            >
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">Pomodoro Klasik</span>
                                <span className="text-xs text-slate-500">25 Menit Fokus</span>
                            </button>
                            {/* Deep Work */}
                            <button 
                                onClick={() => applyRecommendation(0, 50)}
                                className="flex flex-col text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group cursor-pointer"
                            >
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-500 transition-colors">Sesi &quot;Deep Work&quot;</span>
                                <span className="text-xs text-slate-500">50 Menit Fokus Penuh</span>
                            </button>
                            {/* Short */}
                            <button 
                                onClick={() => applyRecommendation(0, 15)}
                                className="flex flex-col text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group cursor-pointer"
                            >
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-500 transition-colors">Sesi Kilat</span>
                                <span className="text-xs text-slate-500">15 Menit Cepat</span>
                            </button>
                            {/* Long */}
                            <button 
                                onClick={() => applyRecommendation(1, 30)}
                                className="flex flex-col text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group cursor-pointer"
                            >
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 transition-colors">Maraton Belajar</span>
                                <span className="text-xs text-slate-500">1 Jam 30 Menit</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#18212c] flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={handleStart}
                        className="px-6 py-2.5 rounded-xl font-bold text-sm bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/30 transition-all flex items-center gap-2 cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                        Mulai Fokus
                    </button>
                </div>
            </div>
        </div>
    );
}
