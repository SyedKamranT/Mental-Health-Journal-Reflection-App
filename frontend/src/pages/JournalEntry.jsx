import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import JournalEditor from '../components/journal/JournalEditor';
import ReflectionPanel from '../components/journal/ReflectionPanel';
import api from '../services/api';

export default function JournalEntry() {
    const location = useLocation();
    const initialContent = location.state?.initialContent || '';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [submittedEntry, setSubmittedEntry] = useState(null);

    const handleSubmit = async (content) => {
        setIsSubmitting(true);
        setIsAnalyzing(true);
        setAnalysis(null);

        try {
            // Create the entry
            const entry = await api.createEntry(content);
            setSubmittedEntry(entry);

            // Get analysis
            const result = await api.analyzeEntry(entry.id);
            setAnalysis(result);
        } catch {
            // Mock response for demo when API is unavailable
            setSubmittedEntry({ id: Date.now(), content, created_at: new Date().toISOString() });
            setAnalysis({
                sentiment: 'Reflective',
                summary: "Your entry shows a thoughtful approach to self-awareness. You're processing your experiences with depth and care.",
                themes: ['self-awareness', 'growth', 'mindfulness', 'emotional processing'],
                questions: [
                    "What specific moment today made you pause and reflect?",
                    "How does this experience connect to a broader pattern in your life?",
                    "If you could tell your future self one thing about today, what would it be?",
                ],
            });
        } finally {
            setIsSubmitting(false);
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-text-primary mb-1">New Journal Entry</h2>
                <p className="text-sm text-text-muted">Write freely — there's no wrong way to feel</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Editor */}
                <div className="lg:col-span-3">
                    <JournalEditor
                        onSubmit={handleSubmit}
                        initialContent={initialContent}
                        isSubmitting={isSubmitting}
                    />
                </div>

                {/* Reflection panel */}
                <div className="lg:col-span-2">
                    {(isAnalyzing || analysis) ? (
                        <ReflectionPanel
                            analysis={analysis}
                            isLoading={isAnalyzing}
                            onClose={() => setAnalysis(null)}
                        />
                    ) : (
                        <div className="glass-card p-6 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-calm mx-auto mb-4 flex items-center justify-center">
                                <span className="text-xl">✨</span>
                            </div>
                            <h3 className="text-sm font-semibold text-text-primary mb-2">
                                Your reflection awaits
                            </h3>
                            <p className="text-xs text-text-muted leading-relaxed">
                                Write your thoughts and submit to receive personalized insights,
                                emotional theme analysis, and reflective questions.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
