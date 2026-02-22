import { SidebarTrigger } from "../ui/sidebar";
import { Bell } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function AppHeader() {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.name?.split(" ")[0] || "there";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{getGreeting()}, {firstName}</p>
      </div>
      <button className="size-9 rounded-lg flex items-center justify-center hover:bg-accent transition-colors relative">
        <Bell className="size-4" />
      </button>
    </header>
  );
}
