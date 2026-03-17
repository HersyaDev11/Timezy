import { Droppable } from "@hello-pangea/dnd";
import KanbanCard from "./KanbanCard";

export default function KanbanColumn({ column, tasks, onAddTask, onEditTask }) {
    // Stylings based on column ID
    const getHeaderStyles = () => {
        switch (column.id) {
            case 'todo': return 'bg-slate-100/80 text-slate-600 dark:bg-slate-800/80 dark:text-slate-300';
            case 'inProgress': return 'bg-blue-50/80 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400';
            case 'done': return 'bg-emerald-50/80 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    const getDotColor = () => {
        switch (column.id) {
            case 'todo': return 'bg-slate-400 dark:bg-slate-500';
            case 'inProgress': return 'bg-blue-500';
            case 'done': return 'bg-emerald-500';
            default: return 'bg-slate-400';
        }
    };

    return (
        <div className="flex flex-col w-full min-w-[300px] max-w-[350px] shrink-0">
            {/* Column Header */}
            <div className={`flex items-center justify-between p-3 rounded-xl mb-3 border border-transparent dark:border-slate-800 ${getHeaderStyles()}`}>
                <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${getDotColor()}`}></div>
                    <h3 className="font-bold text-sm tracking-wide">
                        {column.title}
                    </h3>
                </div>
                <div className="text-xs font-bold bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded-md">
                    {tasks.length}
                </div>
            </div>

            {/* Droppable Area */}
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div 
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                        className={`flex-1 rounded-2xl p-2 min-h-[150px] transition-colors ${
                            snapshot.isDraggingOver 
                                ? 'bg-primary/5 dark:bg-primary/10 border-2 border-dashed border-primary/30' 
                                : 'bg-slate-50 dark:bg-surface-dark border-2 border-transparent'
                        }`}
                    >
                        {/* Task List */}
                        <div className="flex flex-col">
                            {tasks.map((task, index) => (
                                <KanbanCard key={task.id} task={task} index={index} onEdit={onEditTask} />
                            ))}
                            {provided.placeholder}
                        </div>

                        {/* Add Task Button */}
                        <button 
                            onClick={() => onAddTask(column.id)}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold text-sm hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary hover:bg-primary/5 transition-all mt-1"
                        >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            Tugas Baru
                        </button>
                    </div>
                )}
            </Droppable>
        </div>
    );
}
