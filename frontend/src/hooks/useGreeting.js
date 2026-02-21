import { useMemo } from 'react';

export function useGreeting(userName) {
    return useMemo(() => {
        const hour = new Date().getHours();
        let timeGreeting;
        let emoji;

        if (hour >= 5 && hour < 12) {
            timeGreeting = 'Good morning';
            emoji = '🌅';
        } else if (hour >= 12 && hour < 17) {
            timeGreeting = 'Good afternoon';
            emoji = '☀️';
        } else if (hour >= 17 && hour < 21) {
            timeGreeting = 'Good evening';
            emoji = '🌆';
        } else {
            timeGreeting = 'Good night';
            emoji = '🌙';
        }

        const firstName = userName ? userName.split(' ')[0] : 'there';
        const greeting = `${timeGreeting}, ${firstName}`;

        const subtitles = [
            "How are you feeling today?",
            "Take a moment to reflect.",
            "Your thoughts matter.",
            "This is your safe space.",
            "What's on your mind?",
        ];
        const subtitle = subtitles[Math.floor(Math.random() * subtitles.length)];

        return { greeting, subtitle, emoji };
    }, [userName]);
}

export default useGreeting;
