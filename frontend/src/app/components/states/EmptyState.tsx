import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { PenLine, Sparkles } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="size-16 rounded-xl bg-gradient-to-br from-[#8AA2C8]/10 to-[#B6CAEB]/5 flex items-center justify-center mb-4">
          {icon || <PenLine className="size-8 text-[#8AA2C8]/50" />}
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">{description}</p>
        {action && (
          <Button asChild className="bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black">
            <Link to={action.href}>{action.label}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function FirstTimeUserState() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-[#8AA2C8]/10 to-[#B6CAEB]/5 border-[#8AA2C8]/20">
        <CardContent className="p-8 text-center space-y-4">
          <div className="size-20 rounded-2xl bg-gradient-to-br from-[#B6CAEB] to-[#8AA2C8] flex items-center justify-center mx-auto">
            <Sparkles className="size-10 text-black" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Welcome to Your Reflection Space</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              This is where your journey begins. Start by writing your first entry, 
              and watch as insights unfold over time.
            </p>
          </div>
          <Button asChild size="lg" className="bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black mt-4">
            <Link to="/app/journal/new" className="gap-2">
              <PenLine className="size-4" />
              Write Your First Entry
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 space-y-2">
            <div className="size-10 rounded-lg bg-[#B6CAEB]/10 flex items-center justify-center">
              <PenLine className="size-5 text-[#8AA2C8]" />
            </div>
            <h3 className="font-medium">Write Freely</h3>
            <p className="text-sm text-muted-foreground">
              No structure required. Just you and your thoughts.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <div className="size-10 rounded-lg bg-[#F5B8DA]/10 flex items-center justify-center">
              <Sparkles className="size-5 text-[#E09CC3]" />
            </div>
            <h3 className="font-medium">Discover Patterns</h3>
            <p className="text-sm text-muted-foreground">
              AI reveals emotional themes and trends over time.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <div className="size-10 rounded-lg bg-[#9AAB63]/10 flex items-center justify-center">
              <Sparkles className="size-5 text-[#808E53]" />
            </div>
            <h3 className="font-medium">Grow & Reflect</h3>
            <p className="text-sm text-muted-foreground">
              Personalized prompts guide deeper self-awareness.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
