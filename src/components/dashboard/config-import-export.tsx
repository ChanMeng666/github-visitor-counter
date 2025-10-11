"use client";

import { useState } from "react";
import { Download, Upload, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { CounterConfig } from "@/lib/constants";

interface ConfigImportExportProps {
  config: CounterConfig;
  onImport: (config: CounterConfig) => void;
}

export function ConfigImportExport({ config, onImport }: ConfigImportExportProps) {
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");
  const [importSuccess, setImportSuccess] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Export configuration as JSON
  const handleExport = () => {
    const configJson = JSON.stringify(config, null, 2);
    return configJson;
  };

  // Copy exported config to clipboard
  const handleCopyConfig = async () => {
    const configJson = handleExport();
    try {
      await navigator.clipboard.writeText(configJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Download configuration as JSON file
  const handleDownload = () => {
    const configJson = handleExport();
    const blob = new Blob([configJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visitor-counter-config-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import configuration from JSON
  const handleImport = () => {
    setImportError("");
    setImportSuccess(false);

    try {
      const parsedConfig = JSON.parse(importText);

      // Validate required fields
      if (!parsedConfig.displayMode || !parsedConfig.theme) {
        setImportError("Invalid configuration: missing required fields");
        return;
      }

      // Apply imported config
      onImport(parsedConfig as CounterConfig);
      setImportSuccess(true);
      setTimeout(() => {
        setImportDialogOpen(false);
        setImportText("");
        setImportSuccess(false);
      }, 1500);
    } catch (err) {
      setImportError("Invalid JSON format. Please check your configuration.");
    }
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setImportText(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex gap-2">
      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="default">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Export Configuration</DialogTitle>
            <DialogDescription>
              Copy or download your current configuration as JSON
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={handleExport()}
              readOnly
              className="font-mono text-xs h-64 resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={handleCopyConfig} className="flex-1">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
              <Button onClick={handleDownload} variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download File
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="default">
            <Upload className="h-4 w-4 mr-2" />
            Import Config
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Import Configuration</DialogTitle>
            <DialogDescription>
              Paste your configuration JSON or upload a file
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="file-upload" className="block mb-2 text-sm font-medium">
                Upload JSON File
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
            </div>
            <div>
              <label htmlFor="config-json" className="block mb-2 text-sm font-medium">
                Or Paste JSON
              </label>
              <Textarea
                id="config-json"
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder='{"username": "your-username", "displayMode": "topCountries", ...}'
                className="font-mono text-xs h-48 resize-none"
              />
            </div>

            {importError && (
              <Alert variant="destructive">
                <X className="h-4 w-4" />
                <AlertDescription>{importError}</AlertDescription>
              </Alert>
            )}

            {importSuccess && (
              <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-600 dark:text-green-400">
                  Configuration imported successfully!
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={handleImport}
              disabled={!importText.trim() || importSuccess}
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
