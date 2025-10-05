"use client";

import { motion } from "framer-motion";
import { Zap, Globe, Shield, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";

interface BentoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  colors: string[];
  delay: number;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  colors,
  delay,
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay + 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative overflow-hidden h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full bg-background/50 backdrop-blur-sm border-muted">
        <AnimatedGradient colors={colors} speed={0.05} blur="medium" />
        <motion.div
          className="relative z-10 p-6 md:p-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={item} className="mb-4">
            {icon}
          </motion.div>
          <motion.h3 variants={item} className="text-base md:text-lg font-semibold mb-2">
            {title}
          </motion.h3>
          <motion.p
            variants={item}
            className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
          >
            {value}
          </motion.p>
          {subtitle && (
            <motion.p variants={item} className="text-sm text-muted-foreground">
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </Card>
    </motion.div>
  );
};

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose GitHub Visitor Counter?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for developers who want to showcase their global impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <BentoCard
              title="Free Forever"
              value="$0"
              subtitle="No hidden costs, no credit card required. Use it freely on unlimited projects."
              icon={<Zap className="h-8 w-8 text-primary" />}
              colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
              delay={0.2}
            />
          </div>
          <BentoCard
            title="Global Reach"
            value="195+"
            subtitle="Track visitors from every country in the world"
            icon={<Globe className="h-8 w-8 text-purple-500" />}
            colors={["#60A5FA", "#34D399", "#93C5FD"]}
            delay={0.4}
          />
          <BentoCard
            title="Uptime"
            value="99.9%"
            subtitle="Reliable service powered by Vercel and Flag Counter"
            icon={<TrendingUp className="h-8 w-8 text-green-500" />}
            colors={["#F59E0B", "#A78BFA", "#FCD34D"]}
            delay={0.6}
          />
          <div className="md:col-span-2">
            <BentoCard
              title="Privacy Focused"
              value="Zero PII"
              subtitle="No personal data collected. Only country-level analytics. Your visitors' privacy is protected."
              icon={<Shield className="h-8 w-8 text-pink-500" />}
              colors={["#EC4899", "#F472B6", "#3B82F6"]}
              delay={0.8}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
