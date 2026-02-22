import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { EmotionalTrendChart } from "../components/charts/EmotionalTrendChart";
import { ThemeDistributionChart } from "../components/charts/ThemeDistributionChart";
import { Sparkles, Loader2 } from "lucide-react";
import { insightsApi, type InsightsData } from "../lib/api";
import { EmptyState } from "../components/states/EmptyState";
import { toast } from "sonner";

export function InsightsPage() {
  const [period, setPeriod] = useState("weekly");
  const [data, setData] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    insightsApi
      .get(period)
      .then(setData)
      .catch(() => toast.error("Failed to load insights."))
      .finally(() => setLoading(false));
  }, [period]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Insights & Analytics</h1>
        <p className="text-muted-foreground mt-1">Patterns and trends from your reflections</p>
      </div>

      <Tabs value={period} onValueChange={setPeriod}>
        <TabsList>
          <TabsTrigger value="weekly">This Week</TabsTrigger>
          <TabsTrigger value="monthly">This Month</TabsTrigger>
          <TabsTrigger value="all">All Time</TabsTrigger>
        </TabsList>

        {loading ? (
          <div className="flex items-center justify-center h-40 mt-6">
            <Loader2 className="size-6 animate-spin text-[#8AA2C8]" />
          </div>
        ) : !data?.has_data ? (
          <div className="mt-6">
            <EmptyState
              title="No insights yet"
              description="Write a few journal entries to start seeing patterns and trends."
              action={{ label: "Write an Entry", href: "/app/journal/new" }}
            />
          </div>
        ) : (
          <div className="space-y-6 mt-6">
            {/* Emotional Trends */}
            {data.emotional_trends.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium">Emotional Trends</h2>
                  <p className="text-sm text-muted-foreground">How your emotional landscape has evolved</p>
                </CardHeader>
                <CardContent>
                  <EmotionalTrendChart data={data.emotional_trends} />
                </CardContent>
              </Card>
            )}

            {/* Theme Distribution */}
            {data.theme_distribution.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium">Theme Distribution</h2>
                  <p className="text-sm text-muted-foreground">Most common themes across your entries</p>
                </CardHeader>
                <CardContent>
                  <ThemeDistributionChart data={data.theme_distribution} />
                </CardContent>
              </Card>
            )}

            {/* Weekly Summary */}
            {data.weekly_summary && (
              <Card className="bg-gradient-to-br from-[#8AA2C8]/5 to-transparent border-[#8AA2C8]/20">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-5 text-[#8AA2C8]" />
                    <h2 className="text-lg font-medium">Weekly Summary</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.weekly_summary.observations.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Key Observations</h3>
                      <ul className="space-y-2">
                        {data.weekly_summary.observations.map((obs, i) => (
                          <li key={i} className="text-sm pl-4 border-l-2 border-[#8AA2C8]/30">
                            {obs}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {data.weekly_summary.reflection_suggestion && (
                    <div className="pt-3 border-t border-border/50">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Reflection for This Week
                      </h3>
                      <p className="text-sm italic text-[#B6CAEB]">
                        "{data.weekly_summary.reflection_suggestion}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </Tabs>
    </div>
  );
}
