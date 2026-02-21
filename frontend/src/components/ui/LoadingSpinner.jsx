export default function LoadingSpinner({ size = 'md', text = '' }) {
    const sizes = {
        sm: 'w-5 h-5 border',
        md: 'w-8 h-8 border-2',
        lg: 'w-12 h-12 border-2',
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3 py-8">
            <div
                className={`${sizes[size]} border-calm-blue/30 border-t-calm-blue rounded-full animate-spin`}
            />
            {text && (
                <p className="text-sm text-text-muted animate-pulse">{text}</p>
            )}
        </div>
    );
}
