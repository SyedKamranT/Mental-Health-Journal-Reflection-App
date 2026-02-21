import { BookOpen, PenSquare, BarChart3, Lightbulb } from 'lucide-react';

const emptyStates = {
    journal: {
        icon: BookOpen,
        title: "Your journal awaits",
        description: "Start your first entry and begin your reflection journey. Your thoughts are safe here.",
        actionLabel: "Write your first entry",
    },
    history: {
        icon: PenSquare,
        title: "No entries yet",
        description: "Once you start journaling, your entries will appear here beautifully organized.",
        actionLabel: "Start writing",
    },
    insights: {
        icon: BarChart3,
        title: "Insights are on the way",
        description: "Write a few journal entries and we'll start surfacing patterns and emotional trends.",
        actionLabel: "Write an entry",
    },
    prompts: {
        icon: Lightbulb,
        title: "Prompts will appear soon",
        description: "As we learn about your patterns, personalized reflection prompts will show up here.",
        actionLabel: null,
    },
};

export default function EmptyState({ type = 'journal', onAction }) {
    const config = emptyStates[type] || emptyStates.journal;
    const Icon = config.icon;

    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-calm flex items-center justify-center mb-5">
                <Icon size={28} className="text-calm-blue" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
                {config.title}
            </h3>
            <p className="text-sm text-text-muted max-w-sm mb-6 leading-relaxed">
                {config.description}
            </p>
            {config.actionLabel && onAction && (
                <button onClick={onAction} className="btn-primary text-sm">
                    {config.actionLabel}
                </button>
            )}
        </div>
    );
}
