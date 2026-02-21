import { Link } from 'react-router-dom';
import { BookHeart, ArrowRight, Shield, Brain, Lock } from 'lucide-react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-dark-pure flex flex-col relative overflow-hidden">
            {/* Background orbs */}
            <div className="gradient-orb w-96 h-96 bg-calm-blue top-[-10%] left-[-5%] animate-float" />
            <div className="gradient-orb w-80 h-80 bg-accent-pink bottom-[-10%] right-[-5%] animate-float" style={{ animationDelay: '2s' }} />
            <div className="gradient-orb w-64 h-64 bg-accent-yellow top-[40%] right-[20%] animate-pulse-soft" />

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-8 py-6">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-calm-blue to-calm-blue-deep flex items-center justify-center">
                        <BookHeart size={18} className="text-dark-pure" />
                    </div>
                    <span className="text-lg font-semibold text-text-primary">Reflekt</span>
                </div>
                <Link
                    to="/login"
                    className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                    Sign in
                </Link>
            </header>

            {/* Hero */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto">
                <div className="mb-6 px-4 py-1.5 rounded-full bg-calm-blue/10 border border-calm-blue/20">
                    <span className="text-xs font-medium text-calm-blue">AI-Powered Reflection</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight tracking-tight">
                    Your private space for{' '}
                    <span className="text-gradient-blue">thoughtful</span>{' '}
                    reflection
                </h1>

                <p className="text-lg text-text-secondary mb-10 max-w-xl leading-relaxed">
                    Write freely, discover emotional patterns, and gain personalized insights —
                    all in a calm, private, and non-judgmental space.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/register" className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-3.5">
                        Get Started — It's Free
                        <ArrowRight size={18} />
                    </Link>
                    <Link to="/login" className="btn-ghost flex items-center justify-center gap-2 text-base px-8 py-3.5">
                        I have an account
                    </Link>
                </div>
            </main>

            {/* Feature cards */}
            <section className="relative z-10 px-6 pb-16">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-card p-6 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-calm mx-auto mb-4 flex items-center justify-center">
                            <Brain size={22} className="text-calm-blue" />
                        </div>
                        <h3 className="text-sm font-semibold text-text-primary mb-2">Smart Insights</h3>
                        <p className="text-xs text-text-muted leading-relaxed">
                            AI analyzes your entries to surface emotional patterns and reflective questions.
                        </p>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-pink mx-auto mb-4 flex items-center justify-center">
                            <Shield size={22} className="text-accent-pink" />
                        </div>
                        <h3 className="text-sm font-semibold text-text-primary mb-2">Privacy First</h3>
                        <p className="text-xs text-text-muted leading-relaxed">
                            Your journal is private. We never share your data. Export or delete anytime.
                        </p>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-yellow mx-auto mb-4 flex items-center justify-center">
                            <Lock size={22} className="text-accent-yellow" />
                        </div>
                        <h3 className="text-sm font-semibold text-text-primary mb-2">Safe Space</h3>
                        <p className="text-xs text-text-muted leading-relaxed">
                            Non-clinical, non-judgmental. Just a calm place for you to be yourself.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
