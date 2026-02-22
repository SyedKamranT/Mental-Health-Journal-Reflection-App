import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Save, Sparkles, Loader2, PenLine } from "lucide-react";
import { journalApi, type JournalAnalysis } from "../lib/api";
import { toast } from "sonner";

export function JournalEntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [analysis, setAnalysis] = useState<JournalAnalysis | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loadingEntry, setLoadingEntry] = useState(isEditMode);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  // Load existing entry in edit mode
  useEffect(() => {
    if (id) {
      journalApi
        .get(id)
        .then((entry) => {
          setContent(entry.content);
          if (entry.analysis) {
            setAnalysis(entry.analysis);
            setSubmitted(true);
          }
        })
        .catch((err) => {
          toast.error("Failed to load entry.");
          navigate("/app/journal");
        })
        .finally(() => setLoadingEntry(false));
    }
  }, [id]);

  const handleSave = async () => {
    if (wordCount < 2) {
      toast.error("Write at least a few words before saving.");
      return;
    }
    setSaving(true);
    try {
      if (isEditMode && id) {
        await journalApi.update(id, content);
        toast.success("Entry updated.");
        navigate("/app/journal");
      } else {
        const result = await journalApi.create(content);
        if (result.analysis) {
          setAnalysis(result.analysis);
        }
        setSubmitted(true);
        toast.success("Entry saved & analyzed!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save entry.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingEntry) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="size-8 animate-spin text-[#8AA2C8]" />
      </div>
    );
  }

  // Post-submission view with analysis
  if (submitted && analysis) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/app/journal")}>
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Reflection Complete</h1>
            <p className="text-sm text-muted-foreground">Here's what I noticed in your entry</p>
          </div>
        </div>

        {/* Summary */}
        <Card className="bg-gradient-to-br from-[#8AA2C8]/5 to-transparent border-[#8AA2C8]/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-[#8AA2C8]" />
              <h2 className="font-medium">Summary</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{analysis.summary}</p>
          </CardContent>
        </Card>

        {/* Themes */}
        {analysis.themes.length > 0 && (
          <Card>
            <CardHeader>
              <h2 className="font-medium">Themes Detected</h2>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.themes.map((theme) => (
                  <Badge
                    key={theme}
                    variant="secondary"
                    className="bg-[#B6CAEB]/10 text-[#B6CAEB] border border-[#B6CAEB]/20"
                  >
                    {theme}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reflective Questions */}
        {analysis.reflective_questions.length > 0 && (
          <Card className="bg-gradient-to-br from-[#F5B8DA]/5 to-transparent border-[#F5B8DA]/20">
            <CardHeader>
              <h2 className="font-medium">Questions for Deeper Reflection</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.reflective_questions.map((q, i) => (
                <p key={i} className="text-muted-foreground text-sm pl-4 border-l-2 border-[#E09CC3]/30">
                  {q}
                </p>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={() => navigate("/app/journal/new")}
            className="bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black"
          >
            <PenLine className="size-4 mr-2" />
            Write Another
          </Button>
          <Button variant="outline" onClick={() => navigate("/app/journal")}>
            View History
          </Button>
        </div>
      </div>
    );
  }

  // Writing view
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">
            {isEditMode ? "Edit Entry" : "New Journal Entry"}
          </h1>
          <p className="text-sm text-muted-foreground">Write freely. No judgment, just reflection.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Textarea
            placeholder="What's on your mind today? Start writing and let your thoughts flow..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px] resize-none border-none bg-transparent text-base focus-visible:ring-0 p-0"
            disabled={saving}
          />
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {wordCount} {wordCount === 1 ? "word" : "words"}
        </p>
        <Button
          onClick={handleSave}
          disabled={saving || wordCount < 2}
          className="bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {isEditMode ? "Saving..." : "Saving & Analyzing..."}
            </>
          ) : (
            <>
              {isEditMode ? <Save className="size-4" /> : <Sparkles className="size-4" />}
              {isEditMode ? "Save Changes" : "Save & Reflect"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}