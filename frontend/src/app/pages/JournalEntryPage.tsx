import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Save, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function JournalEntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  
  const isEditing = !!id;

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContent(text);
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    toast.loading("Processing your entry...", { id: "processing" });
    
    // Simulate LLM processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Entry saved successfully!", { id: "processing" });
    setIsProcessing(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <Card className="bg-gradient-to-br from-[#8AA2C8]/10 to-[#B6CAEB]/5 border-[#8AA2C8]/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-[#8AA2C8] flex items-center justify-center">
                <Sparkles className="size-5 text-black" />
              </div>
              <CardTitle>Entry Reflected</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your entry has been saved and analyzed. Here's what we discovered:
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your entry reflects a moment of introspection and growth. You explored themes 
              of personal clarity, challenges with balance, and gratitude for small moments. 
              There's a sense of forward momentum paired with gentle self-awareness.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emotional Themes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs bg-[#8AA2C8]/10 text-[#B6CAEB] border border-[#8AA2C8]/20">
                Reflective
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-[#9AAB63]/10 text-[#9AAB63] border border-[#9AAB63]/20">
                Hopeful
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-[#F7D768]/10 text-[#E8C84D] border border-[#F7D768]/20">
                Focused
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reflective Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-sm">
                What specific actions could help you maintain this sense of clarity?
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-sm">
                How can you honor the balance you're seeking while staying present?
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={() => navigate("/app/history")} variant="outline" className="flex-1">
            View All Entries
          </Button>
          <Button 
            onClick={() => {
              setContent("");
              setWordCount(0);
              setIsSubmitted(false);
            }} 
            className="flex-1 bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black"
          >
            Write Another Entry
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {isEditing ? "Edit Entry" : "New Journal Entry"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date().toLocaleDateString("en-US", { 
              weekday: "long", 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </span>
          <Button 
            onClick={handleSubmit}
            disabled={content.trim().length < 10 || isProcessing}
            className="bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black"
          >
            {isProcessing ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Save className="size-4 mr-2" />
                Save & Reflect
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          <Textarea
            value={content}
            onChange={handleContentChange}
            placeholder="How are you feeling today? What's on your mind?

Take your time. There's no rush, no judgment—just you and your thoughts.

Write freely about whatever comes to mind..."
            className="min-h-[500px] border-0 resize-none focus-visible:ring-0 text-base leading-relaxed p-8 bg-transparent"
          />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-[#B6CAEB]/5 to-[#8AA2C8]/5 border-[#8AA2C8]/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3 text-sm">
            <Sparkles className="size-4 text-[#8AA2C8] mt-0.5 flex-shrink-0" />
            <p className="text-muted-foreground">
              After saving, our AI will generate personalized insights, emotional themes, 
              and reflective questions based on your entry. Your privacy is always protected.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}