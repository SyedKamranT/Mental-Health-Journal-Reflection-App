import { TrendingUp, Brain, Flame, Sparkles } from 'lucide-react';

const variants = {
    pattern: {
        gradient: 'bg-gradient-calm',
        iconBg: 'from-calm-blue/20 to-calm-blue-deep/20',
        icon: Brain,
        accentColor: 'text-calm-blue',
    },
    streak: {
        gradient: 'bg-gradient-yellow',
        iconBg: 'from-accent-yellow/20 to-accent-yellow-deep/20',
        icon: Flame,
        accentColor: 'text-accent-yellow',
    },
    prompt: {
        gradient: 'bg-gradient-pink',
        iconBg: 'from-accent-pink/20 to-accent-pink-deep/20',
        icon: Sparkles,
        accentColor: 'text-accent-pink',
    },
    trend: {
        gradient: 'bg-gradient-olive',
        iconBg: 'from-accent-olive/20 to-accent-olive-deep/20',
        icon: TrendingUp,
        accentColor: 'text-accent-olive',
    },
};

export default function InsightCard({ variant = 'pattern', title, value, description, onClick }) {
    const config = variants[variant] || variants.pattern;
    const Icon = config.icon;

    return (
        <button
            onClick={onClick}
            className={`glass-card glass-card-hover w-full text-left p-5 ${config.gradient} group cursor-pointer`}
        >
            <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.iconBg} flex items-center justify-center`}>
                    <Icon size={18} className={config.accentColor} />
                </div>
            </div>
            <h3 className="text-sm font-medium text-text-secondary mb-1">{title}</h3>
            {value && (
                <p className={`text-2xl font-bold ${config.accentColor} mb-1`}>{value}</p>
            )}
            {description && (
                <p className="text-xs text-text-muted leading-relaxed">{description}</p>
            )}
        </button>
    );
}
