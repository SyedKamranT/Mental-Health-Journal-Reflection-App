import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface EmotionalTrendPoint {
  day: string;
  calm: number;
  energy: number;
  clarity: number;
}

interface EmotionalTrendChartProps {
  data?: EmotionalTrendPoint[];
}

const defaultData: EmotionalTrendPoint[] = [
  { day: "Mon", calm: 50, energy: 50, clarity: 50 },
  { day: "Tue", calm: 50, energy: 50, clarity: 50 },
  { day: "Wed", calm: 50, energy: 50, clarity: 50 },
  { day: "Thu", calm: 50, energy: 50, clarity: 50 },
  { day: "Fri", calm: 50, energy: 50, clarity: 50 },
  { day: "Sat", calm: 50, energy: 50, clarity: 50 },
  { day: "Sun", calm: 50, energy: 50, clarity: 50 },
];

export function EmotionalTrendChart({ data = defaultData }: EmotionalTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="calmGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8AA2C8" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8AA2C8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E09CC3" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#E09CC3" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="clarityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9AAB63" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#9AAB63" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="day"
          stroke="rgba(255,255,255,0.3)"
          fontSize={12}
          tickLine={false}
        />
        <YAxis
          stroke="rgba(255,255,255,0.3)"
          fontSize={12}
          tickLine={false}
          domain={[0, 100]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1a1a1a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="calm"
          stroke="#8AA2C8"
          fillOpacity={1}
          fill="url(#calmGradient)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="energy"
          stroke="#E09CC3"
          fillOpacity={1}
          fill="url(#energyGradient)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="clarity"
          stroke="#9AAB63"
          fillOpacity={1}
          fill="url(#clarityGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
