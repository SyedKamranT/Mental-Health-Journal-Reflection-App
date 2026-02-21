import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { theme: "Grateful", count: 12 },
  { theme: "Reflective", count: 18 },
  { theme: "Hopeful", count: 15 },
  { theme: "Resilient", count: 8 },
  { theme: "Peaceful", count: 10 },
  { theme: "Focused", count: 14 },
];

const colors = ["#8AA2C8", "#B6CAEB", "#F5B8DA", "#F7D768", "#9AAB63", "#E09CC3"];

export function ThemeDistributionChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="theme" 
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
            cursor={{ fill: "rgba(138, 162, 200, 0.1)" }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
