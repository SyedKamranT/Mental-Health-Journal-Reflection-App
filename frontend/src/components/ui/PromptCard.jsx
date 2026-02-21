import { Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';

const categoryColors = {
    growth: 'bg-accent-olive/15 text-accent-olive border-accent-olive/20',
    stress: 'bg-accent-pink/15 text-accent-pink border-accent-pink/20',
    gratitude: 'bg-accent-yellow/15 text-accent-yellow border-accent-yellow/20',
    clarity: 'bg-calm-blue/15 text-calm-blue border-calm-blue/20',
    default: 'bg-dark-hover text-text-muted border-dark-border',
};

export default function PromptCard({ prompt, category = 'default', isSaved = false, onSave, onUse }) {
    const colorClass = categoryColors[category] || categoryColors.default;

    return (
        <div className="glass-card glass-card-hover p-5 flex flex-col gap-4">
            {/* Category tag */}
            <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colorClass}`}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
                <button
                    onClick={onSave}
                    className="text-text-muted hover:text-accent-yellow transition-colors"
                    title={isSaved ? 'Saved' : 'Save prompt'}
                >
                    {isSaved ? <BookmarkCheck size={16} className="text-accent-yellow" /> : <Bookmark size={16} />}
                </button>
            </div>

            {/* Prompt text */}
            <p className="text-text-primary text-sm leading-relaxed flex-1">
                {prompt}
            </p>

            {/* Action */}
            <button
                onClick={onUse}
                className="flex items-center gap-2 text-xs font-medium text-calm-blue hover:text-calm-blue-deep transition-colors group"
            >
                Write about this
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
