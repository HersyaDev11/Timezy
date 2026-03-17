import { useState } from "react";
import FocusConfigModal from "./FocusConfigModal";

export default function FocusTimer() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-gradient-to-b from-surface-highlight to-surface-dark rounded-xl border border-slate-700 p-6 flex flex-col items-center justify-center text-center shadow-lg h-full">
            <h3 className="text-slate-200 text-sm font-semibold uppercase tracking-wider mb-4">
                Pomodoro Timer
            </h3>
            <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
                {/* SVG Circular Progress */}
                <svg className="transform -rotate-90 w-full h-full">
                    <circle
                        className="text-slate-700"
                        cx="80"
                        cy="80"
                        fill="transparent"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="8"
                    ></circle>
                    <circle
                        className="text-primary"
                        cx="80"
                        cy="80"
                        fill="transparent"
                        r="70"
                        stroke="currentColor"
                        strokeDasharray="440"
                        strokeDashoffset="110"
                        strokeLinecap="round"
                        strokeWidth="8"
                    ></circle>
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-mono font-bold text-white tracking-wider">
                        25:00
                    </span>
                    <span className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">Pomodoro</span>
                </div>
            </div>
            <div className="flex gap-4 w-full">
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 cursor-pointer bg-primary hover:bg-blue-600 text-white py-2.5 rounded-xl font-bold shadow-lg shadow-primary/30 transition-all flex justify-center items-center gap-2"
                >
                    <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                    Mulai Sesi
                </button>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-12 h-11 cursor-pointer bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-xl flex items-center justify-center transition-all border border-slate-600"
                    title="Pengaturan Timer"
                >
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                </button>
            </div>

            {isModalOpen && <FocusConfigModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}
