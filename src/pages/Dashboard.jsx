import Header from "../components/layout/Header";
import StatCards from "../components/dashboard/StatCards";
import NextClass from "../components/dashboard/NextClass";
import WeeklyProgress from "../components/dashboard/WeeklyProgress";
import FocusTimer from "../components/dashboard/FocusTimer";
import Deadlines from "../components/dashboard/Deadlines";

export default function Dashboard() {
    return (
        <>
            <Header />
            <StatCards />

            {/* Middle Section: Main Focus & Next Class */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Next Class & Chart */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <NextClass />
                    <WeeklyProgress />
                </div>

                {/* Right Column: Focus Timer & Deadlines */}
                <div className="flex flex-col gap-6">
                    <FocusTimer />
                    <Deadlines />
                </div>
            </div>
        </>
    );
}
