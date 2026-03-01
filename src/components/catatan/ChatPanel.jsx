import { useState } from "react";

export default function ChatPanel() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "ai",
            text: "Halo! Saya Asisten Belajar Anda. Ada yang bisa saya bantu dengan catatan ini?",
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        },
        {
            id: 2,
            sender: "ai",
            text: "Saya mendeteksi 3 tugas potensial dalam catatan ini. Ingin saya sinkronkan ke daftar jadwal Anda?",
            isAction: true,
            actionLabel: "Ya, Sinkronkan",
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
    ]);

    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = (e) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const newUserMessage = {
            id: Date.now(),
            sender: "user",
            text: input,
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInput("");
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                sender: "ai",
                text: getMockResponse(newUserMessage.text),
                time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const getMockResponse = (text) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes("jelaskan") || lowerText.includes("apa itu")) {
            return "Berdasarkan catatan Anda, Scrum adalah kerangka kerja di mana orang-orang dapat mengatasi masalah kompleks secara adaptif, sambil secara produktif dan kreatif memberikan produk bernilai setinggi mungkin.";
        }
        if (lowerText.includes("jadwal") || lowerText.includes("tugas")) {
            return "Saat ini ada 3 tugas yang belum diselesaikan pada minggu ini. Anda punya Kuis Singkat Agile yang belum dikerjakan.";
        }
        return "Tentu, saya mencatat pertanyaan Anda. Sebagai AI simulasi, saya belum bisa membedah konteks lebih dalam, namun saya akan menyimpan wawasan ini ke dalam database Anda.";
    };

    const handleActionClick = (msgId) => {
        setMessages(prev => prev.map(msg =>
            msg.id === msgId ? { ...msg, actionLabel: "Tersinkron", disabled: true } : msg
        ));
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-[#1c2632] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}>
                        {/* Message Bubble */}
                        <div className={`p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                ? 'bg-primary text-white rounded-tr-sm'
                                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-sm shadow-sm'
                            }`}>
                            <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                            {/* Action Button for AI (if any) */}
                            {msg.isAction && (
                                <button
                                    onClick={() => handleActionClick(msg.id)}
                                    disabled={msg.disabled}
                                    className={`mt-2 w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${msg.disabled
                                            ? 'bg-slate-100 text-slate-400 dark:bg-slate-700/50 cursor-not-allowed'
                                            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                                        }`}
                                >
                                    {msg.actionLabel}
                                </button>
                            )}
                        </div>
                        {/* Timestamp */}
                        <span className={`text-[10px] text-slate-400 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                            {msg.sender === 'ai' && 'AI Assistant • '}
                            {msg.time}
                        </span>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex flex-col max-w-[85%] self-start">
                        <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm shadow-sm">
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Chat Input Area */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <form onSubmit={handleSend} className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Tanya asisten..."
                        className="w-full pl-4 pr-12 py-2.5 bg-slate-50 dark:bg-[#1c2632] border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white placeholder:text-slate-500"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="absolute right-2 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[16px]">send</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
