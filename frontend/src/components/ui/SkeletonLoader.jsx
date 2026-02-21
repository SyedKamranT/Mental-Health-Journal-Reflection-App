export default function SkeletonLoader({ variant = 'card', count = 1 }) {
    const skeletons = Array.from({ length: count }, (_, i) => i);

    const Pulse = ({ className }) => (
        <div className={`bg-dark-hover animate-pulse rounded-lg ${className}`} />
    );

    if (variant === 'card') {
        return skeletons.map((i) => (
            <div key={i} className="glass-card p-5 space-y-3">
                <Pulse className="h-4 w-24" />
                <Pulse className="h-8 w-16" />
                <Pulse className="h-3 w-full" />
                <Pulse className="h-3 w-3/4" />
            </div>
        ));
    }

    if (variant === 'journal') {
        return skeletons.map((i) => (
            <div key={i} className="glass-card p-5 space-y-3">
                <div className="flex items-center gap-3">
                    <Pulse className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Pulse className="h-3 w-32" />
                        <Pulse className="h-2 w-20" />
                    </div>
                </div>
                <Pulse className="h-3 w-full" />
                <Pulse className="h-3 w-5/6" />
                <Pulse className="h-3 w-2/3" />
            </div>
        ));
    }

    if (variant === 'chart') {
        return (
            <div className="glass-card p-5">
                <Pulse className="h-4 w-32 mb-4" />
                <Pulse className="h-48 w-full rounded-xl" />
            </div>
        );
    }

    if (variant === 'line') {
        return skeletons.map((i) => (
            <Pulse key={i} className="h-4 w-full" />
        ));
    }

    return null;
}
