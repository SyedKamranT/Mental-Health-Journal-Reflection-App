import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { TrendingUp, Sparkles, Hash, Download } from "lucide-react";
import { motion } from "motion/react";
import { EmotionalTrendChart } from "../components/charts/EmotionalTrendChart";
import { ThemeDistributionChart } from "../components/charts/ThemeDistributionChart";

export function InsightsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-2xl font-semibold mb-2">Insights & Patterns</h1>
          <p className="text-muted-foreground">
            AI-generated understanding of your emotional journey
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="size-4" />
          Export Report
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-5 text-[#8AA2C8]" />
                  <CardTitle>Emotional Trends</CardTitle>
                </div>
                <CardDescription>
                  Your emotional landscape over the past 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmotionalTrendChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Hash className="size-5 text-[#F5B8DA]" />
                  <CardTitle>Theme Distribution</CardTitle>
                </div>
                <CardDescription>
                  Common themes detected in your entries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ThemeDistributionChart />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#8AA2C8]/10 to-[#B6CAEB]/5 border-[#8AA2C8]/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5 text-[#B6CAEB]" />
                  <CardTitle>Weekly Summary</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Key Observations</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8AA2C8] mt-1">•</span>
                      <span>
                        Your entries show increasing clarity and focus as the week progressed, 
                        with Thursday and Saturday showing the highest levels of calm.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F5B8DA] mt-1">•</span>
                      <span>
                        Themes of gratitude appeared 4 times this week, often connected to 
                        interpersonal connections and quiet moments.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#9AAB63] mt-1">•</span>
                      <span>
                        Wednesday's entry explored vulnerability in a constructive way, 
                        showing emotional courage and self-awareness.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-4 border-t border-border/50">
                  <h4 className="font-medium text-sm">Reflection Suggestion</h4>
                  <p className="text-sm text-muted-foreground">
                    Consider what specific practices or moments contributed to your increased 
                    sense of calm. How can you integrate these more intentionally?
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6 mt-6">
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Monthly insights will appear here as you continue your journaling journey.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="space-y-6 mt-6">
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                All-time insights will appear here as you build your reflection archive.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
