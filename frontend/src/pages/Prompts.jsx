import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PromptCard from '../components/ui/PromptCard';
import { Sparkles, Filter } from 'lucide-react';

const mockPrompts = [
    { id: 1, prompt: "What small moment brought you unexpected joy this week?", category: 'gratitude', isSaved: false },
    { id: 2, prompt: "When did you last feel truly at peace? What were the conditions?", category: 'clarity', isSaved: true },
    { id: 3, prompt: "What challenge are you currently navigating, and what's one thing you've learned from it so far?", category: 'growth', isSaved: false },
    { id: 4, prompt: "How has your relationship with stress changed over the past month?", category: 'stress', isSaved: false },
    { id: 5, prompt: "What are you most proud of about how you've handled things recently?", category: 'growth', isSaved: true },
    { id: 6, prompt: "Describe a moment today when you felt fully present.", category: 'clarity', isSaved: false },
    { id: 7, prompt: "What's one thing you'd tell yourself from a year ago about where you are now?", category: 'growth', isSaved: false },
    { id: 8, prompt: "What does your ideal 'recharge' day look like? When was the last time you had one?", category: 'stress', isSaved: false },
    { id: 9, prompt: "Name three things — big or small — that you're grateful for right now.", category: 'gratitude', isSaved: false },
    { id: 10, prompt: "What conversation or interaction stayed with you today, and why?", category: 'clarity', isSaved: false },
    { id: 11, prompt: "What's one habit you'd like to build, and what's the smallest step you can take toward it?", category: 'growth', isSaved: false },
    { id: 12, prompt: "When do you feel most like yourself? What environment supports that?", category: 'clarity', isSaved: false },
];

const categories = ['all', 'growth', 'stress', 'gratitude', 'clarity'];

export default function Prompts() {
    const navigate = useNavigate();
    const [prompts, setPrompts] = useState(mockPrompts);
    const [activeCategory, setActiveCategory] = useState('all');
    const [showSavedOnly, setShowSavedOnly] = useState(false);

    const filteredPrompts = prompts.filter((p) => {
        if (showSavedOnly && !p.isSaved) return false;
        if (activeCategory !== 'all' && p.category !== activeCategory) return false;
        return true;
    });

    const toggleSave = (id) => {
        setPrompts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, isSaved: !p.isSaved } : p))
        );
    };

    const handleUse = (prompt) => {
        navigate('/journal/new', { state: { initialContent: `Prompt: "${prompt.prompt}"\n\n` } });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles size={18} className="text-accent-pink" />
                        <h2 className="text-xl font-semibold text-text-primary">Reflection Prompts</h2>
                    </div>
                    <p className="text-sm text-text-muted">Personalized prompts to deepen your self-reflection</p>
                </div>
                <button
                    onClick={() => setShowSavedOnly(!showSavedOnly)}
                    className={`btn-ghost text-sm ${showSavedOnly ? 'border-accent-yellow/30 text-accent-yellow' : ''}`}
                >
                    {showSavedOnly ? 'Show all' : 'Saved only'}
                </button>
            </div>

            {/* Category filter */}
            <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-xs px-3.5 py-1.5 rounded-full border whitespace-nowrap transition-all
              ${activeCategory === cat
                                ? 'bg-calm-blue/15 text-calm-blue border-calm-blue/25'
                                : 'bg-dark-hover text-text-muted border-dark-border hover:text-text-primary'
                            }
            `}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            {/* Prompts grid */}
            {filteredPrompts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPrompts.map((prompt) => (
                        <PromptCard
                            key={prompt.id}
                            prompt={prompt.prompt}
                            category={prompt.category}
                            isSaved={prompt.isSaved}
                            onSave={() => toggleSave(prompt.id)}
                            onUse={() => handleUse(prompt)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-text-muted text-sm">
                        {showSavedOnly ? "You haven't saved any prompts yet" : "No prompts in this category"}
                    </p>
                    <button
                        onClick={() => { setActiveCategory('all'); setShowSavedOnly(false); }}
                        className="text-calm-blue text-xs mt-2 hover:underline"
                    >
                        Show all prompts
                    </button>
                </div>
            )}
        </div>
    );
}
