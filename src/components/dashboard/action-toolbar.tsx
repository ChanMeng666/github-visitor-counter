"use client";

import { RotateCcw, Eraser, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { CounterConfig } from "@/lib/constants";
import { QUICK_PRESETS, DEFAULTS, type PresetName } from "@/lib/constants";

interface ActionToolbarProps {
  config: CounterConfig;
  onReset: () => void;
  onClearColors: () => void;
  onApplyPreset: (presetKey: PresetName) => void;
}

export function ActionToolbar({
  config,
  onReset,
  onClearColors,
  onApplyPreset,
}: ActionToolbarProps) {
  const handlePresetClick = (presetName: PresetName) => {
    onApplyPreset(presetName);
  };

  const hasCustomColors = Boolean(
    config.customColors?.bg ||
    config.customColors?.text ||
    config.customColors?.border
  );

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* Reset to Defaults */}
      <Button onClick={onReset} variant="outline" size="default">
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset to Defaults
      </Button>

      {/* Clear Custom Colors */}
      <Button
        onClick={onClearColors}
        variant="outline"
        size="default"
        disabled={!hasCustomColors}
      >
        <Eraser className="h-4 w-4 mr-2" />
        Clear Custom Colors
      </Button>

      {/* Quick Presets Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="default">
            <Sparkles className="h-4 w-4 mr-2" />
            Quick Presets
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem onClick={() => handlePresetClick("dark-minimal")}>
            <div className="flex items-center gap-3">
              <span className="text-lg">🌙</span>
              <div>
                <div className="font-medium">Dark Minimal</div>
                <div className="text-xs text-muted-foreground">
                  Clean dark theme, small flags
                </div>
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handlePresetClick("light-detailed")}>
            <div className="flex items-center gap-3">
              <span className="text-lg">☀️</span>
              <div>
                <div className="font-medium">Light Detailed</div>
                <div className="text-xs text-muted-foreground">
                  Full details, 20 flags, 4 columns
                </div>
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handlePresetClick("github-style")}>
            <div className="flex items-center gap-3">
              <span className="text-lg">🐙</span>
              <div>
                <div className="font-medium">GitHub Style</div>
                <div className="text-xs text-muted-foreground">
                  GitHub dark theme, percentage view
                </div>
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => handlePresetClick("world-map")}>
            <div className="flex items-center gap-3">
              <span className="text-lg">🗺️</span>
              <div>
                <div className="font-medium">World Map</div>
                <div className="text-xs text-muted-foreground">
                  Map visualization mode
                </div>
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handlePresetClick("mini-clean")}>
            <div className="flex items-center gap-3">
              <span className="text-lg">📊</span>
              <div>
                <div className="font-medium">Mini Clean</div>
                <div className="text-xs text-muted-foreground">
                  Compact transparent counter
                </div>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
