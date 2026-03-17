import { useState, useEffect } from "react";

export default function TaskModal({ isOpen, onClose, onSave, onDelete, initialData, defaultColumnTitle }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setTitle(initialData.title || "");
                setDescription(initialData.description || "");
                setPriority(initialData.priority || "Medium");
            } else {
                setTitle("");
                setDescription("");
                setPriority("Medium");
            }
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (!title.trim()) return;
        onSave({ title, description, priority });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-slide-up">
                
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-[#18212c]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">{initialData ? 'edit_square' : 'add_task'}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">
                                {initialData ? "Edit Tugas" : "Tugas Baru"}
                            </h3>
                            <p className="text-sm text-slate-500 font-medium max-w-[250px] truncate">
                                di kolom <span className="font-bold">{defaultColumnTitle}</span>
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 flex flex-col gap-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            Judul Tugas
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Mengerjakan laporan..."
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-semibold"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            Deskripsi Singkat
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tambahkan detail tugas..."
                            rows="3"
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-none"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            Prioritas
                        </label>
                        <div className="flex gap-3">
                            {['High', 'Medium', 'Low'].map(pLevel => (
                                <button
                                    key={pLevel}
                                    onClick={() => setPriority(pLevel)}
                                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
                                        priority === pLevel 
                                            ? pLevel === 'High' ? 'bg-red-50 dark:bg-red-900/30 border-red-500 text-red-600 dark:text-red-400'
                                            : pLevel === 'Medium' ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-500 text-amber-600 dark:text-amber-400'
                                            : 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'
                                    }`}
                                >
                                    {pLevel}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#18212c] flex justify-between items-center gap-3">
                    {initialData ? (
                        <button 
                            onClick={onDelete}
                            className="px-4 py-2.5 rounded-xl font-bold text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer flex items-center gap-1"
                            title="Hapus"
                        >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                            Hapus
                        </button>
                    ) : (
                        <div></div>
                    )}
                    <div className="flex gap-3">
                        <button 
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                            Batal
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={!title.trim()}
                            className="px-6 py-2.5 rounded-xl font-bold text-sm bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
