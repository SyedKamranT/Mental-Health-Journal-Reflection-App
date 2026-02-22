import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import { Brain, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

export function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardContent className="p-8 text-center space-y-4">
          <div className="size-12 rounded-xl bg-[#9AAB63]/20 flex items-center justify-center mx-auto">
            <CheckCircle className="size-6 text-[#9AAB63]" />
          </div>
          <h2 className="text-xl font-semibold">Check Your Email</h2>
          <p className="text-sm text-muted-foreground">
            If an account exists for {email}, we've sent a password reset link.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/login">Back to Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader className="text-center space-y-2">
        <Link to="/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="size-4" />
          Back to Sign In
        </Link>
        <div className="size-12 rounded-xl bg-gradient-to-br from-[#B6CAEB] to-[#8AA2C8] flex items-center justify-center mx-auto">
          <Brain className="size-6 text-black" />
        </div>
        <h1 className="text-2xl font-semibold">Reset Password</h1>
        <p className="text-sm text-muted-foreground">Enter your email and we'll send you a reset link</p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email" type="email" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              required disabled={loading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black" disabled={loading}>
            {loading ? <><Loader2 className="size-4 animate-spin mr-2" /> Sending...</> : "Send Reset Link"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
