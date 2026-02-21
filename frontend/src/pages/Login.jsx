import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookHeart, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-pure flex items-center justify-center relative overflow-hidden px-4">
            {/* Background */}
            <div className="gradient-orb w-80 h-80 bg-calm-blue top-[10%] left-[10%] animate-float" />
            <div className="gradient-orb w-64 h-64 bg-accent-pink bottom-[20%] right-[10%] animate-pulse-soft" />

            <div className="w-full max-w-md relative z-10 animate-slide-up">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2.5 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-calm-blue to-calm-blue-deep flex items-center justify-center">
                        <BookHeart size={20} className="text-dark-pure" />
                    </div>
                    <span className="text-xl font-semibold text-text-primary">Reflekt</span>
                </div>

                {/* Card */}
                <div className="glass-card p-8">
                    <h2 className="text-xl font-semibold text-text-primary mb-1 text-center">Welcome back</h2>
                    <p className="text-sm text-text-muted text-center mb-6">
                        Your thoughts are waiting for you
                    </p>

                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-accent-pink/10 border border-accent-pink/20 text-xs text-accent-pink">
                            {error}
                        </div>
                    )}

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

                        <div>
                            <label className="text-xs font-medium text-text-secondary mb-1.5 block">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pr-10"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <Link to="/forgot-password" className="text-xs text-calm-blue hover:text-calm-blue-deep transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button type="submit" disabled={isLoading} className="btn-primary w-full">
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    <p className="text-xs text-text-muted text-center mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-calm-blue hover:text-calm-blue-deep transition-colors">
                            Create one
                        </Link>
                    </p>
                </div>

                {/* Privacy note */}
                <p className="text-xs text-text-muted text-center mt-4">
                    🔒 Your data stays private and secure
                </p>
            </div>
        </div>
    );
}
