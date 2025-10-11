"use client";

import { useState } from "react";
import { Copy, Check, Eye, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CounterConfig } from "@/lib/constants";
import { API_BASE_URL, THEMES } from "@/lib/constants";

interface PreviewPanelProps {
  config: CounterConfig;
}

export function PreviewPanel({ config }: PreviewPanelProps) {
  const [copied, setCopied] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const generateURL = () => {
    const params = new URLSearchParams();
    params.append("username", config.username || "github");
    params.append("displayMode", config.displayMode);

    // Theme
    if (config.theme !== "default") {
      params.append("theme", config.theme);
    }

    // Top Countries & Flags From mode parameters
    if (config.displayMode === "topCountries" || config.displayMode === "flagsFrom") {
      if (config.columns && config.columns !== 2) {
        params.append("columns", config.columns.toString());
      }

      if (config.maxflags && config.maxflags !== 10) {
        params.append("maxflags", config.maxflags.toString());
      }

      if (config.showlabels) {
        params.append("showlabels", "true");
      }

      if (config.visitortype && config.visitortype !== "number") {
        params.append("visitortype", config.visitortype);
      }

      if (config.size && config.size !== "medium") {
        params.append("size", config.size);
      }
    }

    // Flags From specific
    if (config.displayMode === "flagsFrom" && config.flagsFromCountry) {
      params.append("flagsFromCountry", config.flagsFromCountry);
    }

    // Map mode specific
    if (config.displayMode === "flagMap" && config.mapSize && config.mapSize !== "small") {
      params.append("mapSize", config.mapSize);
    }

    // Mini Counter specific
    if (config.displayMode === "miniCounter" && config.miniDisplay && config.miniDisplay !== "flags") {
      params.append("miniDisplay", config.miniDisplay);
    }

    // Label (for all except mini counter)
    if (config.displayMode !== "miniCounter") {
      if (config.label && config.label !== "Visitors") {
        params.append("label", config.label);
      }

      if (config.showcount === false) {
        params.append("showcount", "false");
      }
    }

    // Custom colors
    const selectedTheme = THEMES[config.theme] || THEMES.default;

    // Background color (not for map mode)
    if (config.displayMode !== "flagMap" && config.customColors?.bg && config.customColors.bg !== selectedTheme.bg) {
      params.append("bg", config.customColors.bg);
    }

    if (config.customColors?.text && config.customColors.text !== selectedTheme.text) {
      params.append("text", config.customColors.text);
    }

    if (config.customColors?.border && config.customColors.border !== selectedTheme.border) {
      params.append("border", config.customColors.border);
    }

    return `${API_BASE_URL}/api?${params.toString()}`;
  };

  const url = generateURL();
  const markdownCode = `![](${url})`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Get mode-specific info message
  const getInfoMessage = () => {
    switch (config.displayMode) {
      case "topCountries":
        return "Shows top countries visiting your GitHub profile with flag visualization";
      case "flagMap":
        return "Displays an interactive world map showing visitor distribution";
      case "flagsFrom":
        return `Shows detailed flag breakdown from ${config.flagsFromCountry === "us" ? "United States" : "Canada"}`;
      case "miniCounter":
        return "Compact counter showing either total flags or pageview count";
      default:
        return "Each parameter combination creates its own visitor counter";
    }
  };

  return (
    <div className="space-y-6 sticky top-24">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Live Preview
          </CardTitle>
          <CardDescription>
            Real-time preview of your {config.displayMode === "topCountries" && "top countries counter"}
            {config.displayMode === "flagMap" && "flag map"}
            {config.displayMode === "flagsFrom" && "flags from counter"}
            {config.displayMode === "miniCounter" && "mini counter"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative min-h-[200px] bg-muted/30 rounded-lg p-6 flex items-center justify-center">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            <img
              src={`${url}&_t=${Date.now()}`}
              alt="Flag Counter Preview"
              className="max-w-full h-auto"
              onLoad={() => setImageLoading(false)}
              onLoadStart={() => setImageLoading(true)}
            />
          </div>

          <div className="bg-muted/50 border rounded-lg p-3">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>{getInfoMessage()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Markdown Code</CardTitle>
          <CardDescription>Copy and paste into your GitHub README</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-900 rounded-md p-4 overflow-x-auto">
            <code className="text-sm text-slate-100 font-mono break-all whitespace-pre-wrap">
              {markdownCode}
            </code>
          </div>

          <Button onClick={handleCopy} className="w-full gap-2">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </>
            )}
          </Button>

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-3 text-sm">Quick Start</h4>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Enter your GitHub username</li>
              <li>Select display mode</li>
              <li>Customize the appearance</li>
              <li>Copy the markdown code above</li>
              <li>Paste into your GitHub README.md</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
