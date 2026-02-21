import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-card px-3 py-2 text-xs">
                <p className="text-text-secondary mb-1">{label}</p>
                {payload.map((entry, i) => (
                    <p key={i} style={{ color: entry.color }} className="font-medium">
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function EmotionChart({ data, height = 240, title }) {
    return (
        <div className="glass-card p-5">
            {title && (
                <h3 className="text-sm font-semibold text-text-primary mb-4">{title}</h3>
            )}
            <ResponsiveContainer width="100%" height={height}>
                <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="gradientCalm" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#B6CAEB" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#B6CAEB" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradientPink" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F5B8DA" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#F5B8DA" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradientYellow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F7D768" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#F7D768" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 11 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 11 }}
                        domain={[0, 10]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="calm"
                        stroke="#B6CAEB"
                        strokeWidth={2}
                        fill="url(#gradientCalm)"
                        name="Calm"
                    />
                    <Area
                        type="monotone"
                        dataKey="energy"
                        stroke="#F5B8DA"
                        strokeWidth={2}
                        fill="url(#gradientPink)"
                        name="Energy"
                    />
                    <Area
                        type="monotone"
                        dataKey="clarity"
                        stroke="#F7D768"
                        strokeWidth={2}
                        fill="url(#gradientYellow)"
                        name="Clarity"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
