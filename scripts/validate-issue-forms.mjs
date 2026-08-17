#!/usr/bin/env node
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { parseDocument } from "yaml";
import { root } from "./lib.mjs";

const directory = path.join(root, ".github", "ISSUE_TEMPLATE");
const allowedTypes = new Set(["markdown", "input", "textarea", "dropdown", "checkboxes"]);
const allowedAttributes = {
  markdown: new Set(["value"]),
  input: new Set(["label", "description", "placeholder"]),
  textarea: new Set(["label", "description", "placeholder", "render"]),
  dropdown: new Set(["label", "description", "options", "multiple"]),
  checkboxes: new Set(["label", "description", "options"])
};
const errors = [];

for (const name of (await readdir(directory)).filter((entry) => entry.endsWith(".yml")).sort()) {
  const file = path.join(directory, name);
  const document = parseDocument(await readFile(file, "utf8"), { prettyErrors: true, uniqueKeys: true });
  if (document.errors.length) {
    for (const error of document.errors) errors.push(`${name}: ${error.message}`);
    continue;
  }
  const form = document.toJS();
  if (name === "config.yml") {
    if (typeof form.blank_issues_enabled !== "boolean") errors.push(`${name}: blank_issues_enabled must be boolean`);
    if (!Array.isArray(form.contact_links)) errors.push(`${name}: contact_links must be an array`);
    continue;
  }
  for (const field of ["name", "description"]) if (typeof form[field] !== "string" || !form[field].trim()) errors.push(`${name}: missing ${field}`);
  if (!Array.isArray(form.body) || form.body.length === 0) {
    errors.push(`${name}: body must contain form elements`);
    continue;
  }
  const ids = new Set();
  for (const [index, item] of form.body.entries()) {
    const location = `${name}: body[${index}]`;
    if (!allowedTypes.has(item?.type)) {
      errors.push(`${location} has unsupported type ${item?.type}`);
      continue;
    }
    if (item.type !== "markdown") {
      if (typeof item.id !== "string" || !/^[a-zA-Z0-9_-]+$/.test(item.id)) errors.push(`${location} needs a valid id`);
      else if (ids.has(item.id)) errors.push(`${location} duplicates id ${item.id}`);
      else ids.add(item.id);
    }
    const attributes = item.attributes ?? {};
    for (const key of Object.keys(attributes)) if (!allowedAttributes[item.type].has(key)) errors.push(`${location}.attributes has unsupported key ${key}`);
    if (item.type === "markdown") {
      if (typeof attributes.value !== "string" || !attributes.value.trim()) errors.push(`${location}.attributes.value is required`);
      continue;
    }
    if (typeof attributes.label !== "string" || !attributes.label.trim()) errors.push(`${location}.attributes.label is required`);
    if (["dropdown", "checkboxes"].includes(item.type)) {
      if (!Array.isArray(attributes.options) || attributes.options.length === 0) errors.push(`${location}.attributes.options must not be empty`);
      if (item.type === "dropdown" && attributes.options?.some((option) => typeof option !== "string")) errors.push(`${location} dropdown options must be strings`);
      if (item.type === "checkboxes" && attributes.options?.some((option) => typeof option?.label !== "string")) errors.push(`${location} checkbox options need labels`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log("Validated GitHub issue-form YAML and supported field contracts.");
