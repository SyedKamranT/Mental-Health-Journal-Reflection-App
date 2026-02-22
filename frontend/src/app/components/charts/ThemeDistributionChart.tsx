import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ThemeDistItem {
  theme: string;
  count: number;
}

interface ThemeDistributionChartProps {
  data?: ThemeDistItem[];
}

const defaultData: ThemeDistItem[] = [
  { theme: "Reflective", count: 0 },
];

const COLORS = ["#8AA2C8", "#E09CC3", "#9AAB63", "#B6CAEB", "#F5B8DA", "#808E53"];

export function ThemeDistributionChart({ data = defaultData }: ThemeDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="theme"
          stroke="rgba(255,255,255,0.3)"
          fontSize={12}
          tickLine={false}
        />
        <YAxis
          stroke="rgba(255,255,255,0.3)"
          fontSize={12}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1a1a1a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Bar
          dataKey="count"
          fill="#8AA2C8"
          radius={[4, 4, 0, 0]}
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
