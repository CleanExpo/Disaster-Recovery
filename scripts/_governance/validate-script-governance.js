#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const packageJsonPath = path.join(root, "package.json");
const vercelJsonPath = path.join(root, "vercel.json");
const manifestPath = path.join(root, "scripts", "_governance", "manifest.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function extractScriptRefs(command) {
  const refs = [];
  if (!command || typeof command !== "string") return refs;
  const matches = command.match(/scripts\/[A-Za-z0-9._/-]+/g) || [];
  for (const m of matches) refs.push(m);
  return refs;
}

function unique(items) {
  return [...new Set(items)];
}

function fail(errors) {
  console.error("\nScript governance validation failed:");
  for (const err of errors) console.error(`- ${err}`);
  process.exit(1);
}

function main() {
  const errors = [];

  if (!fs.existsSync(packageJsonPath)) {
    fail(["package.json not found"]);
  }
  if (!fs.existsSync(manifestPath)) {
    fail(["scripts/_governance/manifest.json not found"]);
  }

  const pkg = readJson(packageJsonPath);
  const manifest = readJson(manifestPath);
  const manifestScripts = manifest.scripts || [];
  const manifestMap = new Map(manifestScripts.map((s) => [s.path, s]));

  const packageScriptRefs = [];
  for (const cmd of Object.values(pkg.scripts || {})) {
    packageScriptRefs.push(...extractScriptRefs(cmd));
  }

  const externalRefs = [];
  if (fs.existsSync(vercelJsonPath)) {
    const vercel = readJson(vercelJsonPath);
    externalRefs.push(...extractScriptRefs(vercel.buildCommand || ""));
    externalRefs.push(...extractScriptRefs(vercel.installCommand || ""));
  }

  const allRefs = unique([...packageScriptRefs, ...externalRefs]);

  for (const ref of allRefs) {
    const abs = path.join(root, ref);
    if (!fs.existsSync(abs)) {
      errors.push(`Referenced script does not exist: ${ref}`);
      continue;
    }
    const meta = manifestMap.get(ref);
    if (!meta) {
      errors.push(`Referenced script missing from manifest: ${ref}`);
      continue;
    }
    if (meta.tier !== "core") {
      errors.push(`Referenced script must be tier=core: ${ref} (found ${meta.tier})`);
    }
    if (!meta.owner || !meta.purpose) {
      errors.push(`Manifest entry must include owner and purpose: ${ref}`);
    }
  }

  for (const entry of manifestScripts) {
    if (entry.tier === "core") {
      const abs = path.join(root, entry.path);
      if (!fs.existsSync(abs)) {
        errors.push(`Manifest core script missing on disk: ${entry.path}`);
      }
    }
  }

  if (errors.length > 0) fail(errors);

  console.log("Script governance validation passed.");
  console.log(`- Checked references: ${allRefs.length}`);
  console.log(`- Manifest entries: ${manifestScripts.length}`);
}

main();
