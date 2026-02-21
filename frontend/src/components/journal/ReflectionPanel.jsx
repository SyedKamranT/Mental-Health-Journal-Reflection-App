import { Sparkles, MessageCircle, Heart, X } from 'lucide-react';

export default function ReflectionPanel({ analysis, onClose, isLoading = false }) {
    if (isLoading) {
        return (
            <div className="glass-card p-6 animate-slide-in-right">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-xl bg-gradient-calm flex items-center justify-center">
                        <Sparkles size={16} className="text-calm-blue animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary">Reflecting on your entry...</h3>
                        <p className="text-xs text-text-muted">This takes just a moment</p>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="h-3 bg-dark-hover animate-pulse rounded w-full" />
                    <div className="h-3 bg-dark-hover animate-pulse rounded w-4/5" />
                    <div className="h-3 bg-dark-hover animate-pulse rounded w-3/5" />
                </div>
            </div>
        );
    }

    if (!analysis) return null;

    // Parse analysis if it's a string
    let parsed = analysis;
    if (typeof analysis === 'string') {
        try {
            parsed = JSON.parse(analysis);
        } catch {
            parsed = { summary: analysis };
        }
    }

    return (
        <div className="glass-card p-6 animate-slide-in-right space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-calm flex items-center justify-center">
                        <Sparkles size={16} className="text-calm-blue" />
                    </div>
                    <h3 className="text-sm font-semibold text-text-primary">Your Reflection</h3>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Sentiment */}
            {parsed.sentiment && (
                <div className="flex items-center gap-2">
                    <Heart size={14} className="text-accent-pink" />
                    <span className="text-xs font-medium text-text-secondary">Emotional Tone:</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent-pink/15 text-accent-pink border border-accent-pink/20">
                        {parsed.sentiment}
                    </span>
                </div>
            )}

            {/* Summary */}
            {(parsed.summary || parsed.Sentiment) && (
                <div>
                    <p className="section-title mb-2">Summary</p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        {parsed.summary || 'Your entry suggests a ' + (parsed.Sentiment || '').toLowerCase() + ' emotional state.'}
                    </p>
                </div>
            )}

            {/* Key Themes */}
            {(parsed.themes || parsed['Key themes']) && (
                <div>
                    <p className="section-title mb-2">Themes Detected</p>
                    <div className="flex flex-wrap gap-1.5">
                        {(parsed.themes || parsed['Key themes'] || []).map((theme, i) => (
                            <span
                                key={i}
                                className="text-xs px-2.5 py-1 rounded-full bg-calm-blue/10 text-calm-blue border border-calm-blue/20"
                            >
                                {theme}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Reflection Questions */}
            {(parsed.questions || parsed['reflection_questions'] || parsed['Reflection questions']) && (
                <div>
                    <p className="section-title mb-3">
                        <MessageCircle size={12} className="inline mr-1" />
                        Questions to Explore
                    </p>
                    <div className="space-y-2.5">
                        {(parsed.questions || parsed['reflection_questions'] || parsed['Reflection questions'] || []).map((q, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-3 rounded-xl bg-dark-hover/50 border border-dark-border"
                            >
                                <span className="text-xs font-bold text-calm-blue-deep mt-0.5">{i + 1}</span>
                                <p className="text-sm text-text-secondary leading-relaxed">{q}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
