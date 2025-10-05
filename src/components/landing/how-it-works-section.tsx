"use client";

import { motion } from "framer-motion";
import { Settings, Copy, FileCode, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Configure Your Counter",
    description: "Use our intuitive dashboard to customize your visitor counter. Choose from multiple themes, adjust colors, and set your preferences.",
    icon: <Settings className="h-10 w-10 text-primary" />,
  },
  {
    number: "02",
    title: "Copy the Code",
    description: "Get your unique markdown code with a single click. Our generator creates the perfect snippet for your GitHub profile.",
    icon: <Copy className="h-10 w-10 text-purple-500" />,
  },
  {
    number: "03",
    title: "Add to Your README",
    description: "Paste the code into your GitHub profile README.md file. That's it! Your visitor counter is now live.",
    icon: <FileCode className="h-10 w-10 text-pink-500" />,
  },
  {
    number: "04",
    title: "Track Your Visitors",
    description: "Watch as visitors from around the world appear on your profile. See flags and visitor counts update in real-time.",
    icon: <CheckCircle className="h-10 w-10 text-green-500" />,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple setup process - no technical expertise required
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow border-muted">
                <div className="mb-4">
                  <span className="text-5xl font-bold text-muted-foreground/20">
                    {step.number}
                  </span>
                </div>
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 md:p-8 rounded-lg bg-muted/50 border">
          <h3 className="text-xl font-semibold mb-4">Example Implementation</h3>
          <div className="bg-slate-900 rounded-md p-4 overflow-x-auto">
            <code className="text-sm text-slate-100 font-mono">
              ![](https://github-visitor-counter-zeta.vercel.app/api?username=YOUR_USERNAME&theme=dark&columns=4&maxflags=12)
            </code>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Replace <span className="font-mono bg-muted px-2 py-1 rounded">YOUR_USERNAME</span> with your GitHub username
          </p>
        </div>
      </div>
    </section>
  );
}
