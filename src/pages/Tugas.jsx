import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useTasks } from "../context/TaskContext";
import KanbanColumn from "../components/tugas/KanbanColumn";
import TaskModal from "../components/tugas/TaskModal";

export default function Tugas() {
    const { columns, moveTask, addTask, updateTask, deleteTask } = useTasks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        mode: 'add', // 'add' or 'edit'
        columnId: null,
        initialData: null
    });

    const onDragEnd = (result) => {
        const { source, destination } = result;
        // Dropped outside the list
        if (!destination) return;
        moveTask(source, destination);
    };

    const handleOpenAddModal = (columnId) => {
        setModalConfig({ mode: 'add', columnId, initialData: null });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (task, columnId) => {
        setModalConfig({ mode: 'edit', columnId, initialData: task });
        setIsModalOpen(true);
    };

    const handleSaveTask = (taskData) => {
        if (modalConfig.mode === 'add') {
            addTask(modalConfig.columnId, taskData);
        } else {
            updateTask(modalConfig.columnId, modalConfig.initialData.id, taskData);
        }
        setIsModalOpen(false);
    };

    const handleDeleteTask = () => {
        if (modalConfig.mode === 'edit' && modalConfig.initialData) {
            deleteTask(modalConfig.columnId, modalConfig.initialData.id);
            setIsModalOpen(false);
        }
    };

    // Find the title of the column the modal is currently operating on
    const currentColumnTitle = modalConfig.columnId ? columns[modalConfig.columnId].title : "";

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-3xl">checklist</span>
                        Papan Tugas
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
                        Kelola tugas harianmu dengan sistem kanban yang rapi.
                    </p>
                </div>
            </div>

            {/* Kanban Board Area */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden rounded-2xl bg-white/50 dark:bg-[#0f172a]/50 p-4 border border-slate-200 dark:border-slate-800">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex gap-6 h-full items-start w-max">
                        {Object.values(columns).map(col => (
                            <KanbanColumn 
                                key={col.id} 
                                column={col} 
                                tasks={col.items}
                                onAddTask={handleOpenAddModal}
                                onEditTask={(task) => handleOpenEditModal(task, col.id)}
                            />
                        ))}
                    </div>
                </DragDropContext>
            </div>

            {/* Task Creation & Editing Modal */}
            <TaskModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                onDelete={handleDeleteTask}
                initialData={modalConfig.initialData}
                defaultColumnTitle={currentColumnTitle}
            />
        </div>
    );
}
