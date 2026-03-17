import { useNotes } from "../context/NotesContext";
import NoteEditor from "../components/catatan/NoteEditor";
import NoteSidebar from "../components/catatan/NoteSidebar";
import NoteExplorer from "../components/catatan/NoteExplorer";

export default function Catatan() {
    const { activeNoteId } = useNotes();

    return (
        <div className="flex w-full h-full gap-4 p-4 lg:p-6 relative">
            {!activeNoteId ? (
                /* Explorer View */
                <NoteExplorer />
            ) : (
                /* Editor View */
                <>
                    {/* Main Editor Section */}
                    <div className="flex-1 min-w-0">
                        <NoteEditor />
                    </div>

                    {/* Right Sidebar Section */}
                    <NoteSidebar />
                </>
            )}

            {/* Floating Action Button (Mobile Only) */}
            <button className="md:hidden absolute bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform z-30 cursor-pointer">
                <span className="material-symbols-outlined text-2xl">edit</span>
            </button>
        </div>
    );
}
