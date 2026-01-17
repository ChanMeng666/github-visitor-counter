"use client";

import { useState, useMemo, useCallback, useEffect, memo } from "react";
import { Copy, Check, Eye, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CounterConfig } from "@/lib/constants";
import { buildApiUrl, generateMarkdown, getDisplayModeInfo } from "@/lib/urlBuilder";

interface PreviewPanelProps {
  config: CounterConfig;
}

export const PreviewPanel = memo(function PreviewPanel({ config }: PreviewPanelProps) {
  const [copied, setCopied] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  // Memoize URL generation - only recalculate when config actually changes
  const url = useMemo(() => buildApiUrl({ config }), [
    config.counterId,
    config.username,
    config.repo,
    config.project,
    config.displayMode,
    config.theme,
    config.columns,
    config.maxflags,
    config.showlabels,
    config.visitortype,
    config.size,
    config.flagsFromCountry,
    config.mapSize,
    config.miniDisplay,
    config.label,
    config.showcount,
    config.customColors?.bg,
    config.customColors?.text,
    config.customColors?.border,
  ]);

  // Memoize markdown code
  const markdownCode = useMemo(() => generateMarkdown(config), [url]);

  // Memoize info message
  const infoMessage = useMemo(
    () => getDisplayModeInfo(config),
    [config.displayMode, config.flagsFromCountry]
  );

  // Use stable image URL with controlled cache-busting
  // Only update imageKey when URL actually changes
  useEffect(() => {
    setImageKey((prev) => prev + 1);
    setImageLoading(true);
  }, [url]);

  // Memoize copy handler
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdownCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [markdownCode]);

  // Stable image URL with controlled cache-busting
  const imageUrl = `${url}&_t=${imageKey}`;

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
              src={imageUrl}
              alt="Flag Counter Preview"
              className="max-w-full h-auto"
              onLoad={() => setImageLoading(false)}
              onLoadStart={() => setImageLoading(true)}
            />
          </div>

          <div className="bg-muted/50 border rounded-lg p-3">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>{infoMessage}</p>
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
});
