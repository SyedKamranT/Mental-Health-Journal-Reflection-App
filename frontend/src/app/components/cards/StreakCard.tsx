import { Card, CardContent, CardHeader } from "../ui/card";
import { Flame } from "lucide-react";

interface StreakCardProps {
  days?: number;
  message?: string;
}

export function StreakCard({ days = 0, message = "" }: StreakCardProps) {
  return (
    <Card className="bg-gradient-to-br from-[#F5B8DA]/10 to-transparent border-[#F5B8DA]/20">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Flame className="size-4 text-[#E09CC3]" />
          Writing Streak
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {days} {days === 1 ? "day" : "days"}
        </div>
        <p className="text-xs text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
