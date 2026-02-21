import { Calendar, ChevronRight } from 'lucide-react';

export default function JournalCard({ entry, onClick }) {
    const date = new Date(entry.created_at);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    });

    const snippet = entry.content.length > 150
        ? entry.content.substring(0, 150) + '...'
        : entry.content;

    const themes = entry.tags && entry.tags.length > 0
        ? entry.tags
        : [];

    return (
        <button
            onClick={() => onClick?.(entry)}
            className="glass-card glass-card-hover w-full text-left p-5 group cursor-pointer"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Calendar size={12} />
                    <span>{formattedDate}</span>
                    <span className="text-text-muted/50">·</span>
                    <span>{formattedTime}</span>
                </div>
                <ChevronRight
                    size={16}
                    className="text-text-muted group-hover:text-calm-blue group-hover:translate-x-1 transition-all"
                />
            </div>

            <p className="text-sm text-text-primary leading-relaxed mb-3">
                {snippet}
            </p>

            {themes.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {themes.slice(0, 3).map((tag, i) => (
                        <span
                            key={i}
                            className="text-xs px-2 py-0.5 rounded-full bg-dark-hover text-text-muted border border-dark-border"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {entry.reflection && (
                <div className="mt-3 pt-3 border-t border-dark-border">
                    <p className="text-xs text-calm-blue flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-calm-blue" />
                        Reflection available
                    </p>
                </div>
            )}
        </button>
    );
}
