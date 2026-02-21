import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Flame } from "lucide-react";

export function StreakCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-[#9AAB63]/10 flex items-center justify-center">
            <Flame className="size-4 text-[#808E53]" />
          </div>
          <CardTitle>Writing Streak</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-semibold">7 days</div>
          <p className="text-sm text-muted-foreground">
            Keep the momentum going!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
