import { useState, useContext, useEffect, useRef } from "react";
import { TaskContext } from "../../context/TaskContext";

export default function ChatPanel() {
    const { tasks, addTask } = useContext(TaskContext);
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "ai",
            text: "Halo! Saya Asisten Belajar Anda. Ada yang bisa saya bantu hari ini?",
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
    ]);

    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = (e) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const currentInput = input;
        const newUserMessage = {
            id: Date.now(),
            sender: "user",
            text: currentInput,
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInput("");
        setIsTyping(true);

        // Process AI Response
        setTimeout(() => {
            const aiResponse = generateAIResponse(currentInput);
            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1200);
    };

    const generateAIResponse = (text) => {
        const lowerText = text.toLowerCase();
        
        // --- 1. GREETING INTENT ---
        if (lowerText.match(/^(halo|hai|pagi|siang|sore|malam|hi)/)) {
            const activeTasksCount = tasks.filter(t => !t.completed).length;
            return {
                id: Date.now() + 1,
                sender: "ai",
                text: `Halo juga! 👋 Saya siap membantu. Saat ini Anda punya ${activeTasksCount} tugas aktif. Mau saya rincikan atau ada pertanyaan tentang catatan Anda?`,
                time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            };
        }

        // --- 2. ADD TASK COMMAND ---
        if (lowerText.includes("tambahkan tugas") || lowerText.includes("ingatkan saya untuk") || lowerText.includes("buat tugas")) {
            // Very simple extraction: grab text after the keyword
            let taskName = text;
            if (lowerText.includes("tambahkan tugas")) taskName = text.substring(lowerText.indexOf("tambahkan tugas") + 15).trim();
            else if (lowerText.includes("ingatkan saya untuk")) taskName = text.substring(lowerText.indexOf("ingatkan saya untuk") + 19).trim();
            else if (lowerText.includes("buat tugas")) taskName = text.substring(lowerText.indexOf("buat tugas") + 10).trim();
            
            if (!taskName) taskName = "Tugas Baru";

            // capitalize first letter
            taskName = taskName.charAt(0).toUpperCase() + taskName.slice(1);

            return {
                id: Date.now() + 1,
                sender: "ai",
                text: `Baik! Ingin saya tambahkan "${taskName}" ke dalam daftar tugas Anda?`,
                isAction: true,
                actionLabel: "Ya, Tambahkan",
                actionPayload: { type: "ADD_TASK", data: taskName },
                time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            };
        }

        // --- 3. TASK QUERY INTENT ---
        if (lowerText.includes("tugas") || lowerText.includes("belum selesai") || lowerText.includes("jadwal")) {
            const activeTasks = tasks.filter(t => !t.completed);
            
            if (activeTasks.length === 0) {
                return {
                    id: Date.now() + 1,
                    sender: "ai",
                    text: "Selamat! 🎉 Semua tugas Anda sudah selesai saat ini.",
                    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                };
            }

            const taskListString = activeTasks.map((t, i) => `${i + 1}. ${t.title}`).join("\n");
            return {
                id: Date.now() + 1,
                sender: "ai",
                text: `Saat ini ada ${activeTasks.length} tugas yang belum diselesaikan:\n\n${taskListString}`,
                time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            };
        }

        // --- 4. EXPLAIN/NOTE INTENT ---
        if (lowerText.includes("jelaskan") || lowerText.includes("apa itu") || lowerText.includes("catatan") || lowerText.includes("ringkas")) {
            return {
                id: Date.now() + 1,
                sender: "ai",
                text: "Berdasarkan konteks catatan yang saya pindai secara umum, pokok batas bahasan berpusat pada pemecahan masalah secara iteratif dan menjaga fokus secara bertahap (agile/scrum). Ada bagian yang rasanya kurang jelas?",
                time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            };
        }

        // --- 5. DEFAULT FALLBACK ---
        return {
            id: Date.now() + 1,
            sender: "ai",
            text: "Wah, menarik! Sayangnya kemampuan saya masih terbatas untuk menjawab hal tersebut secara rinci. Anda bisa meminta saya untuk:\n• Membacakan daftar tugas\n• Menambahkan tugas baru\n• Meringkas catatan",
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };
    };

    const handleActionClick = (msgId, actionPayload) => {
        // Execute the action
        if (actionPayload && actionPayload.type === "ADD_TASK") {
            addTask(actionPayload.data, "AI Generated");
        }

        // Update message state to show it was executed
        setMessages(prev => prev.map(msg =>
            msg.id === msgId ? { ...msg, actionLabel: "Berhasil Ditambahkan!", disabled: true } : msg
        ));

        // Add confirmation message
        setTimeout(() => {
            setMessages((prev) => [...prev, {
                id: Date.now(),
                sender: "ai",
                text: `Oke, tugas "${actionPayload.data}" sudah saya tambahkan ke daftar Anda. Anda bisa melihatnya di menu Tugas.`,
                time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 500);
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
                                    onClick={() => handleActionClick(msg.id, msg.actionPayload)}
                                    disabled={msg.disabled}
                                    className={`mt-2 w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${msg.disabled
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 cursor-not-allowed border border-green-200 dark:border-green-800'
                                            : 'bg-primary text-white hover:bg-blue-600 shadow-sm'
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
                <div ref={messagesEndRef} />
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
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[16px]">send</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
