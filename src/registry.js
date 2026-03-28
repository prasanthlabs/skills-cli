/**
 * registry.js
 * Maps short skill names to "owner/repo" on GitHub.
 * Used when the user runs: skills add shadcn  (no repo specified)
 */

const REGISTRY = {
  shadcn: 'prasanthlabs/uiskills',
  motion: 'prasanthlabs/uiskills',
  'tanstack-table': 'prasanthlabs/uiskills',
  'react-hook-form': 'prasanthlabs/uiskills',
};

export function lookupRegistry(name) {
  if (!name || typeof name !== 'string') return null;
  return REGISTRY[name.toLowerCase().trim()] ?? null;
}
