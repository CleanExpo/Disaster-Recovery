# Skills Guide (Codex)

Skills extend Codex with task-specific workflows. A skill lives in a folder that contains a required `SKILL.md` file and optional `scripts/`, `references/`, and `assets/`.

## Where to put skills

For this repository, use repo-scoped skills so the whole team shares the same workflows:

- `./.codex/skills/<skill-name>/SKILL.md`

Codex also loads user-scoped skills from `$CODEX_HOME/skills`.

## Create a skill

Preferred: use the built-in skill creator:

- Run: `$skill-creator`
- Describe what the skill should do and when it should trigger.

## Install curated skills

Use the built-in installer:

- Run: `$skill-installer`
- Or install a named curated skill: `$skill-installer <skill-name>`

Restart Codex after installing skills so it reloads the catalog.

## Skill design tips

- Keep `SKILL.md` short and procedural (progressive disclosure).
- Put large reference material in `references/` and load it only when needed.
- Use `scripts/` only for deterministic, repeatable tasks.

