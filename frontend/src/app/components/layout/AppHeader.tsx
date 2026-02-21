import { SidebarTrigger } from "../ui/sidebar";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";

export function AppHeader() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  
  let greeting = "Good evening";
  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <SidebarTrigger />
      
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{greeting}</p>
      </div>

      <Button variant="ghost" size="icon" className="relative">
        <Bell className="size-4" />
        <span className="sr-only">Notifications</span>
      </Button>
    </header>
  );
}
