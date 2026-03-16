import { useState, useEffect } from "react";
import Header from "../components/layout/Header";

export default function Fokus() {
    const WORK_TIME = 25 * 60; // 25 minutes
    const BREAK_TIME = 5 * 60; // 5 minutes

    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("work"); // 'work' or 'break'

    useEffect(() => {
        let interval;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Timer finished
            setIsRunning(false);
            if (mode === "work") {
                setMode("break");
                setTimeLeft(BREAK_TIME);
                // Optional: play sound here
            } else {
                setMode("work");
                setTimeLeft(WORK_TIME);
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, mode]);

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(mode === "work" ? WORK_TIME : BREAK_TIME);
    };

    const switchMode = (newMode) => {
        setIsRunning(false);
        setMode(newMode);
        setTimeLeft(newMode === "work" ? WORK_TIME : BREAK_TIME);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const progress = mode === "work" 
        ? ((WORK_TIME - timeLeft) / WORK_TIME) * 100
        : ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100;

    return (
        <div className="flex flex-col gap-6 w-full h-full">
            <Header />

            <div className="flex-1 flex flex-col items-center py-8">
                <div className="bg-white dark:bg-[#111418] rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm w-full max-w-2xl flex flex-col items-center relative overflow-hidden">
                    
                    {/* Background decoration based on mode */}
                    <div className={`absolute -top-32 -left-32 w-64 h-64 rounded-full blur-3xl opacity-20 ${mode === 'work' ? 'bg-primary' : 'bg-green-500'}`}></div>
                    <div className={`absolute -bottom-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-20 ${mode === 'work' ? 'bg-blue-300' : 'bg-green-300'}`}></div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 z-10">
                        Sesi Fokus
                    </h2>

                    {/* Mode selector */}
                    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-10 z-10">
                        <button
                            onClick={() => switchMode("work")}
                            className={`px-6 py-2 text-sm font-semibold rounded-lg transition-colors ${
                                mode === "work"
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            }`}
                        >
                            Fokus (25m)
                        </button>
                        <button
                            onClick={() => switchMode("break")}
                            className={`px-6 py-2 text-sm font-semibold rounded-lg transition-colors ${
                                mode === "break"
                                    ? "bg-green-500 text-white shadow-md shadow-green-500/20"
                                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            }`}
                        >
                            Istirahat (5m)
                        </button>
                    </div>

                    {/* Timer Circle */}
                    <div className="relative w-64 h-64 flex items-center justify-center mb-10 z-10">
                        {/* SVG Circular Progress */}
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                            <circle
                                cx="128"
                                cy="128"
                                r="120"
                                className="stroke-slate-100 dark:stroke-slate-800"
                                strokeWidth="8"
                                fill="none"
                            />
                            <circle
                                cx="128"
                                cy="128"
                                r="120"
                                className={`transition-all duration-1000 ease-linear ${mode === 'work' ? 'stroke-primary' : 'stroke-green-500'}`}
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={120 * 2 * Math.PI}
                                strokeDashoffset={(120 * 2 * Math.PI) * (1 - progress / 100)}
                            />
                        </svg>

                        <div className="flex flex-col items-center">
                            <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                                {formatTime(timeLeft)}
                            </span>
                            <span className={`text-sm font-medium mt-2 ${mode === 'work' ? 'text-primary' : 'text-green-500'}`}>
                                {mode === 'work' ? 'Sedang Fokus' : 'Waktu Istirahat'}
                            </span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4 z-10">
                        <button
                            onClick={toggleTimer}
                            className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 ${
                                isRunning 
                                    ? 'bg-amber-500 shadow-amber-500/30 hover:bg-amber-600' 
                                    : mode === 'work' 
                                        ? 'bg-primary shadow-primary/30 hover:bg-blue-600'
                                        : 'bg-green-500 shadow-green-500/30 hover:bg-green-600'
                            }`}
                        >
                            <span className="material-symbols-outlined text-3xl">
                                {isRunning ? "pause" : "play_arrow"}
                            </span>
                        </button>
                        
                        <button
                            onClick={resetTimer}
                            className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            title="Reset Timer"
                        >
                            <span className="material-symbols-outlined text-xl">
                                replay
                            </span>
                        </button>
                    </div>
                </div>
                
                {/* Motivation Text */}
                <div className="mt-8 text-center max-w-md">
                    <p className="text-slate-500 dark:text-slate-400 italic">
                        {mode === 'work' 
                            ? '"Konsentrasi penuh selama 25 menit akan lebih efektif daripada berjam-jam belajar dengan distraksi."' 
                            : '"Istirahatkan mata dan pikiran Anda sejenak. Regangkan badan Anda."'}
                    </p>
                </div>
            </div>
        </div>
    );
}
