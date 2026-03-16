import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function Statistics() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const stats = [
        {
            id: 1,
            label: "Mahasiswa Terbantu",
            value: 5400,
            suffix: "+",
            icon: "groups"
        },
        {
            id: 2,
            label: "Tugas Selesai",
            value: 12500,
            suffix: "+",
            icon: "task_alt"
        },
        {
            id: 3,
            label: "Jam Fokus Tercatat",
            value: 8200,
            suffix: "+",
            icon: "schedule"
        }
    ];

    return (
        <section className="w-full py-16 px-4 border-b border-white/5 bg-[#0A101D]">
            <div className="max-w-7xl mx-auto" ref={ref}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col items-center justify-center p-6 md:p-2">
                            <span className="material-symbols-outlined text-4xl text-blue-500 mb-4 opacity-80">
                                {stat.icon}
                            </span>
                            <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                                {inView ? (
                                    <CountUp
                                        start={0}
                                        end={stat.value}
                                        duration={2.5}
                                        separator=","
                                        useEasing={true}
                                    />
                                ) : (
                                    "0"
                                )}
                                <span className="text-blue-500">{stat.suffix}</span>
                            </div>
                            <p className="text-gray-400 font-medium tracking-wide">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
