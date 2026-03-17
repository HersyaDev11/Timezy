import { useEffect, useState, useRef } from 'react';
import { useSchedule } from '../context/ScheduleContext';

export function useScheduleNotifications() {
    const { schedules } = useSchedule();
    const [isSupported, setIsSupported] = useState(false);
    const [permission, setPermission] = useState('default');

    // We keep track of notified schedule IDs to avoid duplicate alerts
    const notifiedSchedulesRef = useRef(new Set());

    useEffect(() => {
        if ('Notification' in window) {
            setIsSupported(true);
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        if (!isSupported) return false;
        try {
            const result = await Notification.requestPermission();
            setPermission(result);
            return result === 'granted';
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    };

    // Check schedules periodically
    useEffect(() => {
        if (permission !== 'granted') return;

        // Check every minute
        const intervalId = setInterval(() => {
            const now = new Date();

            schedules.forEach(schedule => {
                if (!schedule.date || !schedule.startTime) return;

                // Construct Date object for the schedule
                const scheduleDateTime = new Date(`${schedule.date}T${schedule.startTime}`);

                // Calculate difference in minutes
                const diffMs = scheduleDateTime - now;
                const diffMins = Math.floor(diffMs / (1000 * 60));

                // ID uniquely identifying this schedule instance
                const uniqueId = `${schedule.id}-${schedule.date}-${schedule.startTime}`;

                // Trigger if it's within 15 minutes and hasn't been notified yet
                // For testing purposes, we might want to alert if diffMins >= 0 && diffMins <= 15
                if (diffMins > 0 && diffMins <= 15 && !notifiedSchedulesRef.current.has(uniqueId)) {

                    // Trigger notification
                    new Notification('Pengingat Jadwal Timezy', {
                        body: `${schedule.title} akan dimulai dalam ${diffMins} menit di ${schedule.location || 'lokasi yang belum ditentukan'}.`,
                        icon: '/favicon.ico' // Or any app icon
                    });

                    // Mark as notified
                    notifiedSchedulesRef.current.add(uniqueId);
                }
            });

        }, 60 * 1000); // Check every minute

        return () => clearInterval(intervalId);
    }, [schedules, permission]);

    return {
        isSupported,
        permission,
        requestPermission
    };
}
