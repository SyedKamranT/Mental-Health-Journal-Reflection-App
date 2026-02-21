import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { FileQuestion } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="size-20 rounded-2xl bg-gradient-to-br from-[#8AA2C8]/20 to-[#B6CAEB]/10 flex items-center justify-center">
            <FileQuestion className="size-10 text-[#8AA2C8]" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild className="bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black">
            <Link to="/app">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/app/journal/new">Start Writing</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
