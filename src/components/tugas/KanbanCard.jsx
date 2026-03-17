import { Draggable } from "@hello-pangea/dnd";

export default function KanbanCard({ task, index, onEdit }) {
    const isHigh = task.priority === 'High';
    const isMedium = task.priority === 'Medium';

    return (
        <Draggable draggableId={String(task.id)} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onEdit(task)}
                    className={`bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-3 mb-3 cursor-pointer transition-all group hover:border-primary/50 dark:hover:border-primary/50
                        ${snapshot.isDragging ? 'shadow-xl rotate-2 ring-2 ring-primary border-transparent' : 'shadow-sm'}
                    `}
                    style={{
                        ...provided.draggableProps.style,
                        // Ensure smooth visuals when dragging ends
                    }}
                >
                    <div className="flex flex-col gap-2 relative">
                        {/* Priority Badge */}
                        <div className="flex justify-between items-start">
                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                 isHigh ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                                 : isMedium ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' 
                                 : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                             }`}>
                                {task.priority}
                            </span>
                            
                            {/* Drag Handle Icon (visible on hover) */}
                            <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity text-[16px]">
                                drag_indicator
                            </span>
                        </div>
                        
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight mb-1 group-hover:text-primary transition-colors">
                                {task.title}
                            </h4>
                            {task.description && (
                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                                    {task.description}
                                </p>
                            )}
                        </div>
                        
                        {/* Footer (avatar dummy) */}
                        <div className="mt-2 flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/50 border-dashed">
                             <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold text-slate-600 dark:text-slate-300">
                                TH
                             </div>
                             <span className="text-[10px] text-slate-400 font-medium">Taufan Hidayatul</span>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
