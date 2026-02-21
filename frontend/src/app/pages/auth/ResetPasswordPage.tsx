import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Layers, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="size-16 rounded-xl bg-gradient-to-br from-[#B6CAEB] to-[#8AA2C8] flex items-center justify-center mx-auto">
          <Layers className="size-8 text-black" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Check your email</h1>
          <p className="text-sm text-muted-foreground">
            We've sent a password reset link to <br />
            <span className="text-foreground">{email}</span>
          </p>
        </div>

        <Button asChild className="w-full h-11 bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black mt-6">
          <Link to="/login">Back to Sign In</Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Logo */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="size-16 rounded-xl bg-gradient-to-br from-[#B6CAEB] to-[#8AA2C8] flex items-center justify-center">
          <Layers className="size-8 text-black" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Reset your password</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your email and we'll send you a reset link
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 bg-input-background border-border/50"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black mt-6"
        >
          Send Reset Link
        </Button>
      </form>

      <Button asChild variant="ghost" className="w-full">
        <Link to="/login" className="flex items-center gap-2">
          <ArrowLeft className="size-4" />
          Back to Sign In
        </Link>
      </Button>
    </motion.div>
  );
}
