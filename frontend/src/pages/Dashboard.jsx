import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useGreeting from '../hooks/useGreeting';
import InsightCard from '../components/ui/InsightCard';
import EmotionChart from '../components/ui/EmotionChart';
import EmptyState from '../components/ui/EmptyState';
import JournalCard from '../components/journal/JournalCard';
import { PenSquare, ArrowRight, Sparkles } from 'lucide-react';
import api from '../services/api';

// Mock chart data
const weeklyData = [
    { day: 'Mon', calm: 6, energy: 4, clarity: 7 },
    { day: 'Tue', calm: 7, energy: 5, clarity: 6 },
    { day: 'Wed', calm: 5, energy: 6, clarity: 5 },
    { day: 'Thu', calm: 8, energy: 7, clarity: 8 },
    { day: 'Fri', calm: 6, energy: 5, clarity: 7 },
    { day: 'Sat', calm: 9, energy: 8, clarity: 9 },
    { day: 'Sun', calm: 7, energy: 6, clarity: 8 },
];

export default function Dashboard() {
    const { user } = useAuth();
    const { greeting, subtitle } = useGreeting(user?.name);
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [quickThought, setQuickThought] = useState('');

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        try {
            const data = await api.getEntries(0, 5);
            setEntries(data);
        } catch {
            // Fallback to mock data for demo
            setEntries([
                {
                    id: 1,
                    content: "Today I felt a sense of calm after my morning walk. The air was crisp and it helped me clear my mind before starting work. I noticed I've been more productive when I take time for myself in the morning.",
                    created_at: new Date().toISOString(),
                    tags: ['calm', 'productivity', 'morning routine'],
                    reflection: 'AI reflection available',
                },
                {
                    id: 2,
                    content: "Had an intense conversation with a friend about future goals. It made me realize how much I've grown in the past year. Some anxiety about what's next, but also excitement.",
                    created_at: new Date(Date.now() - 86400000).toISOString(),
                    tags: ['growth', 'relationships', 'anxiety'],
                    reflection: null,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickEntry = () => {
        if (quickThought.trim()) {
            navigate('/journal/new', { state: { initialContent: quickThought } });
        } else {
            navigate('/journal/new');
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6 animate-fade-in">
                <div className="h-8 w-64 bg-dark-hover animate-pulse rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="glass-card p-5 space-y-3">
                            <div className="h-10 w-10 bg-dark-hover animate-pulse rounded-xl" />
                            <div className="h-4 w-24 bg-dark-hover animate-pulse rounded" />
                            <div className="h-8 w-16 bg-dark-hover animate-pulse rounded" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const hasEntries = entries.length > 0;

    return (
        <div className="space-y-6 animate-fade-in max-w-6xl">
            {/* Quick thought input */}
            <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-3">
                    <Sparkles size={16} className="text-calm-blue" />
                    <span className="text-sm text-text-secondary">How are you feeling today?</span>
                </div>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={quickThought}
                        onChange={(e) => setQuickThought(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleQuickEntry()}
                        placeholder="Write a quick thought or start a full entry..."
                        className="input-field flex-1"
                    />
                    <button onClick={handleQuickEntry} className="btn-primary flex items-center gap-2 whitespace-nowrap">
                        <PenSquare size={16} />
                        <span className="hidden sm:inline">Write</span>
                    </button>
                </div>
            </div>

            {/* Insight cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <InsightCard
                    variant="pattern"
                    title="Emotional Pattern"
                    value="Calm"
                    description="Your recent entries reflect a growing sense of inner peace and balance."
                />
                <InsightCard
                    variant="streak"
                    title="Journal Streak"
                    value={`${Math.min(entries.length, 7)} days`}
                    description="Keep going — consistency is more important than perfection."
                />
                <InsightCard
                    variant="prompt"
                    title="Today's Prompt"
                    description="What small moment brought you unexpected joy this week?"
                    onClick={() => navigate('/prompts')}
                />
                <InsightCard
                    variant="trend"
                    title="Weekly Trend"
                    value="↑ 12%"
                    description="Your emotional clarity has been improving this week."
                />
            </div>

            {/* Chart + Recent entries */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Chart */}
                <div className="lg:col-span-3">
                    <EmotionChart data={weeklyData} title="Weekly Emotional Trends" />
                </div>

                {/* Recent entries */}
                <div className="lg:col-span-2 space-y-3">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-text-primary">Recent Entries</h3>
                        <button
                            onClick={() => navigate('/journal/history')}
                            className="text-xs text-calm-blue hover:text-calm-blue-deep flex items-center gap-1 transition-colors"
                        >
                            View all <ArrowRight size={12} />
                        </button>
                    </div>
                    {hasEntries ? (
                        entries.slice(0, 3).map((entry) => (
                            <JournalCard
                                key={entry.id}
                                entry={entry}
                                onClick={() => navigate(`/journal/${entry.id}`)}
                            />
                        ))
                    ) : (
                        <EmptyState type="journal" onAction={() => navigate('/journal/new')} />
                    )}
                </div>
            </div>
        </div>
    );
}
