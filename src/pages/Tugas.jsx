import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import Header from "../components/layout/Header";

export default function Tugas() {
    const { tasks, addTask, toggleTask, deleteTask } = useContext(TaskContext);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    const activeTasksCount = tasks.filter(t => !t.completed).length;

    return (
        <div className="flex flex-col gap-6 w-full">
            <Header />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Task List Area */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Add Task Form */}
                    <div className="bg-white dark:bg-[#111418] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                            Tambah Tugas Baru
                        </h2>
                        <form onSubmit={handleAddTask} className="flex gap-3">
                            <input
                                type="text"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                placeholder="Apa yang ingin Anda kerjakan?"
                                className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-500"
                            />
                            <button
                                type="submit"
                                disabled={!newTaskTitle.trim()}
                                className="bg-primary hover:bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined">add</span>
                                Tambah
                            </button>
                        </form>
                    </div>

                    {/* Task List */}
                    <div className="bg-white dark:bg-[#111418] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Daftar Tugas
                            </h2>
                            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                                <button
                                    onClick={() => setFilter("all")}
                                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                                        filter === "all"
                                            ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                    }`}
                                >
                                    Semua
                                </button>
                                <button
                                    onClick={() => setFilter("active")}
                                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                                        filter === "active"
                                            ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                    }`}
                                >
                                    Aktif
                                </button>
                                <button
                                    onClick={() => setFilter("completed")}
                                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                                        filter === "completed"
                                            ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                    }`}
                                >
                                    Selesai
                                </button>
                            </div>
                        </div>

                        {filteredTasks.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {filteredTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                                            task.completed
                                                ? "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 opacity-75"
                                                : "bg-white dark:bg-[#111418] border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary/30 dark:hover:border-primary/30"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <button
                                                onClick={() => toggleTask(task.id)}
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                                    task.completed
                                                        ? "bg-primary border-primary"
                                                        : "border-slate-300 dark:border-slate-600 hover:border-primary"
                                                }`}
                                            >
                                                {task.completed && (
                                                    <span className="material-symbols-outlined text-white text-sm">
                                                        check
                                                    </span>
                                                )}
                                            </button>
                                            <div className="flex flex-col">
                                                <span
                                                    className={`text-sm font-medium ${
                                                        task.completed
                                                            ? "text-slate-500 line-through"
                                                            : "text-slate-900 dark:text-white"
                                                    }`}
                                                >
                                                    {task.title}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {task.category}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="text-slate-400 hover:text-red-500 transition-colors p-2"
                                            title="Hapus"
                                        >
                                            <span className="material-symbols-outlined text-xl">
                                                delete
                                            </span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                                <span className="material-symbols-outlined text-4xl mb-4 text-slate-300 dark:text-slate-600">
                                    task
                                </span>
                                <p className="text-sm font-medium">Belum ada tugas di sini.</p>
                                <p className="text-xs mt-1">Tambahkan tugas baru untuk mulai melacak pekerjaan Anda.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="flex flex-col gap-6">
                    <div className="bg-primary/10 dark:bg-primary/5 border border-primary/20 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                            Ringkasan Tugas
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                            Tetap produktif dan selesaikan target Anda hari ini.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                <p className="text-xs font-semibold text-slate-500 mb-1">Total Aktif</p>
                                <p className="text-2xl font-bold text-primary">{activeTasksCount}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                <p className="text-xs font-semibold text-slate-500 mb-1">Diselesaikan</p>
                                <p className="text-2xl font-bold text-green-500">{tasks.length - activeTasksCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
