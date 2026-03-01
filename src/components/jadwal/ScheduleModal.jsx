import { useState, useEffect } from "react";
import { useSchedule } from "../../context/ScheduleContext";

export default function ScheduleModal({ isOpen, onClose }) {
    const { addSchedule } = useSchedule();
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        type: "Kuliah",
        date: "2026-03-05", // Defaulting for the demo
        startTime: "",
        endTime: "",
        location: "",
        colorClass: "blue"
    });

    // Reset form when opened
    useEffect(() => {
        if (isOpen) {
            setFormData({
                title: "",
                subtitle: "",
                type: "Kuliah",
                date: "2026-03-05",
                startTime: "08:00",
                endTime: "10:00",
                location: "",
                colorClass: "blue"
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeChange = (e) => {
        const type = e.target.value;
        let colorClass = 'blue';
        if (type === 'Pribadi') colorClass = 'green';
        if (type === 'Tugas') colorClass = 'amber';
        if (type === 'Organisasi') colorClass = 'purple';

        setFormData(prev => ({ ...prev, type, colorClass }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addSchedule(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#111418] rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tambah Jadwal Baru</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-[#1c2632] transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined font-bold text-xl">close</span>
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-5 overflow-y-auto hidden-scrollbar">
                    <form id="schedule-form" onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Title */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Judul Kegiatan</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="Cth: Kuliah Basis Data"
                                className="w-full bg-slate-50 dark:bg-[#1c2632] border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                            />
                        </div>

                        {/* Subtitle/Desc */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Deskripsi Singkat</label>
                            <input
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                placeholder="Cth: Teori Normalisasi"
                                className="w-full bg-slate-50 dark:bg-[#1c2632] border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                            />
                        </div>

                        {/* Type & Date Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Kategori</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleTypeChange}
                                    className="w-full bg-slate-50 dark:bg-[#1c2632] border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                                >
                                    <option value="Kuliah">Mata Kuliah</option>
                                    <option value="Tugas">Tugas</option>
                                    <option value="Organisasi">Organisasi</option>
                                    <option value="Pribadi">Pribadi</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Tanggal</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 dark:bg-[#1c2632] border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
                                />
                            </div>
                        </div>

                        {/* Time Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Waktu Mulai</label>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 dark:bg-[#1c2632] border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Waktu Selesai</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 dark:bg-[#1c2632] border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Lokasi / Ruangan</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Cth: R. C105 / Zoom Link"
                                className="w-full bg-slate-50 dark:bg-[#1c2632] border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                            />
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 rounded-b-2xl bg-slate-50 dark:bg-[#111418]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1c2632] transition-colors cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        form="schedule-form"
                        className="px-4 py-2 text-sm font-bold rounded-lg bg-primary text-white hover:bg-blue-600 shadow-md shadow-primary/20 transition-colors cursor-pointer"
                    >
                        Simpan Jadwal
                    </button>
                </div>

            </div>
        </div>
    );
}
