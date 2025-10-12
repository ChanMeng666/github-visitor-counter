"use client";

import { useState } from "react";
import { Settings, Palette, Tag, Eye, Map, Minimize2, CheckCircle, XCircle } from "lucide-react";
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
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [usageScenario, setUsageScenario] = useState<'profile' | 'repository' | 'customId' | 'customProject'>('profile');

  const validateUsername = (username: string) => {
    if (!username || username.trim() === '') {
      setUsernameStatus('idle');
      return;
    }

    // GitHub username rules: alphanumeric and hyphens, cannot start with hyphen
    const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

    if (githubUsernameRegex.test(username)) {
      setUsernameStatus('valid');
    } else {
      setUsernameStatus('invalid');
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange({ ...config, username: value });
    validateUsername(value);
  };

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
            <Label htmlFor="usageScenario">Usage Scenario</Label>
            <Select
              value={usageScenario}
              onValueChange={(value: any) => {
                setUsageScenario(value);
                // Clear identifier fields when changing scenario
                onChange({
                  ...config,
                  username: undefined,
                  counterId: undefined,
                  repo: undefined,
                  project: undefined
                });
                setUsernameStatus('idle');
              }}
            >
              <SelectTrigger id="usageScenario">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profile">👤 Profile README (Global Counter)</SelectItem>
                <SelectItem value="repository">📁 Repository README (Per-Repo Counter)</SelectItem>
                <SelectItem value="customId">🔑 Official Counter ID</SelectItem>
                <SelectItem value="customProject">🎯 Custom Project</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {usageScenario === "profile" && "Track all visitors to your profile README (username only)"}
              {usageScenario === "repository" && "Track visitors to a specific repository README (username + repo)"}
              {usageScenario === "customId" && "Use your official Flag Counter ID with management dashboard"}
              {usageScenario === "customProject" && "Track visitors to a custom project or website"}
            </p>
          </div>

          {/* Username field - show for profile, repository, and customProject */}
          {(usageScenario === 'profile' || usageScenario === 'repository' || usageScenario === 'customProject') && (
            <div className="space-y-2">
              <Label htmlFor="username">
                GitHub Username <span className="text-destructive">*</span>
              </Label>
            <div className="relative">
              <Input
                id="username"
                placeholder="Enter your GitHub username"
                value={config.username}
                onChange={handleUsernameChange}
                className={usernameStatus === 'invalid' ? 'border-destructive' : ''}
              />
              {usernameStatus === 'valid' && (
                <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
              )}
              {usernameStatus === 'invalid' && (
                <XCircle className="absolute right-3 top-3 h-5 w-5 text-destructive" />
              )}
            </div>
            <p className={`text-xs ${usernameStatus === 'invalid' ? 'text-destructive' : 'text-muted-foreground'}`}>
              {usernameStatus === 'invalid'
                ? 'Invalid username format. Use alphanumeric and hyphens only.'
                : 'Your GitHub username (e.g., ChanMeng666)'}
            </p>
            </div>
          )}

          {/* Repository field - show only for repository scenario */}
          {usageScenario === 'repository' && (
            <div className="space-y-2">
              <Label htmlFor="repo">
                Repository Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="repo"
                placeholder="e.g., gradient-svg-generator"
                value={config.repo || ''}
                onChange={(e) => onChange({ ...config, repo: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Repository name or full path (e.g., "gradient-svg-generator" or "ChanMeng666/gradient-svg-generator")
              </p>
            </div>
          )}

          {/* Counter ID field - show only for customId scenario */}
          {usageScenario === 'customId' && (
            <div className="space-y-2">
              <Label htmlFor="counterId">
                Flag Counter ID <span className="text-destructive">*</span>
              </Label>
              <Input
                id="counterId"
                placeholder="e.g., in9G"
                value={config.counterId || ''}
                onChange={(e) => onChange({ ...config, counterId: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Your official Counter ID from{" "}
                <a
                  href="https://flagcounter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  flagcounter.com
                </a>
                {" "}(with management dashboard access)
              </p>
            </div>
          )}

          {/* Project field - show only for customProject scenario */}
          {usageScenario === 'customProject' && (
            <div className="space-y-2">
              <Label htmlFor="project">
                Project Identifier <span className="text-destructive">*</span>
              </Label>
              <Input
                id="project"
                placeholder="e.g., my-portfolio"
                value={config.project || ''}
                onChange={(e) => onChange({ ...config, project: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Unique identifier for your project (e.g., "my-blog", "portfolio-site")
              </p>
            </div>
          )}

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
