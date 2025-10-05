"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";

export function LiveDemoSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <AnimatedGradient
        colors={["#3B82F6", "#8B5CF6", "#EC4899"]}
        speed={0.03}
        blur="heavy"
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/10 border-2 border-green-500/30 mb-6 backdrop-blur-sm">
            <Activity className="h-5 w-5 text-green-500 animate-pulse" />
            <span className="text-lg font-semibold text-green-600 dark:text-green-400">
              LIVE DEMO
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            See It In Action
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
            This is <span className="text-foreground font-bold">our actual visitor counter</span> tracking real-time visitors
          </p>
        </motion.div>

        {/* Full-Width Flag Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Outer glow - more prominent */}
          <div className="absolute -inset-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30" />

          {/* Middle glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur-2xl opacity-20" />

          {/* Counter Container */}
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-2xl border-2 border-white/20 dark:border-slate-700/50 backdrop-blur-sm">
            <a
              href="https://info.flagcounter.com/in9G"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <img
                src="https://s01.flagcounter.com/countxl/in9G/bg_FFFFFF/txt_000000/border_CCCCCC/columns_8/maxflags_250/viewers_0/labels_1/pageviews_1/flags_0/percent_0/"
                alt="Live Visitor Counter - Real-time tracking from around the world"
                className="w-full h-auto rounded-xl transition-transform group-hover:scale-[1.02] duration-300"
                loading="eager"
              />
            </a>
          </div>

          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300" style={{ backgroundClip: 'border-box' }} />
          </div>
        </motion.div>

        {/* Minimal Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm md:text-base text-muted-foreground/80 italic">
            🌍 Every visitor to this page adds their country's flag above • Updates in real-time
          </p>
        </motion.div>
      </div>
    </section>
  );
}
