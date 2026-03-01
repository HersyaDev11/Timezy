import Sidebar from "../components/layout/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <>
            {/* Sidebar Navigation */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-light dark:bg-background-dark">
                <div className="container mx-auto max-w-7xl p-6 lg:p-10 flex flex-col gap-8">
                    {children}
                </div>
            </main>
        </>
    );
}
