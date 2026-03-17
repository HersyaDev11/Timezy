import { useNotes } from "../../context/NotesContext";

export default function NoteHistoryModal({ note, onClose }) {
    const { restoreNoteSnapshot } = useNotes();

    const handleRestore = (index) => {
        restoreNoteSnapshot(note.id, index);
        onClose();
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("id-ID", {
            year: "numeric", month: "short", day: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
    };

    // Make sure we have a valid history array
    const history = note?.history || [];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col animate-slide-up">
                
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">history</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-slate-200">Riwayat Simpanan</h3>
                            <p className="text-xs text-slate-500">Pilih versi untuk dipulihkan</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto max-h-[60vh]">
                    {history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700 mb-2">
                                update_disabled
                            </span>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Belum ada riwayat</p>
                            <p className="text-xs text-slate-500">Klik "Simpan" di editor untuk menyimpan versi.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Versi Saat Ini - Terauto-Simpan</span>
                            </div>
                            
                            <div className="relative pl-3 border-l-2 border-slate-200 dark:border-slate-800 flex flex-col gap-4 ml-1 my-2">
                                {history.map((snapshot, index) => (
                                    <div key={index} className="relative bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700 group hover:border-primary/50 transition-colors">
                                        {/* Timeline dot */}
                                        <div className="absolute -left-[19px] top-4 w-3 h-3 rounded-full bg-primary border-[3px] border-white dark:border-surface-dark"></div>
                                        
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-0.5">
                                                    {formatDate(snapshot.timestamp)}
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                                    {snapshot.isAutoSave ? "(Penyimpanan Otomatis sebelum pemulihan)" : "Tersimpan Manual"}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleRestore(index)}
                                                className="shrink-0 px-2.5 py-1 bg-primary text-white text-[10px] uppercase font-bold tracking-wider rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
                                            >
                                                Pulihkan
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
