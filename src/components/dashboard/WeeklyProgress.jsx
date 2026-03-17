import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function WeeklyProgress() {
    const [period, setPeriod] = useState("Mingguan");
    const chartRef = useRef(null);
    const weeklyData = [
        { label: "Sen", value: 40, active: false },
        { label: "Sel", value: 65, active: false },
        { label: "Rab", value: 85, active: false },
        { label: "Kam", value: 30, active: false },
        { label: "Jum", value: 95, active: true },
        { label: "Sab", value: 20, active: false },
        { label: "Min", value: 15, active: false },
    ];

    const monthlyData = [
        { label: "Jan", value: 45, active: false },
        { label: "Feb", value: 60, active: false },
        { label: "Mar", value: 90, active: true },
        { label: "Apr", value: 0, active: false },
        { label: "Mei", value: 0, active: false },
        { label: "Jun", value: 0, active: false },
        { label: "Jul", value: 0, active: false },
    ];

    const chartData = period === "Mingguan" ? weeklyData : monthlyData;

    const handleExportPDF = async () => {
        if (!chartRef.current) return;
        
        try {
            // Give styling a moment if needed, then take canvas screenshot
            const canvas = await html2canvas(chartRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            
            // Create PDF (A4 landscape just for the chart, or portrait if preferred)
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.text(`Laporan Performa - ${period}`, 10, 10);
            pdf.addImage(imgData, 'PNG', 10, 20, pdfWidth - 20, pdfHeight - 20);
            pdf.save(`Laporan_Performa_${period}.pdf`);
        } catch (error) {
            console.error("Failed to generate PDF", error);
        }
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 rounded-lg shadow-lg">
                    <p className="text-xs font-bold text-slate-500 mb-1">{label}</p>
                    <p className="text-sm font-bold text-primary">
                        Skor: {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start md:items-center mb-6 flex-col md:flex-row gap-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Performa Aktivitas
                </h2>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleExportPDF}
                        className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                        Export PDF
                    </button>
                    <select 
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="bg-slate-100 dark:bg-[#0f172a] border-none text-xs text-slate-600 dark:text-slate-300 rounded-lg py-1.5 px-3 focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                    >
                        <option value="Mingguan">Mingguan</option>
                        <option value="Bulanan">Bulanan</option>
                    </select>
                </div>
            </div>

            {/* Recharts Bar Chart */}
            <div ref={chartRef} className="w-full h-[300px] mt-2 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis 
                            dataKey="label" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                            dy={10}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} />
                        <Bar 
                            dataKey="value" 
                            radius={[6, 6, 6, 6]}
                            barSize={32}
                            animationDuration={1500}
                        >
                            {chartData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.active ? '#137fec' : '#cbd5e1'} 
                                    className={entry.active ? '' : 'dark:fill-slate-700/50'} 
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
