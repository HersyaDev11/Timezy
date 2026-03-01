import { useState } from "react";
import ChatPanel from "./ChatPanel";

export default function NoteSidebar() {
    const [view, setView] = useState("context"); // 'context' or 'chat'

    return (
        <aside className="w-80 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hidden xl:flex flex-col h-full shrink-0">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
                <h3 className="font-bold text-slate-800 dark:text-slate-200">Asisten Belajar</h3>
                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
                    <button
                        onClick={() => setView('context')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${view === 'context' ? 'bg-white dark:bg-[#1c2632] shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        Konteks
                    </button>
                    <button
                        onClick={() => setView('chat')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${view === 'chat' ? 'bg-white dark:bg-[#1c2632] shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        <span className="material-symbols-outlined text-[14px]">psychology</span>
                        Chat
                    </button>
                </div>
            </div>

            {view === 'chat' ? (
                <div className="flex-1 overflow-hidden p-3 pt-4">
                    <ChatPanel />
                </div>
            ) : (

                <div className="flex-1 overflow-y-auto hidden-scrollbar p-4 flex flex-col gap-6">

                    {/* AI Suggestion Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-indigo-500 text-[20px]">psychology</span>
                            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase shrink-0">Saran Cerdas</span>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                            Saya mendeteksi 3 tugas potensial dalam catatan ini. Ingin saya sinkronkan ke daftar jadwal Anda?
                        </p>
                        <button className="w-full bg-indigo-600 text-white border border-transparent rounded-lg py-2 cursor-pointer text-xs font-bold shadow-sm hover:bg-indigo-700 transition-all">
                            Ya, Sinkronkan
                        </button>
                    </div>

                    {/* Related Notes */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Catatan Terkait</h4>
                        <div className="flex flex-col gap-2">
                            <a href="#" className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-[#1c2632] transition-all group">
                                <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1 group-hover:text-primary transition-colors">Pengenalan Waterfall</h5>
                                <p className="text-xs text-slate-500 line-clamp-2">Perbedaan mendasar antara metode klasik waterfall dan agile modern...</p>
                            </a>
                            <a href="#" className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-[#1c2632] transition-all group">
                                <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1 group-hover:text-primary transition-colors">Kanban Board</h5>
                                <p className="text-xs text-slate-500 line-clamp-2">Visualisasi alur kerja menggunakan papan Kanban untuk efisiensi.</p>
                            </a>
                        </div>
                    </div>

                    {/* Integration Calendar Widget */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Relevansi Jadwal</h4>
                        <div className="bg-slate-50 dark:bg-[#1c2632] rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                                <div className="flex flex-col items-center justify-center w-10 h-10 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 shadow-sm shrink-0">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase">Mar</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">05</span>
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">Pengantaran Tugas</h5>
                                    <p className="text-xs text-slate-500">10:00 AM • Laporan Agile</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </aside>
    );
}
