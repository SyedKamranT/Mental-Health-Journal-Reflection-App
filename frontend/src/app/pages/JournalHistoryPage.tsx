import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { PenLine, Search, Loader2 } from "lucide-react";
import { JournalEntryCard } from "../components/cards/JournalEntryCard";
import { EmptyState } from "../components/states/EmptyState";
import { journalApi, type JournalListItem } from "../lib/api";
import { toast } from "sonner";

export function JournalHistoryPage() {
  const [entries, setEntries] = useState<JournalListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const fetchEntries = useCallback(
    async (pageNum: number, searchTerm: string, append = false) => {
      try {
        const data = await journalApi.list({
          search: searchTerm || undefined,
          page: pageNum,
          limit,
        });
        setEntries((prev) => (append ? [...prev, ...data.entries] : data.entries));
        setTotal(data.total);
      } catch (err: any) {
        toast.error("Failed to load entries.");
      }
    },
    []
  );

  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetchEntries(1, search).finally(() => setLoading(false));
  }, [search, fetchEntries]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    await fetchEntries(nextPage, search, true);
    setPage(nextPage);
    setLoadingMore(false);
  };

  // Debounced search
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const hasMore = entries.length < total;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Journal History</h1>
          <p className="text-muted-foreground mt-1">
            {total > 0 ? `${total} entr${total === 1 ? "y" : "ies"} total` : "Your reflection journey"}
          </p>
        </div>
        <Button asChild className="bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black">
          <Link to="/app/journal/new" className="gap-2">
            <PenLine className="size-4" />
            New Entry
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search your entries..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Entries List */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="size-6 animate-spin text-[#8AA2C8]" />
        </div>
      ) : entries.length === 0 ? (
        <EmptyState
          title={search ? "No entries found" : "No entries yet"}
          description={
            search
              ? "Try a different search term."
              : "Start your reflection journey by writing your first entry."
          }
          action={search ? undefined : { label: "Write Your First Entry", href: "/app/journal/new" }}
        />
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <JournalEntryCard
              key={entry.id}
              id={entry.id}
              date={entry.date}
              preview={entry.preview}
              themes={entry.themes}
              wordCount={entry.wordCount}
            />
          ))}

          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={handleLoadMore} disabled={loadingMore}>
                {loadingMore ? (
                  <><Loader2 className="size-4 animate-spin mr-2" /> Loading...</>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
