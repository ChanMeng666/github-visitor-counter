"use client";

import { Check, X, Zap, Crown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ComparisonSection() {
  const features = [
    {
      feature: "Zero Configuration",
      ours: true,
      official: false,
      highlight: true,
      description: "No account registration required - just use your GitHub username"
    },
    {
      feature: "Per-Repository Counters",
      ours: true,
      official: false,
      highlight: true,
      description: "Independent tracking for each repository"
    },
    {
      feature: "Real-time Configuration Dashboard",
      ours: true,
      official: false,
      highlight: true,
      description: "Live preview with instant feedback"
    },
    {
      feature: "One-line Integration",
      ours: true,
      official: false,
      highlight: false,
      description: "Single markdown line - no HTML required"
    },
    {
      feature: "Keyboard Shortcuts",
      ours: true,
      official: false,
      highlight: false,
      description: "Productivity shortcuts (Ctrl+R, Ctrl+E, Ctrl+K)"
    },
    {
      feature: "Config Import/Export",
      ours: true,
      official: false,
      highlight: false,
      description: "Save and share your configurations"
    },
    {
      feature: "Open Source & Self-Hostable",
      ours: true,
      official: false,
      highlight: true,
      description: "Full control with MIT license"
    },
    {
      feature: "Modern Tech Stack",
      ours: true,
      official: false,
      highlight: false,
      description: "Next.js 15, React 19, TypeScript"
    },
    {
      feature: "Official Counter ID Support",
      ours: true,
      official: true,
      highlight: false,
      description: "Compatible with flagcounter.com management dashboard"
    },
    {
      feature: "Detailed Analytics Dashboard",
      ours: false,
      official: true,
      highlight: false,
      description: "Via official Counter ID integration"
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Crown className="h-4 w-4" />
            Why Choose Us?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for Modern Developers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Combining the power of Flag Counter with developer-friendly features and zero configuration hassle
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="border-2">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Feature Comparison</CardTitle>
              <CardDescription>See how we stack up against the official Flag Counter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4 font-semibold">Feature</th>
                      <th className="text-center py-4 px-4 font-semibold">
                        <div className="flex items-center justify-center gap-2">
                          <Zap className="h-5 w-5 text-primary" />
                          <span>Our Solution</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 font-semibold">Official Flag Counter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((item, index) => (
                      <tr
                        key={index}
                        className={`border-b transition-colors hover:bg-muted/50 ${
                          item.highlight ? 'bg-primary/5' : ''
                        }`}
                      >
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {item.feature}
                              {item.highlight && (
                                <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                  <Zap className="h-3 w-3" />
                                  New
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {item.description}
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-4 px-4">
                          {item.ours ? (
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10">
                              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                              <X className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          {item.official ? (
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10">
                              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                              <X className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Best of Both Worlds</h4>
                    <p className="text-muted-foreground">
                      Our solution is fully compatible with official Flag Counter IDs.
                      Use our streamlined interface for quick setup, or integrate your existing
                      Counter ID to access official analytics dashboard. You choose what works best for you!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Advantages Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Instant Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No registration, no waiting. Add your GitHub username and start tracking visitors in seconds.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Developer First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built by developers for developers. Modern UI, keyboard shortcuts, and Git-friendly workflow.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Crown className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Open Source</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                100% free and open source. Deploy on your own infrastructure or use our hosted version.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
