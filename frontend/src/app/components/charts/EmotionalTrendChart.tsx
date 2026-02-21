import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", calm: 65, energy: 45, clarity: 70 },
  { day: "Tue", calm: 70, energy: 55, clarity: 65 },
  { day: "Wed", calm: 60, energy: 48, clarity: 72 },
  { day: "Thu", calm: 75, energy: 62, clarity: 78 },
  { day: "Fri", calm: 68, energy: 58, clarity: 68 },
  { day: "Sat", calm: 80, energy: 70, clarity: 82 },
  { day: "Sun", calm: 72, energy: 65, clarity: 75 },
];

export function EmotionalTrendChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCalm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8AA2C8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8AA2C8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F7D768" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F7D768" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9AAB63" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#9AAB63" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="day" 
            stroke="#a0a0a0" 
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#a0a0a0" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="calm"
            stroke="#8AA2C8"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCalm)"
          />
          <Area
            type="monotone"
            dataKey="energy"
            stroke="#F7D768"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorEnergy)"
          />
          <Area
            type="monotone"
            dataKey="clarity"
            stroke="#9AAB63"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorClarity)"
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-[#8AA2C8]" />
          <span className="text-xs text-muted-foreground">Calm</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-[#F7D768]" />
          <span className="text-xs text-muted-foreground">Energy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-[#9AAB63]" />
          <span className="text-xs text-muted-foreground">Clarity</span>
        </div>
      </div>
    </div>
  );
}
