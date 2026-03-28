/**
 * installer.js
 * Post-install UX: copies the skill file path to the clipboard,
 * opens claude.ai in the browser, and prints usage instructions.
 */

import chalk from 'chalk';

const CLAUDE_URL = 'https://claude.ai';

/**
 * Attempts to copy text to the system clipboard using clipboardy.
 * Returns true on success, false on failure (graceful degradation).
 *
 * @param {string} text
 * @returns {Promise<boolean>}
 */
async function copyToClipboard(text) {
  try {
    // clipboardy@2 is CommonJS — dynamic import works fine with ESM
    const clipboardy = (await import('clipboardy')).default;
    await clipboardy.write(text);
    return true;
  } catch {
    // Clipboard may not be available in headless / CI environments
    return false;
  }
}

/**
 * Attempts to open a URL in the system's default browser using `open`.
 * Returns true on success, false on failure (graceful degradation).
 *
 * @param {string} url
 * @returns {Promise<boolean>}
 */
async function openBrowser(url) {
  try {
    const openModule = (await import('open')).default;
    await openModule(url);
    return true;
  } catch {
    // `open` may fail in headless / SSH / WSL environments
    return false;
  }
}

/**
 * Main post-install routine.
 *
 * 1. Copies the skill file path to the clipboard.
 * 2. Opens claude.ai in the browser.
 * 3. Prints clear instructions for the user.
 *
 * @param {string} skillName  Human-readable skill name
 * @param {string} skillPath  Absolute path to the saved SKILL.md
 */
export async function installSkill(skillName, skillPath) {
  console.log('');
  console.log(chalk.bold.green(`  ✓ Skill "${skillName}" installed successfully!`));
  console.log('');

  // ── Clipboard ──────────────────────────────────────────────────────────────
  const clipped = await copyToClipboard(skillPath);
  if (clipped) {
    console.log(
      chalk.green('  ✓ Path copied to clipboard:'),
      chalk.bold.white(skillPath)
    );
  } else {
    console.log(
      chalk.yellow('  ! Could not copy to clipboard (headless environment).'),
    );
    console.log(
      chalk.yellow('    Skill path:'),
      chalk.bold.white(skillPath)
    );
  }

  // ── Browser ────────────────────────────────────────────────────────────────
  const opened = await openBrowser(CLAUDE_URL);
  if (opened) {
    console.log(chalk.green(`  ✓ Opened ${chalk.bold(CLAUDE_URL)} in your browser.`));
  } else {
    console.log(
      chalk.yellow(`  ! Could not open browser automatically.`),
    );
    console.log(
      chalk.yellow(`    Please open ${chalk.bold.cyan(CLAUDE_URL)} manually.`)
    );
  }

  // ── Instructions ───────────────────────────────────────────────────────────
  console.log('');
  console.log(chalk.bold.cyan('  Next steps:'));
  console.log(chalk.white('  1.') + chalk.gray(' Open a Claude conversation at ') + chalk.cyan(CLAUDE_URL));
  console.log(chalk.white('  2.') + chalk.gray(' Click the "+" or attachment button in the chat input'));
  console.log(chalk.white('  3.') + chalk.gray(' Drag and drop the skill file, or paste the path:'));
  console.log('     ' + chalk.bold.white(skillPath));
  console.log(chalk.white('  4.') + chalk.gray(' Claude will now have the skill context loaded!'));
  console.log('');
  console.log(
    chalk.gray('  Tip: The path is') +
    (clipped ? chalk.gray(' already in your clipboard.') : chalk.gray(` ${skillPath}`))
  );
  console.log('');
}
