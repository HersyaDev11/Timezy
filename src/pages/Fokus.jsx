import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Fokus() {
    const [searchParams] = useSearchParams();
    const initialMinutes = parseInt(searchParams.get("m")) || 25;
    
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
    const [isActive, setIsActive] = useState(false);
    
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Optionally play a sound or show browser notification here
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);
    
    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(initialMinutes * 60);
    };
    
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        
        if (h > 0) {
            return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    // Timer text is rendered directly below, no circle calculations needed.

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto gap-8 py-8 animate-[fadeIn_0.5s_ease-out]">
            <div className="text-center w-full">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Mode Fokus</h1>
                <p className="text-slate-500 dark:text-slate-400">Kurangi gangguan dan capai targetmu hari ini.</p>
            </div>

            {/* Timer Display */}
            <div className="relative flex justify-center items-center py-12">
                <div className="text-7xl md:text-8xl font-mono font-bold text-slate-900 dark:text-white tracking-widest">
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 w-full max-w-xs">
                <button
                    onClick={toggleTimer}
                    className={`flex-1 py-4 px-6 rounded-2xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isActive 
                            ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30' 
                            : 'bg-primary hover:bg-blue-600 shadow-primary/30'
                    }`}
                >
                    <span className="material-symbols-outlined text-2xl">
                        {isActive ? 'pause' : 'play_arrow'}
                    </span>
                    {isActive ? 'Jeda' : 'Mulai'}
                </button>
                <button
                    onClick={resetTimer}
                    className="w-16 h-16 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center shadow-sm transition-all cursor-pointer"
                    title="Ulangi"
                >
                    <span className="material-symbols-outlined text-2xl">replay</span>
                </button>
            </div>

            {/* Simple Task Checklist Snippet integrated into focus page */}
            <div className="w-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm mt-4">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">task_alt</span>
                    Target Fokus Saat Ini
                </h3>
                <div className="flex bg-slate-50 dark:bg-[#1E293B] rounded-xl p-1 mb-4">
                    <input 
                        type="text" 
                        placeholder="Apa yang ingin Anda selesaikan?" 
                        className="flex-1 bg-transparent border-none px-4 py-2 text-sm focus:outline-none text-slate-900 dark:text-white"
                    />
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-blue-600 transition-colors cursor-pointer">
                        Set Target
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
