#!/usr/bin/env node
"use strict";

const fs = require("fs");

const REQUIRED = ["task_id", "next_owner", "action", "target", "hitl"];
const PRIVILEGED = new Set(["merge", "deploy", "secret_use", "delete"]);
const PRIVILEGED_EXTRA = ["blast_radius", "rollback"];

function fail(message) {
  console.error(`invalid handoff: ${message}`);
  process.exit(1);
}

const filePath = process.argv[2];
if (!filePath) {
  fail("usage: validate-handoff.js <file.json>");
}

let data;
try {
  data = JSON.parse(fs.readFileSync(filePath, "utf8"));
} catch (error) {
  fail(`JSON parse: ${error instanceof Error ? error.message : String(error)}`);
}

if (data === null || typeof data !== "object" || Array.isArray(data)) {
  fail("root must be an object");
}

for (const key of REQUIRED) {
  if (!Object.prototype.hasOwnProperty.call(data, key)) {
    fail(`missing ${key}`);
  }
}

if (typeof data.task_id !== "string" || data.task_id.trim() === "") {
  fail("task_id must be a non-empty string");
}
if (typeof data.next_owner !== "string" || data.next_owner.trim() === "") {
  fail("next_owner must be a non-empty string");
}
if (typeof data.action !== "string" || data.action.trim() === "") {
  fail("action must be a non-empty string");
}
if (typeof data.target !== "string" || data.target.trim() === "") {
  fail("target must be a non-empty string");
}
if (typeof data.hitl !== "boolean") {
  fail("hitl must be boolean");
}

if (data.decided_by === "auto") {
  fail("decided_by: auto is forbidden");
}

if (PRIVILEGED.has(data.action)) {
  if (data.hitl !== true) {
    fail(`privileged action ${data.action} requires hitl: true`);
  }
  for (const key of PRIVILEGED_EXTRA) {
    if (typeof data[key] !== "string" || data[key].trim() === "") {
      fail(`privileged action missing ${key}`);
    }
  }
}

console.log(`ok ${filePath}`);
