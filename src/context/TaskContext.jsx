import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    // Load initial tasks from local storage or use default empty array
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("timezy_tasks");
        if (savedTasks) {
            try {
                return JSON.parse(savedTasks);
            } catch (e) {
                console.error("Failed to parse tasks from localStorage", e);
            }
        }
        return [
            { id: "1", title: "Review materi kalkulus", completed: false, category: "Belajar" },
            { id: "2", title: "Buat laporan praktikum fisika", completed: true, category: "Tugas" },
        ];
    });

    // Save tasks to local storage whenever they change
    useEffect(() => {
        localStorage.setItem("timezy_tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title, category = "Umum") => {
        const newTask = {
            id: Date.now().toString(),
            title,
            completed: false,
            category,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const toggleTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
