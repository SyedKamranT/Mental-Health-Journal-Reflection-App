import { useState, useEffect, useCallback, useRef } from 'react';
import { Save, Send, Type } from 'lucide-react';

export default function JournalEditor({ onSubmit, initialContent = '', isSubmitting = false }) {
    const [content, setContent] = useState(initialContent);
    const [saveStatus, setSaveStatus] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const textareaRef = useRef(null);
    const saveTimeoutRef = useRef(null);

    // Word count
    useEffect(() => {
        const words = content.trim() ? content.trim().split(/\s+/).length : 0;
        setWordCount(words);
    }, [content]);

    // Autosave simulation
    const handleChange = useCallback((e) => {
        const value = e.target.value;
        setContent(value);
        setSaveStatus('saving');

        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
            setSaveStatus('saved');
            // In production, save draft to API here
            setTimeout(() => setSaveStatus(''), 2000);
        }, 1000);
    }, []);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.max(400, textarea.scrollHeight) + 'px';
        }
    }, [content]);

    const handleSubmit = () => {
        if (content.trim() && onSubmit) {
            onSubmit(content.trim());
        }
    };

    return (
        <div className="glass-card overflow-hidden animate-fade-in">
            {/* Editor header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-dark-border">
                <div className="flex items-center gap-3">
                    <Type size={16} className="text-text-muted" />
                    <span className="text-xs text-text-muted">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    {/* Save status */}
                    {saveStatus && (
                        <div className="flex items-center gap-1.5 text-xs animate-fade-in">
                            {saveStatus === 'saving' ? (
                                <>
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-yellow animate-pulse" />
                                    <span className="text-accent-yellow">Saving...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={12} className="text-accent-olive" />
                                    <span className="text-accent-olive">Saved</span>
                                </>
                            )}
                        </div>
                    )}
                    {/* Word count */}
                    <span className="text-xs text-text-muted">
                        {wordCount} {wordCount === 1 ? 'word' : 'words'}
                    </span>
                </div>
            </div>

            {/* Textarea */}
            <textarea
                ref={textareaRef}
                value={content}
                onChange={handleChange}
                placeholder="What's on your mind? Write freely — this is your space..."
                className="w-full bg-transparent text-text-primary text-base leading-relaxed
          px-6 py-6 resize-none outline-none placeholder:text-text-muted/50
          min-h-[400px] font-light tracking-wide"
                autoFocus
            />

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-dark-border">
                <p className="text-xs text-text-muted">
                    Your journal is private and encrypted
                </p>
                <button
                    onClick={handleSubmit}
                    disabled={!content.trim() || isSubmitting}
                    className="btn-primary flex items-center gap-2 text-sm"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border border-dark-pure/30 border-t-dark-pure rounded-full animate-spin" />
                            Reflecting...
                        </>
                    ) : (
                        <>
                            <Send size={16} />
                            Submit for reflection
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
