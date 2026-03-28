/**
 * packager.js
 * Saves a fetched skill's SKILL.md content to the local ~/.claude-skills/ store.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

/**
 * Returns the Claude Code global commands directory.
 * Skills saved here are available as /skill-name in any Claude Code session.
 * Path: ~/.claude/commands/
 */
export function getSkillsDir() {
  return path.join(os.homedir(), '.claude', 'commands');
}

/**
 * Saves the skill content to ~/.claude/commands/<skill-name>.md
 * so it is immediately available as a Claude Code slash command.
 *
 * @param {string} skillName  The canonical skill name (e.g. "shadcn")
 * @param {string} content    Raw skill markdown content
 * @returns {Promise<string>} Absolute path to the saved .md file
 */
export async function packageSkill(skillName, content) {
  if (!skillName || typeof skillName !== 'string') {
    throw new Error('Skill name must be a non-empty string.');
  }
  if (content === undefined || content === null) {
    throw new Error('Skill content cannot be empty.');
  }

  // Sanitise skill name for use as a file name
  const safeName = skillName.replace(/[^a-zA-Z0-9_-]/g, '_');

  const skillsDir = getSkillsDir();
  const skillFile = path.join(skillsDir, `${safeName}.md`);

  // Create directory recursively (no-op if it already exists)
  fs.mkdirSync(skillsDir, { recursive: true });

  // Write content — overwrite if already present
  fs.writeFileSync(skillFile, content, 'utf8');

  return skillFile;
}

/**
 * Lists all locally installed skills.
 * Returns an array of { name, path } objects.
 *
 * @returns {{ name: string, path: string }[]}
 */
export function listLocalSkills() {
  const skillsDir = getSkillsDir();

  if (!fs.existsSync(skillsDir)) {
    return [];
  }

  const entries = fs.readdirSync(skillsDir, { withFileTypes: true });

  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => ({
      name: e.name.replace(/\.md$/, ''),
      path: path.join(skillsDir, e.name),
    }));
}
