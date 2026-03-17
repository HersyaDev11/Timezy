import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Typically create user here, then navigate to login or dashboard
        if (name && email && password) {
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0f172a] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white dark:bg-[#1E293B] rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-primary text-3xl">schedule</span>
                            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Timezy</span>
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Buat Akun Baru</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Mulai kelola waktumu dengan lebih cerdas, gratis selamanya.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Nama Lengkap</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Taufan Hidayatul"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-slate-900 dark:text-white font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nama@email.com"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-slate-900 dark:text-white font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Kata Sandi</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Minimal 8 karakter"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-slate-900 dark:text-white font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full py-3 px-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all flex justify-center items-center gap-2 mt-6 cursor-pointer"
                        >
                            Daftar Sepenuhnya Gratis
                            <span className="material-symbols-outlined text-sm">rocket_launch</span>
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Sudah punya akun?{' '}
                            <Link to="/login" className="font-bold text-primary hover:text-blue-600 transition-colors">
                                Masuk di sini
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
