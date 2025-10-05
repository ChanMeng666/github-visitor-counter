"use client";

import { useState } from "react";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ConfigForm } from "@/components/dashboard/config-form";
import { PreviewPanel } from "@/components/dashboard/preview-panel";
import type { CounterConfig } from "@/lib/constants";
import { DEFAULTS } from "@/lib/constants";

export default function DashboardPage() {
  const [config, setConfig] = useState<CounterConfig>({
    username: "",
    theme: "default",
    columns: DEFAULTS.COLUMNS,
    maxflags: DEFAULTS.MAX_FLAGS,
    label: DEFAULTS.LABEL,
    showcount: DEFAULTS.SHOW_COUNT,
    showlabels: DEFAULTS.SHOW_LABELS,
    flagsfrom: DEFAULTS.FLAGS_FROM as any,
    visitortype: DEFAULTS.VISITOR_TYPE as any,
    size: DEFAULTS.FLAG_SIZE as any,
  });

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Configure Your Visitor Counter
            </h1>
            <p className="text-muted-foreground">
              Customize your GitHub visitor counter with real-time preview
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuration Form */}
            <div className="lg:order-1">
              <ConfigForm config={config} onChange={setConfig} />
            </div>

            {/* Preview Panel */}
            <div className="lg:order-2">
              <PreviewPanel config={config} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
