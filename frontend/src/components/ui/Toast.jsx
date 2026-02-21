import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const toastVariants = {
    success: {
        icon: CheckCircle,
        iconColor: 'text-accent-olive',
        borderColor: 'border-accent-olive/30',
    },
    error: {
        icon: AlertCircle,
        iconColor: 'text-accent-pink',
        borderColor: 'border-accent-pink/30',
    },
    info: {
        icon: Info,
        iconColor: 'text-calm-blue',
        borderColor: 'border-calm-blue/30',
    },
};

export default function Toast({ message, type = 'info', isVisible, onClose, duration = 4000 }) {
    const [show, setShow] = useState(false);
    const config = toastVariants[type] || toastVariants.info;
    const Icon = config.icon;

    useEffect(() => {
        if (isVisible) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                setTimeout(onClose, 300);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed bottom-6 right-6 z-[70] glass-card border ${config.borderColor}
        px-4 py-3 flex items-center gap-3 min-w-[280px] max-w-md
        transition-all duration-300 ${show ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}
      `}
        >
            <Icon size={18} className={config.iconColor} />
            <p className="text-sm text-text-primary flex-1">{message}</p>
            <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
                <X size={14} />
            </button>
        </div>
    );
}
