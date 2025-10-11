"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ConfigForm } from "@/components/dashboard/config-form";
import { PreviewPanel } from "@/components/dashboard/preview-panel";
import { ActionToolbar } from "@/components/dashboard/action-toolbar";
import { PageHeader } from "@/components/dashboard/page-header";
import { ConfigProgress } from "@/components/dashboard/config-progress";
import { ConfigImportExport } from "@/components/dashboard/config-import-export";
import { KeyboardShortcutsHelp } from "@/components/dashboard/keyboard-shortcuts-help";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import type { CounterConfig } from "@/lib/constants";
import { DEFAULTS, QUICK_PRESETS } from "@/lib/constants";

export default function DashboardPage() {
  const [config, setConfig] = useState<CounterConfig>({
    username: "",
    displayMode: DEFAULTS.DISPLAY_MODE,
    theme: "default",
    columns: DEFAULTS.COLUMNS,
    maxflags: DEFAULTS.MAX_FLAGS,
    label: DEFAULTS.LABEL,
    showcount: DEFAULTS.SHOW_COUNT,
    showlabels: DEFAULTS.SHOW_LABELS,
    flagsFromCountry: DEFAULTS.FLAGS_FROM_COUNTRY,
    visitortype: DEFAULTS.VISITOR_TYPE,
    size: DEFAULTS.FLAG_SIZE,
    mapSize: DEFAULTS.MAP_SIZE,
    miniDisplay: DEFAULTS.MINI_DISPLAY,
  });

  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const exportButtonRef = useRef<HTMLButtonElement>(null);
  const importButtonRef = useRef<HTMLButtonElement>(null);
  const copyMarkdownRef = useRef<HTMLButtonElement>(null);

  // Handler to reset all settings to defaults
  const handleReset = () => {
    setConfig({
      username: "",
      displayMode: DEFAULTS.DISPLAY_MODE,
      theme: "default",
      columns: DEFAULTS.COLUMNS,
      maxflags: DEFAULTS.MAX_FLAGS,
      label: DEFAULTS.LABEL,
      showcount: DEFAULTS.SHOW_COUNT,
      showlabels: DEFAULTS.SHOW_LABELS,
      flagsFromCountry: DEFAULTS.FLAGS_FROM_COUNTRY,
      visitortype: DEFAULTS.VISITOR_TYPE,
      size: DEFAULTS.FLAG_SIZE,
      mapSize: DEFAULTS.MAP_SIZE,
      miniDisplay: DEFAULTS.MINI_DISPLAY,
    });
  };

  // Handler to clear custom colors
  const handleClearColors = () => {
    setConfig({ ...config, customColors: undefined });
  };

  // Handler to apply quick preset
  const handleApplyPreset = (presetKey: keyof typeof QUICK_PRESETS) => {
    const preset = QUICK_PRESETS[presetKey];
    setConfig({
      ...config,
      ...preset,
      username: config.username, // Preserve username
    });
  };

  // Handler to import configuration
  const handleImport = (importedConfig: CounterConfig) => {
    setConfig(importedConfig);
  };

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: "r",
      ctrlKey: true,
      description: "Reset configuration",
      action: handleReset,
    },
    {
      key: "c",
      ctrlKey: true,
      shiftKey: true,
      description: "Clear custom colors",
      action: handleClearColors,
    },
    {
      key: "e",
      ctrlKey: true,
      description: "Export configuration",
      action: () => exportButtonRef.current?.click(),
    },
    {
      key: "i",
      ctrlKey: true,
      description: "Import configuration",
      action: () => importButtonRef.current?.click(),
    },
    {
      key: "k",
      ctrlKey: true,
      description: "Copy markdown code",
      action: () => copyMarkdownRef.current?.click(),
    },
    {
      key: "?",
      description: "Show keyboard shortcuts",
      action: () => setShowShortcutsHelp((prev) => !prev),
    },
  ]);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Page Header */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <PageHeader />
            <KeyboardShortcutsHelp />
          </div>

          {/* Action Toolbar and Import/Export */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <ActionToolbar
              config={config}
              onReset={handleReset}
              onClearColors={handleClearColors}
              onApplyPreset={handleApplyPreset}
            />
            <ConfigImportExport config={config} onImport={handleImport} />
          </div>

          {/* Configuration Progress Indicator */}
          <ConfigProgress config={config} />

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
