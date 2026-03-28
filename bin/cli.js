#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

import { fetchSkillsList, fetchSkillFile, resolveRepo } from '../src/fetcher.js';
import { packageSkill } from '../src/packager.js';
import { installSkill } from '../src/installer.js';
import { lookupRegistry, KNOWN_REPOS } from '../src/registry.js';

program
  .name('skills')
  .description(chalk.cyan('Claude Skills CLI — fetch and install Claude skills from GitHub'))
  .version(pkg.version);

// ─── add command ───────────────────────────────────────────────────────────────
program
  .command('add <repo>')
  .description('Fetch and install one or more skills from a GitHub repository')
  .option('-s, --skill <names...>', 'Skill name(s) to install')
  .action(async (repo, options) => {
    const ora = (await import('ora')).default;

    // If no slash in repo, treat it as a short registry name
    let resolvedRepo = repo;
    if (!repo.includes('/') && !repo.startsWith('https://')) {
      const spinner = ora(chalk.blue(`Looking up "${repo}" in local registry…`)).start();
      const registryEntry = lookupRegistry(repo);
      if (!registryEntry) {
        spinner.fail(chalk.red(`"${repo}" not found in local registry. Provide owner/repo or a known short name.`));
        process.exit(1);
      }
      resolvedRepo = registryEntry;
      spinner.succeed(chalk.green(`Registry resolved "${repo}" → ${resolvedRepo}`));
    }

    // Resolve owner/repo from URL if needed
    let ownerRepo;
    try {
      ownerRepo = resolveRepo(resolvedRepo);
    } catch (err) {
      console.error(chalk.red(`Error: ${err.message}`));
      process.exit(1);
    }

    // Fetch the skills index to validate skill names
    const indexSpinner = ora(chalk.blue(`Fetching skills index from ${chalk.bold(ownerRepo)}…`)).start();
    let skillsList;
    try {
      skillsList = await fetchSkillsList(ownerRepo);
      indexSpinner.succeed(chalk.green(`Found ${chalk.bold(skillsList.skills.length)} skill(s) in ${chalk.bold(skillsList.name || ownerRepo)}`));
    } catch (err) {
      // No skills.json — check if this is a known repo with a curated redirect
      const knownEntry = KNOWN_REPOS[ownerRepo];
      if (knownEntry && options.skill) {
        const redirectedSkills = [];
        for (const skillName of options.skill) {
          if (knownEntry[skillName]) {
            redirectedSkills.push({ name: skillName, redirectRepo: knownEntry[skillName] });
          }
        }
        if (redirectedSkills.length > 0) {
          indexSpinner.warn(chalk.yellow(
            `"${ownerRepo}" has no skills.json — using curated skill from our registry`
          ));
          // Re-run with the curated repo
          for (const { name, redirectRepo } of redirectedSkills) {
            const curated = await fetchSkillsList(redirectRepo).catch(() => null);
            if (!curated) {
              console.error(chalk.red(`Could not load curated skill "${name}"`));
              continue;
            }
            const meta = curated.skills.find(s => s.name === name);
            if (!meta) {
              console.error(chalk.red(`Skill "${name}" not found in curated registry`));
              continue;
            }
            const fetchSpinner = ora(chalk.blue(`Fetching curated skill "${chalk.bold(name)}"…`)).start();
            const content = await fetchSkillFile(redirectRepo, meta.path).catch(e => {
              fetchSpinner.fail(chalk.red(e.message));
              return null;
            });
            if (!content) continue;
            fetchSpinner.succeed(chalk.green(`Fetched "${chalk.bold(name)}" (${content.length} bytes)`));
            const saveSpinner = ora(chalk.blue(`Saving…`)).start();
            const skillPath = await packageSkill(name, content).catch(e => {
              saveSpinner.fail(chalk.red(e.message));
              return null;
            });
            if (!skillPath) continue;
            saveSpinner.succeed(chalk.green(`Saved to ${chalk.bold(skillPath)}`));
            await installSkill(name, skillPath);
          }
          process.exit(0);
        }
      }
      indexSpinner.fail(chalk.red(`Failed to fetch skills index: ${err.message}`));
      process.exit(1);
    }

    const skillNames = options.skill;
    if (!skillNames || skillNames.length === 0) {
      console.log(chalk.yellow('\nNo --skill specified. Available skills:'));
      for (const s of skillsList.skills) {
        console.log(`  ${chalk.cyan(s.name.padEnd(16))} ${chalk.gray(s.description || '')}`);
      }
      console.log(chalk.gray(`\nUsage: skills add ${ownerRepo} --skill <name>`));
      process.exit(0);
    }

    // Validate each skill name
    const available = new Map(skillsList.skills.map(s => [s.name, s]));
    for (const name of skillNames) {
      if (!available.has(name)) {
        console.error(chalk.red(`Skill "${name}" not found in ${ownerRepo}.`));
        console.log(chalk.yellow('Available skills: ') + skillsList.skills.map(s => chalk.cyan(s.name)).join(', '));
        process.exit(1);
      }
    }

    // Fetch, package and install each skill
    for (const skillName of skillNames) {
      const skillMeta = available.get(skillName);
      const fetchSpinner = ora(chalk.blue(`Fetching skill "${chalk.bold(skillName)}"…`)).start();

      let content;
      try {
        content = await fetchSkillFile(ownerRepo, skillMeta.path);
        fetchSpinner.succeed(chalk.green(`Fetched "${chalk.bold(skillName)}" (${content.length} bytes)`));
      } catch (err) {
        fetchSpinner.fail(chalk.red(`Failed to fetch skill "${skillName}": ${err.message}`));
        continue;
      }

      const saveSpinner = ora(chalk.blue(`Saving skill "${chalk.bold(skillName)}" locally…`)).start();
      let skillPath;
      try {
        skillPath = await packageSkill(skillName, content);
        saveSpinner.succeed(chalk.green(`Saved to ${chalk.bold(skillPath)}`));
      } catch (err) {
        saveSpinner.fail(chalk.red(`Failed to save skill "${skillName}": ${err.message}`));
        continue;
      }

      await installSkill(skillName, skillPath);
    }
  });

// ─── list command ──────────────────────────────────────────────────────────────
program
  .command('list <repo>')
  .description('List all available skills in a GitHub repository')
  .action(async (repo) => {
    const ora = (await import('ora')).default;

    let ownerRepo;
    try {
      ownerRepo = resolveRepo(repo);
    } catch (err) {
      console.error(chalk.red(`Error: ${err.message}`));
      process.exit(1);
    }

    const spinner = ora(chalk.blue(`Fetching skills index from ${chalk.bold(ownerRepo)}…`)).start();
    let skillsList;
    try {
      skillsList = await fetchSkillsList(ownerRepo);
      spinner.succeed(chalk.green(`Skills index loaded`));
    } catch (err) {
      spinner.fail(chalk.red(`Failed to fetch skills index: ${err.message}`));
      process.exit(1);
    }

    console.log('');
    console.log(chalk.bold.cyan(`  ${skillsList.name || ownerRepo}`));
    if (skillsList.description) {
      console.log(chalk.gray(`  ${skillsList.description}`));
    }
    console.log('');
    console.log(chalk.bold('  Skills:'));
    for (const s of skillsList.skills) {
      console.log(`    ${chalk.cyan('•')} ${chalk.bold(s.name.padEnd(16))} ${chalk.gray(s.description || '')}`);
      if (s.path) {
        console.log(`      ${chalk.gray('path: ' + s.path)}`);
      }
    }
    console.log('');
    console.log(chalk.gray(`  Install a skill: skills add ${ownerRepo} --skill <name>`));
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
