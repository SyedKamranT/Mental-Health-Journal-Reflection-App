import { useAuth } from '../../contexts/AuthContext';
import useGreeting from '../../hooks/useGreeting';
import { Search, Menu } from 'lucide-react';

export default function TopHeader({ onMenuToggle }) {
    const { user } = useAuth();
    const { greeting, subtitle } = useGreeting(user?.name);

    return (
        <header className="sticky top-0 z-30 bg-dark-pure/80 backdrop-blur-xl border-b border-dark-border">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Left: Hamburger + Greeting */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuToggle}
                        className="text-text-muted hover:text-text-primary transition-colors lg:hidden"
                    >
                        <Menu size={22} />
                    </button>
                    <div>
                        <h1 className="text-lg font-semibold text-text-primary">{greeting}</h1>
                        <p className="text-sm text-text-muted">{subtitle}</p>
                    </div>
                </div>

                {/* Right: Search */}
                <div className="hidden md:flex items-center gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Search your journal..."
                            className="input-field pl-9 pr-4 py-2 w-64 text-sm"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
