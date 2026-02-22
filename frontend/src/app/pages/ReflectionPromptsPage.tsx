import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Sparkles, Lightbulb, Heart, Eye, Wind, Loader2 } from "lucide-react";
import { promptsApi, type PromptsData, type PromptItem } from "../lib/api";
import { toast } from "sonner";

const categoryIcons: Record<string, React.ReactNode> = {
  growth: <Lightbulb className="size-4 text-[#8AA2C8]" />,
  gratitude: <Heart className="size-4 text-[#E09CC3]" />,
  clarity: <Eye className="size-4 text-[#B6CAEB]" />,
  stress: <Wind className="size-4 text-[#9AAB63]" />,
};

const categoryLabels: Record<string, string> = {
  growth: "Growth",
  gratitude: "Gratitude",
  clarity: "Clarity",
  stress: "Stress & Release",
};

function PromptCard({ prompt }: { prompt: PromptItem }) {
  return (
    <Card className="group hover:border-[#8AA2C8]/30 transition-colors">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="size-8 rounded-lg bg-card border flex items-center justify-center shrink-0 mt-0.5">
            {categoryIcons[prompt.category] || <Sparkles className="size-4" />}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{prompt.prompt}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function ReflectionPromptsPage() {
  const [data, setData] = useState<PromptsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("growth");

  useEffect(() => {
    promptsApi
      .list()
      .then(setData)
      .catch(() => toast.error("Failed to load prompts."))
      .finally(() => setLoading(false));
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const newPrompts = await promptsApi.generate();
      // Merge new prompts with existing
      setData((prev) => {
        if (!prev) return newPrompts;
        return {
          growth: [...newPrompts.growth, ...prev.growth],
          gratitude: [...newPrompts.gratitude, ...prev.gratitude],
          clarity: [...newPrompts.clarity, ...prev.clarity],
          stress: [...newPrompts.stress, ...prev.stress],
        };
      });
      toast.success("New prompts generated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to generate prompts.");
    } finally {
      setGenerating(false);
    }
  };

  const categories = ["growth", "gratitude", "clarity", "stress"] as const;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Reflection Prompts</h1>
          <p className="text-muted-foreground mt-1">Curated questions to guide your journaling</p>
        </div>
        <Button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black gap-2"
        >
          {generating ? (
            <><Loader2 className="size-4 animate-spin" /> Generating...</>
          ) : (
            <><Sparkles className="size-4" /> Generate New</>
          )}
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="size-6 animate-spin text-[#8AA2C8]" />
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="gap-1.5">
                {categoryIcons[cat]}
                {categoryLabels[cat]}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat} value={cat} className="space-y-3 mt-6">
              {(data?.[cat] || []).length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <p className="text-sm text-muted-foreground">
                      No prompts yet. Click "Generate New" to create some!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                (data?.[cat] || []).map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
