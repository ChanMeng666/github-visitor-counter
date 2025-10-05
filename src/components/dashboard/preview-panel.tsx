"use client";

import { useState } from "react";
import { Copy, Check, Eye, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CounterConfig } from "@/lib/constants";
import { API_BASE_URL } from "@/lib/constants";
import Image from "next/image";

interface PreviewPanelProps {
  config: CounterConfig;
}

export function PreviewPanel({ config }: PreviewPanelProps) {
  const [copied, setCopied] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const generateURL = () => {
    const params = new URLSearchParams();
    params.append("username", config.username || "github");

    if (config.theme !== "default") {
      params.append("theme", config.theme);
    }

    if (config.flagsfrom !== "all") {
      params.append("flagsfrom", config.flagsfrom);
    }

    if (config.columns !== 2) {
      params.append("columns", config.columns.toString());
    }

    if (config.maxflags !== 10) {
      params.append("maxflags", config.maxflags.toString());
    }

    if (config.label !== "Visitors") {
      params.append("label", config.label);
    }

    if (!config.showcount) {
      params.append("showcount", "false");
    }

    if (config.visitortype !== "number") {
      params.append("visitortype", config.visitortype);
    }

    if (config.showlabels) {
      params.append("showlabels", "true");
    }

    if (config.size !== "medium") {
      params.append("size", config.size);
    }

    if (config.customColors?.bg) {
      params.append("bg", config.customColors.bg);
    }

    if (config.customColors?.text) {
      params.append("text", config.customColors.text);
    }

    if (config.customColors?.border) {
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

  return (
    <div className="space-y-6 sticky top-24">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Live Preview
          </CardTitle>
          <CardDescription>Real-time preview of your visitor counter</CardDescription>
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
              <p>
                Each parameter combination creates its own visitor counter on Flag Counter's server.
              </p>
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
