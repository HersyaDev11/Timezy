import { createContext, useContext, useState, useEffect } from "react";

const NotesContext = createContext();

export function useNotes() {
    return useContext(NotesContext);
}

export const NotesProvider = ({ children }) => {
    // Initial dummy data
    const initialNotes = [
        {
            id: "1",
            title: "Pengantar Agile",
            content: "Agile adalah pendekatan manajemen proyek yang memecah proyek besar menjadi beberapa bagian kecil yang dapat dikelola yang disebut **iterasi**. Pada akhir setiap iterasi, sesuatu yang bernilai diproduksi. Produk yang dihasilkan selama setiap sprint harus dapat digunakan oleh pelanggan.\n\nFokus utama Agile adalah kepuasan pelanggan melalui pengiriman perangkat lunak yang bernilai secara dini dan berkelanjutan.\n\n### Prinsip Utama Scrum\n- **Transparansi:** Aspek signifikan dari proses harus terlihat oleh mereka yang bertanggung jawab atas hasil.\n- **Inspeksi:** Pengguna Scrum harus sering memeriksa artefak Scrum dan kemajuan menuju Sprint Goal.\n- **Adaptasi:** Jika inspektur menentukan bahwa satu atau lebih aspek proses menyimpang di luar batas yang dapat diterima, proses harus disesuaikan.",
            category: "Kuliah",
            tags: ["Agile", "Scrum"],
            lastEdited: new Date().toISOString(),
            course: "Manajemen Proyek",
            history: [],
        },
        {
            id: "2",
            title: "Ide Proyek Akhir",
            content: "Beberapa ide untuk aplikasi akhir semester:\n- Aplikasi manajemen waktu mahasiswa\n- Platform adopsi hewan peliharaan\n- AI resume builder",
            category: "Pribadi",
            tags: ["Ide", "Proyek"],
            lastEdited: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            course: "Umum",
            history: [],
        },
    ];

    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('timezy_notes');
        if (savedNotes) {
            try {
                return JSON.parse(savedNotes);
            } catch (e) {
                console.error("Failed to parse notes from local storage", e);
                return initialNotes;
            }
        }
        return initialNotes;
    });

    // Start with null to always show the Explorer menu on load
    const [activeNoteId, setActiveNoteId] = useState(null);

    // Notification state for toast
    const [notification, setNotification] = useState(null);

    // Persist to local storage
    useEffect(() => {
        localStorage.setItem('timezy_notes', JSON.stringify(notes));
    }, [notes]);

    // Keep activeNoteId valid if the currently selected note is deleted
    useEffect(() => {
        if (activeNoteId && !notes.find(n => n.id === activeNoteId)) {
            setActiveNoteId(null);
        }
    }, [notes, activeNoteId]);

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const addNote = () => {
        const newNote = {
            id: Date.now().toString(),
            title: "Catatan Baru",
            content: "",
            category: "Umum",
            tags: [],
            lastEdited: new Date().toISOString(),
            course: "",
            history: [],
        };
        setNotes([newNote, ...notes]);
        setActiveNoteId(newNote.id);
        showNotification("Catatan baru dibuat");
    };

    const updateNote = (id, updatedData) => {
        setNotes(notes.map(note =>
            note.id === id
                ? { ...note, ...updatedData, lastEdited: new Date().toISOString() }
                : note
        ));
    };

    const createNoteSnapshot = (id) => {
        setNotes(notes.map(note => {
            if (note.id === id) {
                const newSnapshot = {
                    timestamp: new Date().toISOString(),
                    title: note.title,
                    content: note.content
                };
                // Keep only the last 10 snapshots to avoid bloating local storage
                const updatedHistory = [newSnapshot, ...(note.history || [])].slice(0, 10);
                return { ...note, history: updatedHistory, lastEdited: new Date().toISOString() };
            }
            return note;
        }));
        showNotification("Catatan berhasil disimpan ke Riwayat", "success");
    };

    const restoreNoteSnapshot = (id, snapshotIndex) => {
        setNotes(notes.map(note => {
            if (note.id === id && note.history && note.history[snapshotIndex]) {
                const snapshot = note.history[snapshotIndex];
                
                // Save current state before restoring
                const currentSnapshot = {
                    timestamp: new Date().toISOString(),
                    title: note.title,
                    content: note.content,
                    isAutoSave: true // Mark as an auto-save before restore
                };
                
                const updatedHistory = [currentSnapshot, ...note.history].slice(0, 10);

                return {
                    ...note,
                    title: snapshot.title,
                    content: snapshot.content,
                    history: updatedHistory,
                    lastEdited: new Date().toISOString()
                };
            }
            return note;
        }));
        showNotification("Catatan berhasil dipulihkan", "success");
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
        showNotification("Catatan dihapus");
    };

    const activeNote = notes.find(note => note.id === activeNoteId) || null;

    const value = {
        notes,
        activeNoteId,
        setActiveNoteId,
        activeNote,
        addNote,
        updateNote,
        deleteNote,
        showNotification,
        createNoteSnapshot,
        restoreNoteSnapshot,
    };

    return (
        <NotesContext.Provider value={value}>
            {children}
            {/* Simple internal Toast for notes context */}
            {notification && (
                <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${notification.type === 'error'
                            ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800'
                        }`}>
                        <span className="material-symbols-outlined text-[20px]">
                            {notification.type === 'error' ? 'error' : 'check_circle'}
                        </span>
                        <p className="text-sm font-semibold">{notification.message}</p>
                    </div>
                </div>
            )}
        </NotesContext.Provider>
    );
};
