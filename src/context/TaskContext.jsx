import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export function useTasks() {
    return useContext(TaskContext);
}

const initialColumns = {
    "todo": {
        id: "todo",
        title: "Belum dimulai",
        items: [
            { id: "task-1", title: "Riset Kompetitor", description: "Bandingkan 3 aplikasi sejenis", priority: "Medium" },
            { id: "task-2", title: "Wireframe UI", description: "Buat wireframe kasar untuk halaman utama", priority: "High" }
        ]
    },
    "inProgress": {
        id: "inProgress",
        title: "Sedang berlangsung",
        items: [
            { id: "task-3", title: "Setup Database", description: "Inisialisasi MongoDB dan Mongoose", priority: "High" }
        ]
    },
    "done": {
        id: "done",
        title: "Selesai",
        items: [
            { id: "task-4", title: "Desain Logo", description: "Selesaikan 3 iterasi logo utama", priority: "Low" }
        ]
    }
};

export function TaskProvider({ children }) {
    const [columns, setColumns] = useState(() => {
        const saved = localStorage.getItem("timezy_tasks");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return initialColumns;
            }
        }
        return initialColumns;
    });

    useEffect(() => {
        localStorage.setItem("timezy_tasks", JSON.stringify(columns));
    }, [columns]);

    const moveTask = (source, destination) => {
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        setColumns((prev) => {
            const startColumn = prev[source.droppableId];
            const finishColumn = prev[destination.droppableId];

            if (startColumn === finishColumn) {
                // Moving within the same column
                const newItems = Array.from(startColumn.items);
                const [movedTask] = newItems.splice(source.index, 1);
                newItems.splice(destination.index, 0, movedTask);

                return {
                    ...prev,
                    [startColumn.id]: {
                        ...startColumn,
                        items: newItems
                    }
                };
            }

            // Moving to a different column
            const startItems = Array.from(startColumn.items);
            const [movedTask] = startItems.splice(source.index, 1);
            
            const finishItems = Array.from(finishColumn.items);
            finishItems.splice(destination.index, 0, movedTask);

            return {
                ...prev,
                [startColumn.id]: {
                    ...startColumn,
                    items: startItems
                },
                [finishColumn.id]: {
                    ...finishColumn,
                    items: finishItems
                }
            };
        });
    };

    const addTask = (columnId, taskData) => {
        const newTask = {
            id: `task-${Date.now()}`,
            ...taskData
        };
        
        setColumns(prev => {
            const column = prev[columnId];
            return {
                ...prev,
                [columnId]: {
                    ...column,
                    items: [...column.items, newTask]
                }
            };
        });
        return newTask;
    };

    const updateTask = (columnId, taskId, taskData) => {
        setColumns(prev => {
            const column = prev[columnId];
            const newItems = column.items.map(t => t.id === taskId ? { ...t, ...taskData } : t);
            return {
                ...prev,
                [columnId]: {
                    ...column,
                    items: newItems
                }
            };
        });
    };

    const deleteTask = (columnId, taskId) => {
        setColumns(prev => {
            const column = prev[columnId];
            const newItems = column.items.filter(t => t.id !== taskId);
            return {
                ...prev,
                [columnId]: {
                    ...column,
                    items: newItems
                }
            };
        });
    };

    const value = {
        columns,
        moveTask,
        addTask,
        updateTask,
        deleteTask
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
}
