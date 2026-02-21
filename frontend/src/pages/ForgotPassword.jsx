import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookHeart, ArrowLeft, Mail } from 'lucide-react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock: simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmitted(true);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-dark-pure flex items-center justify-center relative overflow-hidden px-4">
            <div className="gradient-orb w-72 h-72 bg-accent-yellow top-[20%] left-[15%] animate-float" />

            <div className="w-full max-w-md relative z-10 animate-slide-up">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2.5 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-calm-blue to-calm-blue-deep flex items-center justify-center">
                        <BookHeart size={20} className="text-dark-pure" />
                    </div>
                    <span className="text-xl font-semibold text-text-primary">Reflekt</span>
                </div>

                <div className="glass-card p-8">
                    {isSubmitted ? (
                        <div className="text-center animate-fade-in">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-calm mx-auto mb-5 flex items-center justify-center">
                                <Mail size={24} className="text-calm-blue" />
                            </div>
                            <h2 className="text-xl font-semibold text-text-primary mb-2">Check your email</h2>
                            <p className="text-sm text-text-muted mb-6 leading-relaxed">
                                If an account exists for <span className="text-text-secondary">{email}</span>,
                                we've sent instructions to reset your password.
                            </p>
                            <Link to="/login" className="btn-primary inline-flex items-center gap-2">
                                <ArrowLeft size={16} />
                                Back to sign in
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold text-text-primary mb-1 text-center">Reset password</h2>
                            <p className="text-sm text-text-muted text-center mb-6">
                                No worries, it happens to the best of us
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-text-secondary mb-1.5 block">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-field"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                                <button type="submit" disabled={isLoading} className="btn-primary w-full">
                                    {isLoading ? 'Sending...' : 'Send reset link'}
                                </button>
                            </form>

                            <p className="text-xs text-text-muted text-center mt-6">
                                <Link to="/login" className="text-calm-blue hover:text-calm-blue-deep transition-colors inline-flex items-center gap-1">
                                    <ArrowLeft size={12} />
                                    Back to sign in
                                </Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
