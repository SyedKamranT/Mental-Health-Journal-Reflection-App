import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Layers } from "lucide-react";
import { motion } from "motion/react";

export function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration - navigate to app
    navigate("/app");
  };

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
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Start your reflection journey today
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-11 bg-input-background border-border/50"
          />
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11 bg-input-background border-border/50"
          />
          <p className="text-xs text-muted-foreground">
            At least 8 characters
          </p>
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black mt-6"
        >
          Create Account
        </Button>
      </form>

      <div className="text-xs text-center text-muted-foreground">
        By signing up, you agree to our privacy-first approach. <br />
        Your data is encrypted and never shared.
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-[#8AA2C8] hover:text-[#B6CAEB] transition-colors">
          Sign in
        </Link>
      </div>
    </motion.div>
  );
}
