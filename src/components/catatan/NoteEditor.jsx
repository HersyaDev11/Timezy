import { useNotes } from "../../context/NotesContext";

export default function NoteEditor() {
    const { activeNote, updateNote, deleteNote, setActiveNoteId } = useNotes();

    if (!activeNote) {
        return (
            <div className="flex-1 flex flex-col h-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm items-center justify-center text-center p-8">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-3xl">edit_document</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Pilih Catatan</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                    Pilih catatan dari daftar di sebelah kiri atau buat catatan baru untuk mulai menulis.
                </p>
            </div>
        );
    }

    const handleTitleChange = (e) => {
        updateNote(activeNote.id, { title: e.target.value });
    };

    const handleContentChange = (e) => {
        updateNote(activeNote.id, { content: e.target.value });
    };

    return (
        <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
            {/* Breadcrumb & Header */}
            <div className="flex flex-col gap-4 px-6 py-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <button
                        onClick={() => setActiveNoteId(null)}
                        className="flex items-center gap-1 hover:text-primary transition-colors text-slate-600 dark:text-slate-400 font-bold"
                        title="Kembali ke Catatan"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    </button>
                    <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1"></div>
                    <span className="hover:text-primary transition-colors cursor-pointer">{activeNote.course || "Umum"}</span>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <span className="text-slate-900 dark:text-slate-200 font-medium">Draft</span>
                </div>
                <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex flex-col gap-1.5 w-full mx-auto max-w-4xl">
                        <input
                            className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white bg-transparent border-none focus:ring-0 p-0 placeholder:text-slate-400 w-full"
                            placeholder="Judul Catatan"
                            type="text"
                            value={activeNote.title}
                            onChange={handleTitleChange}
                        />
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                Terakhir diedit: {new Date(activeNote.lastEdited).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span>•</span>
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                                {activeNote.category}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="px-6 py-2 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 shrink-0 bg-slate-50/50 dark:bg-slate-900/40">
                <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 overflow-x-auto pb-1 md:pb-0">
                    <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded transition-colors" title="Bold">
                        <span className="material-symbols-outlined text-[20px]">format_bold</span>
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded transition-colors" title="Italic">
                        <span className="material-symbols-outlined text-[20px]">format_italic</span>
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded transition-colors" title="Underline">
                        <span className="material-symbols-outlined text-[20px]">format_underlined</span>
                    </button>

                    <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-2"></div>

                    <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded transition-colors" title="H1">
                        <span className="material-symbols-outlined text-[20px]">title</span>
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded transition-colors" title="Bullet List">
                        <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded transition-colors" title="Numbered List">
                        <span className="material-symbols-outlined text-[20px]">format_list_numbered</span>
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded transition-colors" title="Checklist">
                        <span className="material-symbols-outlined text-[20px]">check_box</span>
                    </button>

                    <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-2"></div>

                    <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded transition-colors" title="Insert Link">
                        <span className="material-symbols-outlined text-[20px]">link</span>
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded transition-colors" title="Insert Image">
                        <span className="material-symbols-outlined text-[20px]">image</span>
                    </button>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={() => deleteNote(activeNote.id)}
                        className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all text-xs font-bold"
                        title="Hapus Catatan"
                    >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        <span className="hidden sm:inline">Hapus</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-all text-xs font-bold border border-primary/20">
                        <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
                        <span>Ubah ke Tugas</span>
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8 scroll-smooth">
                <div className="max-w-4xl mx-auto h-full pb-32 prose prose-slate dark:prose-invert">
                    <textarea
                        className="w-full h-full bg-transparent border-none resize-none focus:ring-0 p-0 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
                        placeholder="Mulai menulis catatan di sini..."
                        value={activeNote.content}
                        onChange={handleContentChange}
                    />
                </div>
            </div>
        </div>
    );
}
