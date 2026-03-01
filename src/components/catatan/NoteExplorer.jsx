import { useNotes } from "../../context/NotesContext";

export default function NoteExplorer() {
    const { notes, setActiveNoteId, addNote } = useNotes();

    // Helper to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6 overflow-y-auto hidden-scrollbar">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">Catatan Saya</h2>
                    <p className="text-sm text-slate-500">Kelola dan atur semua catatan Anda di satu tempat.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative w-full md:w-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Cari catatan..."
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#1c2632] border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:border-primary dark:focus:border-primary text-slate-900 dark:text-white placeholder:text-slate-500"
                        />
                    </div>
                </div>
            </div>

            {/* Quick Actions / New Note */}
            <div className="mb-8 shrink-0">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Mulai Cepat</h3>
                <div className="flex gap-4 overflow-x-auto pb-2 hidden-scrollbar">
                    <button
                        onClick={addNote}
                        className="flex-shrink-0 w-40 h-32 rounded-xl border-dashed border-2 border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined text-primary text-[24px]">add</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">Catatan Baru</span>
                    </button>
                    {/* Placeholder action cards */}
                    <button className="flex-shrink-0 w-40 h-32 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1c2632] flex flex-col gap-2 p-4 hover:border-primary/50 transition-colors text-left group">
                        <div className="text-blue-500 bg-blue-100 dark:bg-blue-900/30 w-8 h-8 rounded-lg flex items-center justify-center mb-auto">
                            <span className="material-symbols-outlined text-[18px]">menu_book</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary line-clamp-2">Template Kuliah</span>
                    </button>
                    <button className="flex-shrink-0 w-40 h-32 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1c2632] flex flex-col gap-2 p-4 hover:border-primary/50 transition-colors text-left group">
                        <div className="text-purple-500 bg-purple-100 dark:bg-purple-900/30 w-8 h-8 rounded-lg flex items-center justify-center mb-auto">
                            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary line-clamp-2">Template Ide</span>
                    </button>
                </div>
            </div>

            {/* Note Grid */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Terakhir Dibuka</h3>
                    <div className="flex items-center gap-2">
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                            <span className="material-symbols-outlined text-[20px]">grid_view</span>
                        </button>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                            <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
                        </button>
                    </div>
                </div>

                {notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-4xl text-slate-400">description</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Belum ada catatan</p>
                        <p className="text-sm text-slate-400 dark:text-slate-500">Mulai dengan membuat catatan baru</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {notes.map(note => (
                            <div
                                key={note.id}
                                onClick={() => setActiveNoteId(note.id)}
                                className="group bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-md hover:border-primary/40 dark:hover:border-primary/40 transition-all cursor-pointer flex flex-col h-48"
                            >
                                {/* Preview Content Area */}
                                <div className="p-4 flex-1 overflow-hidden bg-slate-50/50 dark:bg-[#18212c]">
                                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 truncate group-hover:text-primary transition-colors">
                                        {note.title || "Catatan Tanpa Judul"}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-4 whitespace-pre-wrap font-sans opacity-80">
                                        {note.content || "Tidak ada konten..."}
                                    </p>
                                </div>
                                {/* Footer Meta */}
                                <div className="px-4 py-3 bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${note.category === 'Kuliah' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                                        <span className="text-[10px] text-slate-500 truncate max-w-[80px]">
                                            {note.course || note.category}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-slate-400">
                                        {formatDate(note.lastEdited)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
