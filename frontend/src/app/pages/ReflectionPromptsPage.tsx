import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Sparkles, Heart, TrendingUp, Cloud, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

const prompts = {
  growth: [
    {
      id: "g1",
      prompt: "What's one small step you could take today toward a goal that matters to you?",
      category: "Growth",
    },
    {
      id: "g2",
      prompt: "Reflect on a challenge you overcame recently. What did you learn about yourself?",
      category: "Growth",
    },
    {
      id: "g3",
      prompt: "Where do you see yourself growing in the next three months? What would that feel like?",
      category: "Growth",
    },
  ],
  gratitude: [
    {
      id: "gr1",
      prompt: "What's something small that brought you joy today?",
      category: "Gratitude",
    },
    {
      id: "gr2",
      prompt: "Who has shown you kindness recently, and how did it impact you?",
      category: "Gratitude",
    },
    {
      id: "gr3",
      prompt: "What part of your daily routine are you most grateful for?",
      category: "Gratitude",
    },
  ],
  clarity: [
    {
      id: "c1",
      prompt: "What does balance mean to you right now? Where do you feel it, and where is it missing?",
      category: "Clarity",
    },
    {
      id: "c2",
      prompt: "If you could tell your past self something, what would it be?",
      category: "Clarity",
    },
    {
      id: "c3",
      prompt: "What are you holding onto that no longer serves you?",
      category: "Clarity",
    },
  ],
  stress: [
    {
      id: "s1",
      prompt: "What's weighing on your mind today? Write it out without judgment.",
      category: "Stress & Release",
    },
    {
      id: "s2",
      prompt: "When do you feel most at peace? How can you create more of those moments?",
      category: "Stress & Release",
    },
    {
      id: "s3",
      prompt: "What's one thing you can let go of this week to lighten your load?",
      category: "Stress & Release",
    },
  ],
};

export function ReflectionPromptsPage() {
  const [activeTab, setActiveTab] = useState("growth");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-2xl font-semibold mb-2">Reflection Prompts</h1>
          <p className="text-muted-foreground">
            Personalized questions to deepen your journaling practice
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="size-4" />
          Generate New
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="growth" className="gap-2">
              <TrendingUp className="size-3.5" />
              Growth
            </TabsTrigger>
            <TabsTrigger value="gratitude" className="gap-2">
              <Heart className="size-3.5" />
              Gratitude
            </TabsTrigger>
            <TabsTrigger value="clarity" className="gap-2">
              <Sparkles className="size-3.5" />
              Clarity
            </TabsTrigger>
            <TabsTrigger value="stress" className="gap-2">
              <Cloud className="size-3.5" />
              Release
            </TabsTrigger>
          </TabsList>

          <TabsContent value="growth" className="space-y-4 mt-6">
            {prompts.growth.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
              >
                <PromptCard prompt={item.prompt} category={item.category} color="from-[#9AAB63]/10 to-[#808E53]/5" />
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="gratitude" className="space-y-4 mt-6">
            {prompts.gratitude.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
              >
                <PromptCard prompt={item.prompt} category={item.category} color="from-[#F5B8DA]/10 to-[#E09CC3]/5" />
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="clarity" className="space-y-4 mt-6">
            {prompts.clarity.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
              >
                <PromptCard prompt={item.prompt} category={item.category} color="from-[#8AA2C8]/10 to-[#B6CAEB]/5" />
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="stress" className="space-y-4 mt-6">
            {prompts.stress.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
              >
                <PromptCard prompt={item.prompt} category={item.category} color="from-[#F7D768]/10 to-[#E8C84D]/5" />
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

interface PromptCardProps {
  prompt: string;
  category: string;
  color: string;
}

function PromptCard({ prompt, category, color }: PromptCardProps) {
  return (
    <Card className={`bg-gradient-to-br ${color} border-border/50`}>
      <CardHeader>
        <CardDescription className="text-xs">{category}</CardDescription>
        <CardTitle className="text-base font-normal leading-relaxed">{prompt}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="ghost" size="sm" className="text-[#8AA2C8] hover:text-[#B6CAEB]">
          Start Writing →
        </Button>
      </CardContent>
    </Card>
  );
}
