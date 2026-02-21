import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Layers, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function WelcomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center space-y-8"
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-4">
        <div className="size-20 rounded-2xl bg-gradient-to-br from-[#B6CAEB] to-[#8AA2C8] flex items-center justify-center shadow-lg shadow-[#8AA2C8]/20">
          <Layers className="size-10 text-black" />
        </div>
        <div>
          <h1 className="text-4xl font-semibold text-foreground mb-2">Reflection</h1>
          <p className="text-muted-foreground">Your private space for growth and clarity</p>
        </div>
      </div>

      {/* Features */}
      <div className="w-full space-y-3 py-6">
        <div className="flex items-start gap-3 text-left p-4 rounded-xl bg-card border border-border/50">
          <div className="size-10 rounded-lg bg-[#B6CAEB]/10 flex items-center justify-center flex-shrink-0">
            <Shield className="size-5 text-[#8AA2C8]" />
          </div>
          <div>
            <h3 className="font-medium text-card-foreground mb-1">Privacy First</h3>
            <p className="text-sm text-muted-foreground">
              Your thoughts stay yours. End-to-end privacy guaranteed.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-left p-4 rounded-xl bg-card border border-border/50">
          <div className="size-10 rounded-lg bg-[#F5B8DA]/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="size-5 text-[#E09CC3]" />
          </div>
          <div>
            <h3 className="font-medium text-card-foreground mb-1">AI-Powered Insights</h3>
            <p className="text-sm text-muted-foreground">
              Discover patterns, themes, and personalized reflections.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="w-full space-y-3 pt-4">
        <Button asChild className="w-full h-12 bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black">
          <Link to="/register">Get Started</Link>
        </Button>
        <Button asChild variant="outline" className="w-full h-12">
          <Link to="/login">Sign In</Link>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground pt-4">
        Free to use. No credit card required.
      </p>
    </motion.div>
  );
}
