# Claude Skills CLI

Install Claude Code skills from any GitHub repository — one command, no npm account needed.

```bash
npx github:prasanthlabs/skills-cli add prasanthlabs/uiskills --skill shadcn
```

---

## What is a Skill?

A **skill** is a plain markdown file (`.md`) that lives in your Claude Code commands folder:

```
~/.claude/commands/shadcn.md
```

Once installed, you type `/shadcn` inside any Claude Code session and Claude instantly knows everything in that file — components, patterns, APIs, best practices.

**This is a native Claude Code feature.** The `~/.claude/commands/` directory is the official standard for custom slash commands in Claude Code. No plugins, no extensions — it just works.

---

## How It Works

```
npx github:prasanthlabs/skills-cli add <repo> --skill <name>
        ↓
  Fetches SKILL.md from GitHub
        ↓
  Saves to ~/.claude/commands/<name>.md
        ↓
  Type /shadcn in Claude Code → works immediately ✅
```

---

## Install a Skill

```bash
# Install shadcn/ui skill
npx github:prasanthlabs/skills-cli add prasanthlabs/uiskills --skill shadcn

# Multiple skills at once
npx github:prasanthlabs/skills-cli add prasanthlabs/uiskills --skill shadcn motion

# Short name (no repo needed)
npx github:prasanthlabs/skills-cli add shadcn
```

---

## Use the Skill in Claude Code

After installing, open any project in Claude Code and type:

```
/shadcn build me a login form with email, password, and a submit button
```

Claude will use the full shadcn/ui knowledge from the skill — correct imports, component names, theming tokens, patterns — without you having to explain anything.

---

## Available Skills (prasanthlabs/uiskills)

| Skill | Install | What it teaches Claude |
|---|---|---|
| `shadcn` | `--skill shadcn` | All 52 shadcn/ui components, theming, patterns |
| `motion` | `--skill motion` | Framer Motion animations |
| `tanstack-table` | `--skill tanstack-table` | TanStack Table data grids |
| `react-hook-form` | `--skill react-hook-form` | Form validation with RHF + Zod |

List all skills in a registry:
```bash
npx github:prasanthlabs/skills-cli list prasanthlabs/uiskills
```

---

## Is This an Official Standard?

Yes. Claude Code natively supports custom slash commands via markdown files in `~/.claude/commands/`.

| What | Where |
|---|---|
| Global skills (all projects) | `~/.claude/commands/<name>.md` |
| Project skills (current project only) | `.claude/commands/<name>.md` |

This CLI automates the download — it fetches the markdown from GitHub and drops it in the right place. That's it.

---

## Create Your Own Skill Registry

Anyone can host skills. Create a GitHub repo with this structure:

```
your-repo/
├── skills.json          ← index of available skills
└── shadcn/
    └── SKILL.md         ← the skill content
```

**skills.json format:**
```json
{
  "name": "my-skills",
  "description": "My Claude skills",
  "skills": [
    {
      "name": "shadcn",
      "description": "shadcn/ui expert",
      "path": "shadcn/SKILL.md"
    }
  ]
}
```

**SKILL.md** — write it like you're briefing an expert. Claude will follow it exactly:

```markdown
# shadcn/ui Expert

You are an expert in shadcn/ui. When building components:
- Always import from @/components/ui/<name>
- Use npx shadcn@latest add <component> to install
...
```

Then anyone can install your skill:
```bash
npx github:prasanthlabs/skills-cli add your-username/your-repo --skill shadcn
```

---

## Repos

- **CLI:** https://github.com/prasanthlabs/skills-cli
- **Skills registry:** https://github.com/prasanthlabs/uiskills
