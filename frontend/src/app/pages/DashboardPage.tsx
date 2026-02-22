import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { PenLine, Clock, BookOpen, TrendingUp, Sparkles, MessageSquare, Loader2 } from "lucide-react";
import { StreakCard } from "../components/cards/StreakCard";
import { InsightCard } from "../components/cards/InsightCard";
import { EmotionalTrendChart } from "../components/charts/EmotionalTrendChart";
import { FirstTimeUserState } from "../components/states/EmptyState";
import { useAuth } from "../contexts/AuthContext";
import { dashboardApi, type DashboardData } from "../lib/api";
import { toast } from "sonner";

export function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const firstName = user?.user_metadata?.name?.split(" ")[0] || "there";

  useEffect(() => {
    dashboardApi
      .get()
      .then(setData)
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load dashboard data.");
      })
      .finally(() => setLoading(false));
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="size-8 animate-spin text-[#8AA2C8]" />
      </div>
    );
  }

  if (data?.is_first_time) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {getGreeting()}, {firstName} ✨
          </h1>
          <p className="text-muted-foreground mt-1">Welcome to your reflection space.</p>
        </div>
        <FirstTimeUserState />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {getGreeting()}, {firstName} ✨
          </h1>
          <p className="text-muted-foreground mt-1">Here's your reflection journey today.</p>
        </div>
        <Button asChild className="bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black">
          <Link to="/app/journal/new" className="gap-2">
            <PenLine className="size-4" />
            New Entry
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StreakCard days={data?.streak_days || 0} message={data?.streak_message || ""} />

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="size-4" />
              Monthly Entries
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data?.monthly_entries || 0}</div>
            <p className="text-xs text-muted-foreground">
              ~{data?.monthly_average || 0} per week average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="size-4" />
              Growth
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {(data?.growth_percentage || 0) >= 0 ? "+" : ""}{data?.growth_percentage || 0}%
            </div>
            <p className="text-xs text-muted-foreground">{data?.growth_message || ""}</p>
          </CardContent>
        </Card>
      </div>

      {/* Emotional Trend Chart */}
      {data?.emotional_trend && data.emotional_trend.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium">Emotional Trends</h2>
            <p className="text-sm text-muted-foreground">Your emotional landscape this week</p>
          </CardHeader>
          <CardContent>
            <EmotionalTrendChart data={data.emotional_trend} />
          </CardContent>
        </Card>
      )}

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.recent_prompt && (
          <InsightCard
            title="Today's Reflection"
            icon={<MessageSquare className="size-4 text-[#8AA2C8]" />}
            accentColor="from-[#8AA2C8]/5 to-transparent"
            borderColor="border-[#8AA2C8]/20"
          >
            <p className="text-sm text-muted-foreground">{data.recent_prompt}</p>
          </InsightCard>
        )}

        {data?.recent_pattern && (
          <InsightCard
            title="Recent Pattern"
            icon={<Sparkles className="size-4 text-[#E09CC3]" />}
            accentColor="from-[#F5B8DA]/5 to-transparent"
            borderColor="border-[#F5B8DA]/20"
          >
            <p className="text-sm text-muted-foreground">{data.recent_pattern}</p>
          </InsightCard>
        )}
      </div>
    </div>
  );
}