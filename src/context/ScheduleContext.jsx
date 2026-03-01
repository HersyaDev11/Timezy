import { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the Context
const ScheduleContext = createContext();

// 2. Dummy Data (with dates relative to October 2023 for the calendar layout, 
// using generic 'type' categories for easy rendering)
const initialSchedules = [
    {
        id: 1,
        title: "Ujian Tengah Semester",
        subtitle: "Algoritma & Struktur Data",
        type: "Kuliah", // Kuliah, Pribadi, Organisasi, Tugas
        date: "2026-03-05", // shifted from 2023-10
        startTime: "08:00",
        endTime: "10:00",
        location: "R. B201",
        colorClass: "red"
    },
    {
        id: 2,
        title: "Kuliah Basis Data",
        subtitle: "Teori Normalisasi",
        type: "Kuliah",
        date: "2026-03-05",
        startTime: "13:00",
        endTime: "15:00",
        location: "R. C105",
        colorClass: "blue"
    },
    {
        id: 3,
        title: "Lari Sore",
        subtitle: "Target 5km",
        type: "Pribadi",
        date: "2026-03-05",
        startTime: "16:30",
        endTime: "",
        location: "",
        colorClass: "green"
    },
    {
        id: 4,
        title: "Laporan Praktikum",
        subtitle: "Tugas",
        type: "Tugas",
        date: "2026-03-06", // "Besok"
        startTime: "23:59",
        endTime: "",
        location: "",
        colorClass: "amber"
    },
    {
        id: 5,
        title: "Makalah AI",
        subtitle: "Tugas",
        type: "Tugas",
        date: "2026-03-08", // "3 hari lagi"
        startTime: "23:59",
        endTime: "",
        location: "",
        colorClass: "blue"
    },
    {
        id: 6,
        title: "Proposal Kegiatan",
        subtitle: "Tugas",
        type: "Tugas",
        date: "2026-03-12", // "Minggu depan"
        startTime: "23:59",
        endTime: "",
        location: "",
        colorClass: "purple"
    },
    {
        id: 7,
        title: "Rapat BEM",
        subtitle: "Organisasi",
        type: "Organisasi",
        date: "2026-03-03",
        startTime: "19:00",
        endTime: "",
        location: "Sekretariat",
        colorClass: "purple"
    },
    {
        id: 8,
        title: "Algoritma",
        subtitle: "Kuliah",
        type: "Kuliah",
        date: "2026-03-02",
        startTime: "09:00",
        endTime: "",
        location: "R. A101",
        colorClass: "blue"
    },
    {
        id: 9,
        title: "Gym",
        subtitle: "Pribadi",
        type: "Pribadi",
        date: "2026-03-06",
        startTime: "18:00",
        endTime: "",
        location: "Fitness Center",
        colorClass: "green"
    },
    {
        id: 10,
        title: "Strukdat",
        subtitle: "Kuliah",
        type: "Kuliah",
        date: "2026-03-08",
        startTime: "10:00",
        endTime: "",
        location: "R. B102",
        colorClass: "blue"
    },
    {
        id: 11,
        title: "Tugas Besar",
        subtitle: "Tugas",
        type: "Tugas",
        date: "2026-03-10",
        startTime: "23:59",
        endTime: "",
        location: "",
        colorClass: "amber"
    },
    {
        id: 12,
        title: "Futsal",
        subtitle: "Pribadi",
        type: "Pribadi",
        date: "2026-03-13",
        startTime: "20:00",
        endTime: "",
        location: "Lapangan Indoor",
        colorClass: "green"
    }
];

// 3. Create the Provider Component
export function ScheduleProvider({ children }) {
    // We will use localStorage so the user can test the CRUD operations easily without data resetting on every code change rebuild.
    const [schedules, setSchedules] = useState(() => {
        const saved = localStorage.getItem('dummySchedules_v2'); // renamed key so previous 2023 data gets wiped
        if (saved) {
            return JSON.parse(saved);
        }
        return initialSchedules;
    });

    // --- New States for Advanced Features ---
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("Semua"); // "Semua", "Mata Kuliah", "Organisasi", "Pribadi", "Tugas"
    const [currentView, setCurrentView] = useState("calendar"); // "calendar", "week", "list"

    // Default calendar view to March 2026
    const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // Month is 0-indexed, so 2 is March

    // Notification State
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    // Save to local storage whenever schedules change
    useEffect(() => {
        localStorage.setItem('dummySchedules_v2', JSON.stringify(schedules));
    }, [schedules]);

    // --- CRUD Actions ---

    // Create
    const addSchedule = (newSchedule) => {
        setSchedules(prev => [
            ...prev,
            { ...newSchedule, id: Date.now() } // generate a unique ID
        ]);
        showNotification("Jadwal berhasil ditambahkan!");
    };

    // Update
    const updateSchedule = (id, updatedSchedule) => {
        setSchedules(prev =>
            prev.map(schedule => schedule.id === id ? { ...schedule, ...updatedSchedule } : schedule)
        );
        showNotification("Jadwal berhasil diperbarui!");
    };

    // Delete
    const deleteSchedule = (id) => {
        setSchedules(prev => prev.filter(schedule => schedule.id !== id));
        showNotification("Jadwal berhasil dihapus!", "error");
    };

    // --- Computed Filtered Schedules ---
    const filteredSchedules = schedules.filter(schedule => {
        // 1. Text Search filtering (matches title or subtitle)
        const matchesSearch = schedule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (schedule.subtitle && schedule.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

        // 2. Category filtering
        let matchesCategory = true;
        if (activeFilter !== "Semua") {
            if (activeFilter === "Mata Kuliah") matchesCategory = schedule.type === "Kuliah";
            else matchesCategory = schedule.type === activeFilter;
        }

        return matchesSearch && matchesCategory;
    });

    // --- Calendar Navigation Helpers ---
    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date()); // Jump to actual current year/month
    };

    const value = {
        schedules,
        filteredSchedules,
        addSchedule,
        updateSchedule,
        deleteSchedule,
        // Advanced state
        searchQuery,
        setSearchQuery,
        activeFilter,
        setActiveFilter,
        currentView,
        setCurrentView,
        currentDate,
        setCurrentDate,
        nextMonth,
        prevMonth,
        goToToday,
        notification
    };

    return (
        <ScheduleContext.Provider value={value}>
            {children}
        </ScheduleContext.Provider>
    );
}

// 4. Custom Hook for easy consumption
export function useSchedule() {
    return useContext(ScheduleContext);
}
