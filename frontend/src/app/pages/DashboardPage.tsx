import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { PenLine, TrendingUp, Calendar, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { EmotionalTrendChart } from "../components/charts/EmotionalTrendChart";
import { InsightCard } from "../components/cards/InsightCard";
import { StreakCard } from "../components/cards/StreakCard";
import { FirstTimeUserState } from "../components/states/EmptyState";

export function DashboardPage() {
  // Set to true to see first-time user experience
  const isFirstTimeUser = false;

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  
  let greeting = "Good evening";
  let greetingMessage = "Take a moment to reflect on your day";
  
  if (currentHour < 12) {
    greeting = "Good morning";
    greetingMessage = "How are you feeling this morning?";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
    greetingMessage = "How's your day unfolding?";
  }

  if (isFirstTimeUser) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-semibold">{greeting}</h1>
          <p className="text-muted-foreground">{greetingMessage}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FirstTimeUserState />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Greeting Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-semibold">{greeting}</h1>
        <p className="text-muted-foreground">{greetingMessage}</p>
      </motion.div>

      {/* Quick Action Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-[#8AA2C8]/10 to-[#B6CAEB]/5 border-[#8AA2C8]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Ready to write?</h3>
                <p className="text-sm text-muted-foreground">
                  Capture your thoughts and feelings in today's entry
                </p>
              </div>
              <Button asChild size="lg" className="bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black">
                <Link to="/app/journal/new" className="flex items-center gap-2">
                  <PenLine className="size-4" />
                  Start Writing
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StreakCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-[#F5B8DA]/10 flex items-center justify-center">
                  <Calendar className="size-4 text-[#E09CC3]" />
                </div>
                <CardTitle>This Month</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-semibold">18 entries</div>
                <p className="text-sm text-muted-foreground">
                  Average 4.5 entries per week
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-[#F7D768]/10 flex items-center justify-center">
                  <TrendingUp className="size-4 text-[#E8C84D]" />
                </div>
                <CardTitle>Growth</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-semibold">+12%</div>
                <p className="text-sm text-muted-foreground">
                  More reflective than last month
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Emotional Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Your Emotional Journey</CardTitle>
            <CardDescription>
              Weekly patterns generated from your entries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmotionalTrendChart />
          </CardContent>
        </Card>
      </motion.div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <InsightCard
            title="Reflection Prompt"
            icon={<Sparkles className="size-4 text-[#B6CAEB]" />}
            accentColor="from-[#B6CAEB]/10 to-[#8AA2C8]/5"
            borderColor="border-[#B6CAEB]/20"
          >
            <p className="text-sm leading-relaxed">
              "What brought you the most peace this week? Reflect on those moments 
              and consider how you can create more of them."
            </p>
            <Button asChild variant="ghost" size="sm" className="mt-4 text-[#8AA2C8] hover:text-[#B6CAEB]">
              <Link to="/app/prompts">View All Prompts →</Link>
            </Button>
          </InsightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <InsightCard
            title="Recent Pattern"
            icon={<Sparkles className="size-4 text-[#F5B8DA]" />}
            accentColor="from-[#F5B8DA]/10 to-[#E09CC3]/5"
            borderColor="border-[#F5B8DA]/20"
          >
            <p className="text-sm leading-relaxed">
              Your recent entries show increased clarity around personal goals. 
              Themes of determination and focus appear frequently.
            </p>
            <Button asChild variant="ghost" size="sm" className="mt-4 text-[#E09CC3] hover:text-[#F5B8DA]">
              <Link to="/app/insights">Explore Insights →</Link>
            </Button>
          </InsightCard>
        </motion.div>
      </div>
    </div>
  );
}