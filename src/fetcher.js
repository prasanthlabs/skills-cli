/**
 * fetcher.js
 * Handles all network requests to GitHub raw content.
 */

import axios from 'axios';

const RAW_BASE = 'https://raw.githubusercontent.com';

/**
 * Normalise an input that may be:
 *   - "owner/repo"
 *   - "https://github.com/owner/repo"
 *   - "https://github.com/owner/repo.git"
 *   - "https://raw.githubusercontent.com/owner/repo/..."
 *
 * Returns "owner/repo" string.
 * Throws if the input cannot be parsed.
 */
export function resolveRepo(input) {
  if (!input || typeof input !== 'string') {
    throw new Error('Repository input must be a non-empty string.');
  }

  const trimmed = input.trim();

  // Already in owner/repo form
  if (/^[^/\s]+\/[^/\s]+$/.test(trimmed)) {
    return trimmed;
  }

  // GitHub URL
  const githubMatch = trimmed.match(
    /^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/.]+?)(?:\.git)?\/?$/
  );
  if (githubMatch) {
    return `${githubMatch[1]}/${githubMatch[2]}`;
  }

  // Raw GitHub URL — extract owner/repo from path
  const rawMatch = trimmed.match(
    /^https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\//
  );
  if (rawMatch) {
    return `${rawMatch[1]}/${rawMatch[2]}`;
  }

  throw new Error(
    `Cannot parse repository "${trimmed}". ` +
    'Expected "owner/repo" or a full GitHub URL.'
  );
}

/**
 * Build the raw content URL for a file inside a repo.
 * Defaults to the "main" branch.
 */
function rawUrl(ownerRepo, filePath, branch = 'main') {
  return `${RAW_BASE}/${ownerRepo}/${branch}/${filePath}`;
}

/**
 * Fetch the skills.json index from the root of a repo.
 * Falls back to "master" branch if "main" returns 404.
 *
 * @param {string} ownerRepo  "owner/repo"
 * @returns {Promise<Object>} Parsed skills.json contents
 */
export async function fetchSkillsList(ownerRepo) {
  const branches = ['main', 'master'];

  for (const branch of branches) {
    const url = rawUrl(ownerRepo, 'skills.json', branch);
    try {
      const { data } = await axios.get(url, { timeout: 10_000 });
      if (typeof data !== 'object' || !Array.isArray(data.skills)) {
        throw new Error(
          'skills.json must be a JSON object with a "skills" array.'
        );
      }
      return data;
    } catch (err) {
      if (err.response?.status === 404 && branch !== branches[branches.length - 1]) {
        // Try next branch
        continue;
      }
      if (err.response?.status === 404) {
        throw new Error(
          `skills.json not found in "${ownerRepo}". ` +
          'Make sure the repository has a skills.json at its root.'
        );
      }
      // Re-throw other errors (network, parse, etc.)
      throw new Error(
        err.response
          ? `GitHub returned HTTP ${err.response.status}: ${err.response.statusText}`
          : err.message
      );
    }
  }
}

/**
 * Fetch the raw content of a single skill file.
 * The path comes directly from skills.json (e.g. "shadcn/SKILL.md").
 * Falls back from "main" to "master" on 404.
 *
 * @param {string} ownerRepo  "owner/repo"
 * @param {string} filePath   Relative path inside the repo
 * @returns {Promise<string>} Raw file content
 */
export async function fetchSkillFile(ownerRepo, filePath) {
  if (!filePath) {
    throw new Error('No file path provided for skill.');
  }

  const branches = ['main', 'master'];

  for (const branch of branches) {
    const url = rawUrl(ownerRepo, filePath, branch);
    try {
      const { data } = await axios.get(url, {
        timeout: 15_000,
        responseType: 'text',
        // Prevent axios from auto-parsing markdown as JSON
        transformResponse: [(d) => d],
      });
      return data;
    } catch (err) {
      if (err.response?.status === 404 && branch !== branches[branches.length - 1]) {
        continue;
      }
      if (err.response?.status === 404) {
        throw new Error(
          `Skill file "${filePath}" not found in "${ownerRepo}".`
        );
      }
      throw new Error(
        err.response
          ? `GitHub returned HTTP ${err.response.status}: ${err.response.statusText}`
          : err.message
      );
    }
  }
}
