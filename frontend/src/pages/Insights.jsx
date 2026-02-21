import { useState } from 'react';
import EmotionChart from '../components/ui/EmotionChart';
import { TrendingUp, Calendar, Brain, MessageCircle, Sparkles } from 'lucide-react';

const weeklyData = [
    { day: 'Mon', calm: 6, energy: 4, clarity: 7 },
    { day: 'Tue', calm: 7, energy: 5, clarity: 6 },
    { day: 'Wed', calm: 5, energy: 6, clarity: 5 },
    { day: 'Thu', calm: 8, energy: 7, clarity: 8 },
    { day: 'Fri', calm: 6, energy: 5, clarity: 7 },
    { day: 'Sat', calm: 9, energy: 8, clarity: 9 },
    { day: 'Sun', calm: 7, energy: 6, clarity: 8 },
];

const monthlyData = [
    { day: 'Week 1', calm: 5, energy: 4, clarity: 5 },
    { day: 'Week 2', calm: 6, energy: 5, clarity: 6 },
    { day: 'Week 3', calm: 7, energy: 6, clarity: 7 },
    { day: 'Week 4', calm: 8, energy: 7, clarity: 8 },
];

export default function Insights() {
    const [activeTab, setActiveTab] = useState('weekly');

    const tabs = [
        { id: 'weekly', label: 'This Week', icon: Calendar },
        { id: 'monthly', label: 'This Month', icon: TrendingUp },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold text-text-primary mb-1">Your Insights</h2>
                <p className="text-sm text-text-muted">Patterns and trends from your reflections</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 glass-card w-fit">
                {tabs.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${activeTab === id
                                ? 'bg-dark-hover text-calm-blue'
                                : 'text-text-muted hover:text-text-primary'
                            }
            `}
                    >
                        <Icon size={14} />
                        {label}
                    </button>
                ))}
            </div>

            {/* Chart */}
            <EmotionChart
                data={activeTab === 'weekly' ? weeklyData : monthlyData}
                title={activeTab === 'weekly' ? 'Weekly Emotional Landscape' : 'Monthly Emotional Journey'}
                height={280}
            />

            {/* Insight panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Key phrases */}
                <div className="glass-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Brain size={16} className="text-calm-blue" />
                        <h3 className="text-sm font-semibold text-text-primary">Key Themes</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['self-awareness', 'growth mindset', 'morning routines', 'gratitude', 'stress management', 'relationships', 'clarity', 'mindfulness'].map((theme) => (
                            <span
                                key={theme}
                                className="text-xs px-2.5 py-1.5 rounded-full bg-calm-blue/10 text-calm-blue border border-calm-blue/15"
                            >
                                {theme}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Emotional summary */}
                <div className="glass-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles size={16} className="text-accent-pink" />
                        <h3 className="text-sm font-semibold text-text-primary">Emotional Summary</h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                        This week you've shown a strong inclination toward <span className="text-calm-blue font-medium">self-reflection</span> and
                        <span className="text-accent-olive font-medium"> growth</span>. Your entries suggest increasing emotional clarity,
                        particularly when you engage in morning routines.
                    </p>
                    <div className="flex gap-4">
                        <div className="text-center">
                            <p className="text-lg font-bold text-accent-olive">↑ 23%</p>
                            <p className="text-xs text-text-muted">Calm</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-accent-pink">↑ 15%</p>
                            <p className="text-xs text-text-muted">Energy</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-accent-yellow">↑ 31%</p>
                            <p className="text-xs text-text-muted">Clarity</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* LLM Report */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                    <MessageCircle size={16} className="text-accent-yellow" />
                    <h3 className="text-sm font-semibold text-text-primary">
                        {activeTab === 'weekly' ? 'Weekly' : 'Monthly'} Reflection Report
                    </h3>
                </div>
                <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                    <p>
                        Over the past {activeTab === 'weekly' ? 'week' : 'month'}, your journal entries paint a picture of someone on a meaningful path of self-discovery.
                        Several themes emerge consistently:
                    </p>
                    <div className="pl-4 border-l-2 border-calm-blue/30 space-y-2">
                        <p><span className="text-calm-blue font-medium">Morning routines</span> continue to be a cornerstone of your well-being. Entries written after morning walks show noticeably higher clarity scores.</p>
                        <p><span className="text-accent-pink font-medium">Relationships</span> are a source of both growth and occasional anxiety. Consider exploring what specific aspects of social interactions energize vs. drain you.</p>
                        <p><span className="text-accent-yellow font-medium">Gratitude practice</span> appears to be strengthening. You're increasingly noticing and appreciating small moments.</p>
                    </div>
                    <p className="text-text-muted italic">
                        Consider: What would it look like to bring the same mindfulness you have in mornings into your afternoon routine?
                    </p>
                </div>
            </div>
        </div>
    );
}
