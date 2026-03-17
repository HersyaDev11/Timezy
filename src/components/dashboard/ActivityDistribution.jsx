import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function ActivityDistribution() {
    const data = [
        { name: 'Kuliah', value: 45, color: '#137fec' }, // Primary Match
        { name: 'Tugas', value: 30, color: '#f59e0b' },  // Amber
        { name: 'Pribadi', value: 15, color: '#10b981' }, // Emerald
        { name: 'Lainnya', value: 10, color: '#8b5cf6' }, // Violet
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 rounded-lg shadow-lg">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {payload[0].name}: <span style={{ color: payload[0].payload.color }}>{payload[0].value}%</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col items-center justify-center">
            <div className="w-full flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Distribusi Aktivitas
                </h2>
            </div>
            
            <div className="w-full h-[220px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-black text-slate-800 dark:text-slate-200">4</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Kategori</span>
                </div>
            </div>

            {/* Custom Legend */}
            <div className="w-full grid grid-cols-2 gap-y-3 gap-x-2 mt-4">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}60` }}
                        ></div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.name}</span>
                            <span className="text-[10px] text-slate-500">{item.value}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
