"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { CounterConfig } from "@/lib/constants";

interface ConfigProgressProps {
  config: CounterConfig;
}

export function ConfigProgress({ config }: ConfigProgressProps) {
  // Calculate progress based on configuration completeness
  const calculateProgress = () => {
    let progress = 0;

    // Step 1: Username (40%)
    if (config.username && config.username.trim() !== "") {
      progress += 40;
    }

    // Step 2: Display Mode (30%)
    if (config.displayMode) {
      progress += 30;
    }

    // Step 3: Customization (30%)
    // Has changed from defaults
    const hasCustomization =
      config.theme !== "default" ||
      (config.displayMode === "topCountries" && (config.columns !== 2 || config.maxflags !== 10)) ||
      (config.displayMode === "flagMap" && config.mapSize !== "small") ||
      Boolean(config.customColors?.bg || config.customColors?.text || config.customColors?.border);

    if (hasCustomization) {
      progress += 30;
    }

    return progress;
  };

  const progress = calculateProgress();

  const isUsernameComplete = config.username && config.username.trim() !== "";
  const isModeComplete = config.displayMode;
  const hasCustomization = progress >= 70;

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
}
