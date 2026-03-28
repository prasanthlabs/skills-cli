/**
 * registry.js
 * A local mapping of short skill names to GitHub "owner/repo" strings.
 *
 * Users can install skills by short name (e.g. `skills add shadcn`) and the
 * CLI resolves the full repository automatically.
 *
 * To extend: add entries to REGISTRY below or, in the future, load from a
 * remote skills-registry.json.
 */

/**
 * Short-name registry: maps a short skill name to "owner/repo".
 * Used when the user runs: skills add shadcn  (no repo specified)
 */
const REGISTRY = {
  shadcn: 'prasanthlabs/uiskills',
  uiskills: 'prasanthlabs/uiskills',
};

/**
 * Known-repo registry: maps real GitHub repos (that have no skills.json)
 * to our curated skills registry repo, per skill name.
 *
 * When a user points at e.g. https://github.com/shadcn/ui and that repo
 * has no skills.json, we serve our curated version instead.
 *
 * Format: { 'owner/repo': { skillName: 'curated-owner/curated-repo' } }
 */
export const KNOWN_REPOS = {
  'shadcn/ui':    { shadcn: 'prasanthlabs/uiskills' },
  'shadcn-ui/ui': { shadcn: 'prasanthlabs/uiskills' },
};

/**
 * Look up a short name in the local registry.
 *
 * @param {string} name  Short registry name (case-insensitive)
 * @returns {string|null} "owner/repo" string, or null if not found
 */
export function lookupRegistry(name) {
  if (!name || typeof name !== 'string') return null;
  return REGISTRY[name.toLowerCase().trim()] ?? null;
}

/**
 * Returns a copy of all registry entries for inspection / listing.
 *
 * @returns {Record<string, string>}
 */
export function getAllRegistryEntries() {
  return { ...REGISTRY };
}
