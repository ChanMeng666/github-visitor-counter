"use client";

import { memo, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { CounterConfig } from "@/lib/constants";

interface ConfigProgressProps {
  config: CounterConfig;
}

export const ConfigProgress = memo(function ConfigProgress({ config }: ConfigProgressProps) {
  // Memoize progress calculation
  const { progress, isUsernameComplete, isModeComplete, hasCustomization } = useMemo(() => {
    let calculatedProgress = 0;

    // Step 1: Username (40%)
    const usernameComplete = Boolean(config.username && config.username.trim() !== "");
    if (usernameComplete) {
      calculatedProgress += 40;
    }

    // Step 2: Display Mode (30%)
    const modeComplete = Boolean(config.displayMode);
    if (modeComplete) {
      calculatedProgress += 30;
    }

    // Step 3: Customization (30%)
    const customizationApplied =
      config.theme !== "default" ||
      (config.displayMode === "topCountries" && (config.columns !== 2 || config.maxflags !== 10)) ||
      (config.displayMode === "flagMap" && config.mapSize !== "small") ||
      Boolean(config.customColors?.bg || config.customColors?.text || config.customColors?.border);

    if (customizationApplied) {
      calculatedProgress += 30;
    }

    return {
      progress: calculatedProgress,
      isUsernameComplete: usernameComplete,
      isModeComplete: modeComplete,
      hasCustomization: calculatedProgress >= 70,
    };
  }, [
    config.username,
    config.displayMode,
    config.theme,
    config.columns,
    config.maxflags,
    config.mapSize,
    config.customColors?.bg,
    config.customColors?.text,
    config.customColors?.border,
  ]);

  return (
    <div className="mb-6 p-4 bg-muted/30 rounded-lg border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge variant={isUsernameComplete ? "default" : "secondary"}>
            1. Username
          </Badge>
          <Badge variant={isModeComplete ? "default" : "secondary"}>
            2. Display Mode
          </Badge>
          <Badge variant={hasCustomization ? "default" : "secondary"}>
            3. Customize
          </Badge>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {progress}% Complete
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
});
