export default function FocusTimer() {
    return (
        <div className="bg-gradient-to-b from-surface-highlight to-surface-dark rounded-xl border border-slate-700 p-6 flex flex-col items-center justify-center text-center shadow-lg">
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
                    <span className="text-xs text-slate-400 mt-1">Fokus</span>
                </div>
            </div>
            <div className="flex gap-4 w-full">
                <button className="flex-1 cursor-pointer bg-primary hover:bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-lg shadow-primary/20 transition-all">
                    Mulai
                </button>
                <button className="w-12 bg-slate-700 cursor-pointer hover:bg-slate-600 text-white rounded-lg flex items-center justify-center transition-all">
                    <span className="material-symbols-outlined">settings</span>
                </button>
            </div>
        </div>
    );
}
