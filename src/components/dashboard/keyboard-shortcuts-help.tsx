"use client";

import { useState } from "react";
import { Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ShortcutItem {
  keys: string[];
  description: string;
}

const shortcuts: ShortcutItem[] = [
  {
    keys: ["Ctrl", "R"],
    description: "Reset configuration to defaults",
  },
  {
    keys: ["Ctrl", "Shift", "C"],
    description: "Clear custom colors",
  },
  {
    keys: ["Ctrl", "E"],
    description: "Export configuration",
  },
  {
    keys: ["Ctrl", "I"],
    description: "Import configuration",
  },
  {
    keys: ["Ctrl", "K"],
    description: "Copy markdown code",
  },
  {
    keys: ["?"],
    description: "Show keyboard shortcuts",
  },
];

export function KeyboardShortcutsHelp() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Keyboard Shortcuts">
          <Keyboard className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Use these keyboard shortcuts to work more efficiently
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd
                    key={keyIndex}
                    className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Press <kbd className="px-2 py-0.5 text-xs font-semibold bg-muted rounded">?</kbd> anytime to toggle this dialog
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
