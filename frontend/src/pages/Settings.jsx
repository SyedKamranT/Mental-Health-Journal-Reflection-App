import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';
import {
    User,
    Shield,
    Download,
    Trash2,
    Brain,
    Palette,
    ChevronRight,
    AlertTriangle,
} from 'lucide-react';

export default function Settings() {
    const { user, logout } = useAuth();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

    const showToast = (message, type = 'info') => {
        setToast({ show: true, message, type });
    };

    const handleExport = () => {
        showToast('Your journal data is being prepared for download...', 'success');
    };

    const handleDeleteAll = () => {
        showToast('All data has been deleted', 'info');
        setShowDeleteModal(false);
        logout();
    };

    const Section = ({ icon: Icon, iconColor, title, description, children }) => (
        <div className="glass-card p-6">
            <div className="flex items-start gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                    <Icon size={16} />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{description}</p>
                </div>
            </div>
            {children}
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
            <div className="mb-2">
                <h2 className="text-xl font-semibold text-text-primary">Settings</h2>
                <p className="text-sm text-text-muted">Manage your account and preferences</p>
            </div>

            {/* Profile */}
            <Section
                icon={User}
                iconColor="from-calm-blue/20 to-calm-blue-deep/20 text-calm-blue"
                title="Profile"
                description="Your personal information"
            >
                <div className="space-y-3">
                    <div>
                        <label className="text-xs text-text-muted mb-1 block">Name</label>
                        <input type="text" defaultValue={user?.name} className="input-field" />
                    </div>
                    <div>
                        <label className="text-xs text-text-muted mb-1 block">Email</label>
                        <input type="email" defaultValue={user?.email} className="input-field" disabled />
                    </div>
                    <button className="btn-primary text-sm mt-2">Save changes</button>
                </div>
            </Section>

            {/* Privacy */}
            <Section
                icon={Shield}
                iconColor="from-accent-olive/20 to-accent-olive-deep/20 text-accent-olive"
                title="Privacy & Data"
                description="Your data belongs to you — always"
            >
                <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
                    <p>
                        Your journal entries are stored securely and are only accessible to you.
                        We never share, sell, or use your data for advertising.
                    </p>
                    <p>
                        When our AI analyzes your entries for insights, it processes the text to identify patterns and generate
                        reflections. This analysis is ephemeral and not stored separately from your entries.
                    </p>
                    <div className="pt-2 space-y-2">
                        <button
                            onClick={handleExport}
                            className="flex items-center justify-between w-full p-3 rounded-xl bg-dark-hover/50 border border-dark-border hover:border-calm-blue/20 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <Download size={16} className="text-calm-blue" />
                                <span className="text-text-primary text-sm">Export all journal data</span>
                            </div>
                            <ChevronRight size={14} className="text-text-muted group-hover:text-calm-blue transition-colors" />
                        </button>
                    </div>
                </div>
            </Section>

            {/* AI Transparency */}
            <Section
                icon={Brain}
                iconColor="from-accent-yellow/20 to-accent-yellow-deep/20 text-accent-yellow"
                title="AI & LLM Usage"
                description="How we use AI in your experience"
            >
                <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
                    <p>
                        Reflekt uses large language models to analyze your journal entries and provide:
                    </p>
                    <ul className="space-y-1.5 pl-1">
                        <li className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-calm-blue mt-2 flex-shrink-0" />
                            <span>Emotional tone analysis (sentiment detection)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-accent-pink mt-2 flex-shrink-0" />
                            <span>Key theme identification from your writing</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-accent-yellow mt-2 flex-shrink-0" />
                            <span>Personalized reflection questions</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-accent-olive mt-2 flex-shrink-0" />
                            <span>Weekly and monthly insight reports</span>
                        </li>
                    </ul>
                    <p className="text-text-muted text-xs italic">
                        This is not therapy or medical advice. If you're in crisis, please reach out to a professional.
                    </p>
                </div>
            </Section>

            {/* Theme */}
            <Section
                icon={Palette}
                iconColor="from-accent-pink/20 to-accent-pink-deep/20 text-accent-pink"
                title="Appearance"
                description="Customize your visual experience"
            >
                <div className="flex gap-3">
                    <button className="flex-1 p-3 rounded-xl bg-dark-hover border-2 border-calm-blue/40 text-center">
                        <div className="w-6 h-6 rounded-full bg-dark-pure mx-auto mb-2 border border-dark-border" />
                        <span className="text-xs text-calm-blue font-medium">Dark</span>
                    </button>
                    <button className="flex-1 p-3 rounded-xl bg-dark-hover border border-dark-border text-center opacity-50 cursor-not-allowed">
                        <div className="w-6 h-6 rounded-full bg-gray-200 mx-auto mb-2" />
                        <span className="text-xs text-text-muted">Light (soon)</span>
                    </button>
                    <button className="flex-1 p-3 rounded-xl bg-dark-hover border border-dark-border text-center opacity-50 cursor-not-allowed">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-dark-pure to-gray-200 mx-auto mb-2" />
                        <span className="text-xs text-text-muted">Auto (soon)</span>
                    </button>
                </div>
            </Section>

            {/* Danger zone */}
            <div className="glass-card p-6 border-accent-pink/20">
                <div className="flex items-start gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-accent-pink/10 flex items-center justify-center flex-shrink-0">
                        <Trash2 size={16} className="text-accent-pink" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary">Delete Everything</h3>
                        <p className="text-xs text-text-muted mt-0.5">Permanently delete your account and all journal data</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowDeleteModal(true)}
                    className="text-sm px-4 py-2 rounded-xl bg-accent-pink/10 text-accent-pink border border-accent-pink/20 hover:bg-accent-pink/20 transition-colors"
                >
                    Delete all my data
                </button>
            </div>

            {/* Delete confirmation modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Are you sure?"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-accent-pink/10 border border-accent-pink/20">
                        <AlertTriangle size={18} className="text-accent-pink flex-shrink-0" />
                        <p className="text-sm text-text-secondary">
                            This will permanently delete all your journal entries, reflections, and account data. This action cannot be undone.
                        </p>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <button onClick={() => setShowDeleteModal(false)} className="btn-ghost text-sm">
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteAll}
                            className="text-sm px-4 py-2 rounded-xl bg-accent-pink text-dark-pure font-medium hover:opacity-90 transition-opacity"
                        >
                            Delete permanently
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Toast */}
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.show}
                onClose={() => setToast((prev) => ({ ...prev, show: false }))}
            />
        </div>
    );
}
