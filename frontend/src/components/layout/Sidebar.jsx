import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    LayoutDashboard,
    PenSquare,
    Clock,
    BarChart3,
    Lightbulb,
    Settings,
    LogOut,
    BookHeart,
    Menu,
    X,
} from 'lucide-react';

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/journal/new', icon: PenSquare, label: 'New Entry' },
    { to: '/journal/history', icon: Clock, label: 'History' },
    { to: '/insights', icon: BarChart3, label: 'Insights' },
    { to: '/prompts', icon: Lightbulb, label: 'Prompts' },
    { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ isOpen, onToggle }) {
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full z-50 flex flex-col
          bg-dark-bg border-r border-dark-border
          transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0 lg:w-20'}
        `}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-5 py-6 border-b border-dark-border">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-calm-blue to-calm-blue-deep flex items-center justify-center flex-shrink-0">
                        <BookHeart size={18} className="text-dark-pure" />
                    </div>
                    <span
                        className={`text-lg font-semibold text-text-primary transition-opacity duration-200
              ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0 hidden lg:block'}
            `}
                    >
                        Reflekt
                    </span>
                    <button
                        onClick={onToggle}
                        className="ml-auto text-text-muted hover:text-text-primary transition-colors lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    {navItems.map(({ to, icon: Icon, label }) => {
                        const isActive = location.pathname === to || location.pathname.startsWith(to + '/');
                        return (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => window.innerWidth < 1024 && onToggle?.()}
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl
                  transition-all duration-200 relative
                  ${isActive
                                        ? 'bg-gradient-calm text-calm-blue'
                                        : 'text-text-muted hover:text-text-primary hover:bg-dark-hover'
                                    }
                `}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-calm-blue rounded-r" />
                                )}
                                <Icon size={20} className="flex-shrink-0" />
                                <span
                                    className={`text-sm font-medium transition-opacity duration-200
                    ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0 hidden lg:block'}
                  `}
                                >
                                    {label}
                                </span>
                            </NavLink>
                        );
                    })}
                </nav>

                {/* User section */}
                <div className="border-t border-dark-border p-3">
                    <div className={`flex items-center gap-3 px-3 py-2 rounded-xl ${isOpen ? '' : 'justify-center lg:justify-center'}`}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-pink to-accent-pink-deep flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold text-dark-pure">
                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                        </div>
                        <div className={`flex-1 min-w-0 transition-opacity duration-200
              ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0 hidden lg:block'}
            `}>
                            <p className="text-sm font-medium text-text-primary truncate">
                                {user?.name || 'User'}
                            </p>
                            <p className="text-xs text-text-muted truncate">
                                {user?.email || ''}
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            className={`text-text-muted hover:text-accent-pink transition-colors
                ${isOpen ? '' : 'hidden lg:hidden'}
              `}
                            title="Sign out"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
