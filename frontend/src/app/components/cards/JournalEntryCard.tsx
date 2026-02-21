import { Link } from "react-router";
import { Card, CardContent } from "../ui/card";
import { Clock, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface JournalEntry {
  id: string;
  date: string;
  preview: string;
  themes: string[];
  wordCount: number;
}

interface JournalEntryCardProps {
  entry: JournalEntry;
}

export function JournalEntryCard({ entry }: JournalEntryCardProps) {
  const date = new Date(entry.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="hover:border-[#8AA2C8]/30 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Clock className="size-4" />
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{entry.wordCount} words</span>
            </div>
            
            <p className="text-sm leading-relaxed line-clamp-2">
              {entry.preview}
            </p>

            <div className="flex flex-wrap gap-2">
              {entry.themes.map((theme) => (
                <span
                  key={theme}
                  className="px-2.5 py-1 rounded-full text-xs bg-[#8AA2C8]/10 text-[#B6CAEB] border border-[#8AA2C8]/20"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>

          <Button asChild variant="ghost" size="icon" className="flex-shrink-0">
            <Link to={`/app/journal/${entry.id}`}>
              <ChevronRight className="size-4" />
              <span className="sr-only">View entry</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
