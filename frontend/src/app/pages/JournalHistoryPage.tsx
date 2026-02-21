import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Calendar, Search, Filter, Clock } from "lucide-react";
import { motion } from "motion/react";
import { JournalEntryCard } from "../components/cards/JournalEntryCard";

const mockEntries = [
  {
    id: "1",
    date: "2026-02-21",
    preview: "Today was full of clarity. I spent time thinking about my goals and what truly matters. The morning meditation helped center my thoughts...",
    themes: ["Reflective", "Hopeful", "Focused"],
    wordCount: 342,
  },
  {
    id: "2",
    date: "2026-02-20",
    preview: "Feeling grateful for the small moments today. Coffee with a friend reminded me how important connections are...",
    themes: ["Grateful", "Connected"],
    wordCount: 218,
  },
  {
    id: "3",
    date: "2026-02-19",
    preview: "Challenging day at work, but I managed to stay grounded. Taking breaks to breathe made a difference...",
    themes: ["Resilient", "Mindful"],
    wordCount: 267,
  },
  {
    id: "4",
    date: "2026-02-18",
    preview: "Explored some old fears today. Writing about them helped me see them differently, less scary and more manageable...",
    themes: ["Vulnerable", "Brave"],
    wordCount: 405,
  },
  {
    id: "5",
    date: "2026-02-17",
    preview: "A quiet Sunday. Spent time reading and reflecting on the week. Sometimes the peaceful days are the most valuable...",
    themes: ["Peaceful", "Content"],
    wordCount: 189,
  },
];

export function JournalHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-semibold mb-2">Journal History</h1>
        <p className="text-muted-foreground">
          Your personal archive of reflection and growth
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search your entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input-background border-border/50"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="size-4" />
          Filter
        </Button>
        <Button variant="outline" className="gap-2">
          <Calendar className="size-4" />
          Date Range
        </Button>
      </motion.div>

      <div className="space-y-4">
        {mockEntries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
          >
            <JournalEntryCard entry={entry} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex justify-center pt-4"
      >
        <Button variant="outline">Load More</Button>
      </motion.div>
    </div>
  );
}
