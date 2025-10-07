import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, BookOpen, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "API Documentation - GitHub Visitor Counter",
  description: "GitHub Visitor Counter API documentation and usage examples. Learn how to integrate visitor flags into your GitHub profile.",
};

export default function APIHelpPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">API Documentation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              API Usage Guide
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn how to integrate the GitHub Visitor Counter into your profile with our simple API
            </p>
          </div>

          {/* Quick Start */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Quick Start
              </CardTitle>
              <CardDescription>Get started in seconds with this basic example</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-900 rounded-md p-4 overflow-x-auto">
                <code className="text-sm text-slate-100 font-mono">
                  ![](https://github-visitor-counter-tau.vercel.app/api?username=YOUR_USERNAME)
                </code>
              </div>
              <p className="text-sm text-muted-foreground">
                Replace <span className="font-mono bg-muted px-2 py-1 rounded">YOUR_USERNAME</span> with your GitHub username
              </p>
              <Link href="/dashboard">
                <Button className="w-full sm:w-auto">
                  Use the Interactive Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* API Endpoint */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                API Endpoint
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded">
                <code className="text-sm font-mono text-blue-900 dark:text-blue-100">
                  https://github-visitor-counter-tau.vercel.app/api
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Parameters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Parameters</CardTitle>
              <CardDescription>All available configuration options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Parameter</th>
                      <th className="text-left p-3 font-semibold">Type</th>
                      <th className="text-left p-3 font-semibold">Default</th>
                      <th className="text-left p-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="p-3 font-mono text-primary">username</td>
                      <td className="p-3">string</td>
                      <td className="p-3 font-mono">required</td>
                      <td className="p-3">Your GitHub username</td>
                    </tr>
                    <tr className="border-b bg-muted/30">
                      <td className="p-3 font-mono text-primary">theme</td>
                      <td className="p-3">string</td>
                      <td className="p-3 font-mono">default</td>
                      <td className="p-3">default, dark, github, github_dark, transparent</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-primary">columns</td>
                      <td className="p-3">number</td>
                      <td className="p-3 font-mono">2</td>
                      <td className="p-3">Number of columns (1-8)</td>
                    </tr>
                    <tr className="border-b bg-muted/30">
                      <td className="p-3 font-mono text-primary">maxflags</td>
                      <td className="p-3">number</td>
                      <td className="p-3 font-mono">10</td>
                      <td className="p-3">Maximum flags to display (1-250)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-primary">label</td>
                      <td className="p-3">string</td>
                      <td className="p-3 font-mono">Visitors</td>
                      <td className="p-3">Label text or "none" to hide</td>
                    </tr>
                    <tr className="border-b bg-muted/30">
                      <td className="p-3 font-mono text-primary">showcount</td>
                      <td className="p-3">boolean</td>
                      <td className="p-3 font-mono">true</td>
                      <td className="p-3">Show visitor count</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-primary">showlabels</td>
                      <td className="p-3">boolean</td>
                      <td className="p-3 font-mono">false</td>
                      <td className="p-3">Show country names</td>
                    </tr>
                    <tr className="border-b bg-muted/30">
                      <td className="p-3 font-mono text-primary">visitortype</td>
                      <td className="p-3">string</td>
                      <td className="p-3 font-mono">number</td>
                      <td className="p-3">number or percentage</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-primary">size</td>
                      <td className="p-3">string</td>
                      <td className="p-3 font-mono">medium</td>
                      <td className="p-3">small, medium, large</td>
                    </tr>
                    <tr className="border-b bg-muted/30">
                      <td className="p-3 font-mono text-primary">flagsfrom</td>
                      <td className="p-3">string</td>
                      <td className="p-3 font-mono">all</td>
                      <td className="p-3">all, us, ca</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-primary">bg</td>
                      <td className="p-3">string</td>
                      <td className="p-3 font-mono">-</td>
                      <td className="p-3">Background color (hex without #)</td>
                    </tr>
                    <tr className="border-b bg-muted/30">
                      <td className="p-3 font-mono text-primary">text</td>
                      <td className="p-3">string</td>
                      <td className="p-3 font-mono">-</td>
                      <td className="p-3">Text color (hex without #)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-primary">border</td>
                      <td className="p-3">string</td>
                      <td className="p-3 font-mono">-</td>
                      <td className="p-3">Border color (hex without #)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Examples */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Example Configurations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Dark Theme</h4>
                <div className="bg-slate-900 rounded-md p-4 overflow-x-auto">
                  <code className="text-sm text-slate-100 font-mono break-all">
                    ![](https://github-visitor-counter-tau.vercel.app/api?username=YOUR_USERNAME&theme=dark)
                  </code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Custom Layout (4 columns, 16 flags)</h4>
                <div className="bg-slate-900 rounded-md p-4 overflow-x-auto">
                  <code className="text-sm text-slate-100 font-mono break-all">
                    ![](https://github-visitor-counter-tau.vercel.app/api?username=YOUR_USERNAME&columns=4&maxflags=16)
                  </code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Minimal (No label, no count)</h4>
                <div className="bg-slate-900 rounded-md p-4 overflow-x-auto">
                  <code className="text-sm text-slate-100 font-mono break-all">
                    ![](https://github-visitor-counter-tau.vercel.app/api?username=YOUR_USERNAME&label=none&showcount=false)
                  </code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">GitHub Dark Theme with Custom Colors</h4>
                <div className="bg-slate-900 rounded-md p-4 overflow-x-auto">
                  <code className="text-sm text-slate-100 font-mono break-all">
                    ![](https://github-visitor-counter-tau.vercel.app/api?username=YOUR_USERNAME&theme=github_dark&bg=161B22&text=E6EDF3)
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Unique Counters</p>
                  <p>Each unique combination of parameters creates a separate counter on Flag Counter's server. This allows you to have multiple counters with different styles.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Caching</p>
                  <p>Responses are cached for 1 hour (3600 seconds) for optimal performance. The counter updates automatically.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Privacy</p>
                  <p>No personal data is collected. Only country-level analytics are tracked by the Flag Counter service.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  4
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Powered by Flag Counter</p>
                  <p>This service acts as a proxy to the Flag Counter API, providing an easy-to-use interface specifically designed for GitHub profiles.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to create your counter?</h3>
            <p className="text-muted-foreground mb-6">
              Use our interactive dashboard for an easy visual configuration experience
            </p>
            <Link href="/dashboard">
              <Button size="lg">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
