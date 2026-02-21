import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JournalCard from '../components/journal/JournalCard';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Search, Filter, Calendar, LayoutGrid, List } from 'lucide-react';
import api from '../services/api';

export default function JournalHistory() {
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        try {
            const data = await api.getEntries(0, 100);
            setEntries(data);
        } catch {
            // Mock data for demo
            setEntries([
                {
                    id: 1,
                    content: "Today I felt a sense of calm after my morning walk. The air was crisp and it helped me clear my mind before starting work.",
                    created_at: new Date().toISOString(),
                    tags: ['calm', 'productivity', 'morning routine'],
                    reflection: 'available',
                },
                {
                    id: 2,
                    content: "Had an intense conversation with a friend about future goals. It made me realize how much I've grown in the past year.",
                    created_at: new Date(Date.now() - 86400000).toISOString(),
                    tags: ['growth', 'relationships'],
                    reflection: null,
                },
                {
                    id: 3,
                    content: "Struggled with focus today. The afternoon felt heavier than usual, but I managed to take a short break that helped.",
                    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
                    tags: ['focus', 'self-care'],
                    reflection: 'available',
                },
                {
                    id: 4,
                    content: "A beautiful sunset reminded me to appreciate small moments. Gratitude is becoming a more natural part of my day.",
                    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
                    tags: ['gratitude', 'mindfulness'],
                    reflection: null,
                },
                {
                    id: 5,
                    content: "Felt overwhelmed by work deadlines but journaling helped me organize my thoughts. Writing it out always brings clarity.",
                    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
                    tags: ['stress', 'clarity', 'work'],
                    reflection: 'available',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredEntries = entries.filter((entry) =>
        searchQuery ? entry.content.toLowerCase().includes(searchQuery.toLowerCase()) : true
    );

    // Group entries by date
    const groupedEntries = filteredEntries.reduce((groups, entry) => {
        const date = new Date(entry.created_at).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        if (!groups[date]) groups[date] = [];
        groups[date].push(entry);
        return groups;
    }, {});

    if (isLoading) {
        return <LoadingSpinner size="lg" text="Loading your journal..." />;
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-text-primary">Your Journal</h2>
                    <p className="text-sm text-text-muted">{entries.length} {entries.length === 1 ? 'entry' : 'entries'} written</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-dark-hover text-calm-blue' : 'text-text-muted hover:text-text-primary'}`}
                    >
                        <LayoutGrid size={16} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-dark-hover text-calm-blue' : 'text-text-muted hover:text-text-primary'}`}
                    >
                        <List size={16} />
                    </button>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search your entries by keyword or phrase..."
                        className="input-field pl-9"
                    />
                </div>
                <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className={`btn-ghost flex items-center gap-2 ${filterOpen ? 'border-calm-blue/30 text-calm-blue' : ''}`}
                >
                    <Filter size={16} />
                    <span className="hidden sm:inline">Filter</span>
                </button>
            </div>

            {/* Filter panel */}
            {filterOpen && (
                <div className="glass-card p-4 flex flex-wrap gap-3 animate-slide-up">
                    <button className="text-xs px-3 py-1.5 rounded-full bg-calm-blue/10 text-calm-blue border border-calm-blue/20 hover:bg-calm-blue/20 transition-colors">
                        This week
                    </button>
                    <button className="text-xs px-3 py-1.5 rounded-full bg-dark-hover text-text-muted border border-dark-border hover:text-text-primary transition-colors">
                        This month
                    </button>
                    <button className="text-xs px-3 py-1.5 rounded-full bg-dark-hover text-text-muted border border-dark-border hover:text-text-primary transition-colors">
                        With reflections
                    </button>
                    <button className="text-xs px-3 py-1.5 rounded-full bg-dark-hover text-text-muted border border-dark-border hover:text-text-primary transition-colors">
                        High clarity
                    </button>
                    <button className="text-xs px-3 py-1.5 rounded-full bg-dark-hover text-text-muted border border-dark-border hover:text-text-primary transition-colors">
                        Stress-related
                    </button>
                </div>
            )}

            {/* Entries */}
            {filteredEntries.length === 0 ? (
                searchQuery ? (
                    <div className="text-center py-12">
                        <p className="text-text-muted text-sm">No entries match "<span className="text-text-secondary">{searchQuery}</span>"</p>
                        <button onClick={() => setSearchQuery('')} className="text-calm-blue text-xs mt-2 hover:underline">
                            Clear search
                        </button>
                    </div>
                ) : (
                    <EmptyState type="history" onAction={() => navigate('/journal/new')} />
                )
            ) : (
                <div className="space-y-6">
                    {Object.entries(groupedEntries).map(([date, dateEntries]) => (
                        <div key={date}>
                            <div className="flex items-center gap-2 mb-3">
                                <Calendar size={12} className="text-text-muted" />
                                <span className="section-title">{date}</span>
                            </div>
                            <div className={viewMode === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 gap-3'
                                : 'space-y-3'
                            }>
                                {dateEntries.map((entry) => (
                                    <JournalCard
                                        key={entry.id}
                                        entry={entry}
                                        onClick={() => navigate(`/journal/${entry.id}`)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
