"use client";

import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";

export function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <AnimatedGradient
        colors={["#3B82F6", "#8B5CF6", "#EC4899"]}
        speed={0.05}
        blur="heavy"
      />

      <div className="relative z-10 container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 backdrop-blur-sm bg-background/30 border rounded-2xl p-12">
          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to Show Your Global Impact?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers showcasing their international reach.
            Start tracking your GitHub profile visitors today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 text-lg px-8">
                Create Your Counter
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="https://github.com/ChanMeng666/github-visitor-counter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                <Github className="h-5 w-5" />
                Star on GitHub
              </Button>
            </Link>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">Free</div>
              <div className="text-sm text-muted-foreground">Forever</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">30s</div>
              <div className="text-sm text-muted-foreground">Setup Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Maintenance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
