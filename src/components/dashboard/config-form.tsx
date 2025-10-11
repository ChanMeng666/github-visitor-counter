"use client";

import { useState } from "react";
import { Settings, Palette, Tag, Eye, Map, Minimize2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import type { CounterConfig, ThemeName, DisplayMode } from "@/lib/constants";
import { THEMES } from "@/lib/constants";

interface ConfigFormProps {
  config: CounterConfig;
  onChange: (config: CounterConfig) => void;
}

export function ConfigForm({ config, onChange }: ConfigFormProps) {
  const [labelType, setLabelType] = useState<"visitors" | "none" | "custom">("visitors");

  const handleThemeChange = (theme: ThemeName) => {
    onChange({
      ...config,
      theme,
      customColors: undefined, // Reset custom colors when changing theme
    });
  };

  const handleDisplayModeChange = (displayMode: DisplayMode) => {
    onChange({
      ...config,
      displayMode,
    });
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-4">
      {/* Basic Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Basic Settings
          </CardTitle>
          <CardDescription>Configure your GitHub visitor counter</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">
              GitHub Username <span className="text-destructive">*</span>
            </Label>
            <Input
              id="username"
              placeholder="Enter your GitHub username"
              value={config.username}
              onChange={(e) => onChange({ ...config, username: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Your GitHub username (e.g., ChanMeng666)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayMode">Display Mode</Label>
            <Select value={config.displayMode} onValueChange={handleDisplayModeChange}>
              <SelectTrigger id="displayMode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="topCountries">🌍 Top Countries</SelectItem>
                <SelectItem value="flagMap">🗺️ Flag Map</SelectItem>
                <SelectItem value="flagsFrom">🇺🇸 Flags From (US/CA)</SelectItem>
                <SelectItem value="miniCounter">📊 Mini Counter</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {config.displayMode === "topCountries" && "Show top visiting countries with flags"}
              {config.displayMode === "flagMap" && "Show visitor map visualization"}
              {config.displayMode === "flagsFrom" && "Show flags from specific country"}
              {config.displayMode === "miniCounter" && "Compact counter display"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={config.theme} onValueChange={handleThemeChange}>
              <SelectTrigger id="theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="github">GitHub</SelectItem>
                <SelectItem value="github_dark">GitHub Dark</SelectItem>
                <SelectItem value="transparent">Transparent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Display Options - Show for topCountries and flagsFrom */}
      {(config.displayMode === "topCountries" || config.displayMode === "flagsFrom") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Display Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {config.displayMode === "flagsFrom" && (
              <div className="space-y-2">
                <Label htmlFor="flagsFromCountry">Country</Label>
                <Select
                  value={config.flagsFromCountry}
                  onValueChange={(value: any) => onChange({ ...config, flagsFromCountry: value })}
                >
                  <SelectTrigger id="flagsFromCountry">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">🇺🇸 United States</SelectItem>
                    <SelectItem value="ca">🇨🇦 Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="columns">Columns</Label>
                <span className="text-sm font-medium text-primary">{config.columns}</span>
              </div>
              <Slider
                id="columns"
                min={1}
                max={8}
                step={1}
                value={[config.columns || 2]}
                onValueChange={([value]) => onChange({ ...config, columns: value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="maxflags">Max Flags</Label>
                <span className="text-sm font-medium text-primary">{config.maxflags}</span>
              </div>
              <Slider
                id="maxflags"
                min={1}
                max={250}
                step={1}
                value={[config.maxflags || 10]}
                onValueChange={([value]) => onChange({ ...config, maxflags: value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Flag Size</Label>
              <Select
                value={config.size}
                onValueChange={(value: any) => onChange({ ...config, size: value })}
              >
                <SelectTrigger id="size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showlabels">Show Country Labels</Label>
              <Switch
                id="showlabels"
                checked={config.showlabels}
                onCheckedChange={(checked) => onChange({ ...config, showlabels: checked })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitortype">Display Type</Label>
              <Select
                value={config.visitortype}
                onValueChange={(value: any) => onChange({ ...config, visitortype: value })}
              >
                <SelectTrigger id="visitortype">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="percentage">Percentage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Map Options - Show only for flagMap */}
      {config.displayMode === "flagMap" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Map Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mapSize">Map Size</Label>
              <Select
                value={config.mapSize}
                onValueChange={(value: any) => onChange({ ...config, mapSize: value })}
              >
                <SelectTrigger id="mapSize">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tiny">Tiny</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mini Counter Options - Show only for miniCounter */}
      {config.displayMode === "miniCounter" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Minimize2 className="h-5 w-5" />
              Mini Counter Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="miniDisplay">Display</Label>
              <Select
                value={config.miniDisplay}
                onValueChange={(value: any) => onChange({ ...config, miniDisplay: value })}
              >
                <SelectTrigger id="miniDisplay">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flags">Number of Flags</SelectItem>
                  <SelectItem value="pageviews">Pageview Count</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Label & Count - Show for all except miniCounter */}
      {config.displayMode !== "miniCounter" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Label & Count
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="labelType">Label Type</Label>
              <Select
                value={labelType}
                onValueChange={(value: any) => {
                  setLabelType(value);
                  if (value === "none") {
                    onChange({ ...config, label: "none" });
                  } else if (value === "visitors") {
                    onChange({ ...config, label: "Visitors" });
                  }
                }}
              >
                <SelectTrigger id="labelType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visitors">Visitors</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              {labelType === "custom" && (
                <Input
                  placeholder="Custom label"
                  value={config.label}
                  onChange={(e) =>
                    onChange({ ...config, label: e.target.value.replace(/[^A-Za-z0-9 ]/g, "") })
                  }
                  className="mt-2"
                />
              )}
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showcount">Show Pageview Count</Label>
              <Switch
                id="showcount"
                checked={config.showcount}
                onCheckedChange={(checked) => onChange({ ...config, showcount: checked })}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Custom Colors - Show for all modes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Custom Colors
          </CardTitle>
          <CardDescription>Optional: Override theme colors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Show background color only for non-map modes */}
            {config.displayMode !== "flagMap" && (
              <div className="space-y-2">
                <Label htmlFor="bg">Background</Label>
                <div className="flex gap-2">
                  <Input
                    id="bg"
                    placeholder={THEMES[config.theme].bg}
                    value={config.customColors?.bg || ""}
                    onChange={(e) =>
                      onChange({
                        ...config,
                        customColors: {
                          ...config.customColors,
                          bg: e.target.value.replace(/[^0-9A-Fa-f]/g, "").toUpperCase(),
                        },
                      })
                    }
                    maxLength={6}
                    className="font-mono text-xs"
                  />
                  <input
                    type="color"
                    value={`#${config.customColors?.bg || THEMES[config.theme].bg}`}
                    onChange={(e) =>
                      onChange({
                        ...config,
                        customColors: {
                          ...config.customColors,
                          bg: e.target.value.substring(1).toUpperCase(),
                        },
                      })
                    }
                    className="h-10 w-12 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="text">Text</Label>
              <div className="flex gap-2">
                <Input
                  id="text"
                  placeholder={THEMES[config.theme].text}
                  value={config.customColors?.text || ""}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      customColors: {
                        ...config.customColors,
                        text: e.target.value.replace(/[^0-9A-Fa-f]/g, "").toUpperCase(),
                      },
                    })
                  }
                  maxLength={6}
                  className="font-mono text-xs"
                />
                <input
                  type="color"
                  value={`#${config.customColors?.text || THEMES[config.theme].text}`}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      customColors: {
                        ...config.customColors,
                        text: e.target.value.substring(1).toUpperCase(),
                      },
                    })
                  }
                  className="h-10 w-12 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="border">Border</Label>
              <div className="flex gap-2">
                <Input
                  id="border"
                  placeholder={THEMES[config.theme].border}
                  value={config.customColors?.border || ""}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      customColors: {
                        ...config.customColors,
                        border: e.target.value.replace(/[^0-9A-Fa-f]/g, "").toUpperCase(),
                      },
                    })
                  }
                  maxLength={6}
                  className="font-mono text-xs"
                />
                <input
                  type="color"
                  value={`#${config.customColors?.border || THEMES[config.theme].border}`}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      customColors: {
                        ...config.customColors,
                        border: e.target.value.substring(1).toUpperCase(),
                      },
                    })
                  }
                  className="h-10 w-12 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
