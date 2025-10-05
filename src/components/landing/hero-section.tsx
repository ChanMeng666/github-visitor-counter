"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import { InfiniteFlagsScroll } from "./infinite-flags-scroll";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <AnimatedGradient
        colors={["#3B82F6", "#8B5CF6", "#EC4899"]}
        speed={0.05}
        blur="heavy"
      />

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Free Forever • No Registration Required
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Showcase Your{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Global Reach
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Display visitor flags from around the world on your GitHub profile.
            Track international engagement with beautiful, customizable counters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 text-lg px-8">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/api-help">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                View Documentation
              </Button>
            </Link>
          </div>

          <InfiniteFlagsScroll />
        </div>
      </div>
    </section>
  );
}
