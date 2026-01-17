/**
 * Centralized Keyboard Shortcuts Configuration
 * Single source of truth for all keyboard shortcuts
 */

export interface ShortcutDefinition {
  id: string;
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  description: string;
  displayKeys: string[]; // For UI display (e.g., ["Ctrl", "R"])
}

/**
 * All keyboard shortcuts defined in one place
 */
export const KEYBOARD_SHORTCUTS: ShortcutDefinition[] = [
  {
    id: 'reset',
    key: 'r',
    ctrlKey: true,
    description: 'Reset configuration to defaults',
    displayKeys: ['Ctrl', 'R'],
  },
  {
    id: 'clearColors',
    key: 'c',
    ctrlKey: true,
    shiftKey: true,
    description: 'Clear custom colors',
    displayKeys: ['Ctrl', 'Shift', 'C'],
  },
  {
    id: 'export',
    key: 'e',
    ctrlKey: true,
    description: 'Export configuration',
    displayKeys: ['Ctrl', 'E'],
  },
  {
    id: 'import',
    key: 'i',
    ctrlKey: true,
    description: 'Import configuration',
    displayKeys: ['Ctrl', 'I'],
  },
  {
    id: 'copyMarkdown',
    key: 'k',
    ctrlKey: true,
    description: 'Copy markdown code',
    displayKeys: ['Ctrl', 'K'],
  },
  {
    id: 'showHelp',
    key: '?',
    description: 'Show keyboard shortcuts',
    displayKeys: ['?'],
  },
];

/**
 * Get shortcut by ID
 */
export function getShortcut(id: string): ShortcutDefinition | undefined {
  return KEYBOARD_SHORTCUTS.find((s) => s.id === id);
}

/**
 * Create handlers array for useKeyboardShortcuts hook
 */
export function createShortcutHandlers(
  handlers: Record<string, () => void>
): Array<{
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  description: string;
  action: () => void;
}> {
  return KEYBOARD_SHORTCUTS.filter((shortcut) => handlers[shortcut.id]).map((shortcut) => ({
    key: shortcut.key,
    ctrlKey: shortcut.ctrlKey,
    shiftKey: shortcut.shiftKey,
    altKey: shortcut.altKey,
    metaKey: shortcut.metaKey,
    description: shortcut.description,
    action: handlers[shortcut.id],
  }));
}
