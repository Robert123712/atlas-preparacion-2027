import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const firebase = await readFile(new URL("../lib/firebase.ts", import.meta.url), "utf8");

test("does not calculate the local date during server render", () => {
  assert.doesNotMatch(page, /const today = .*new Date\(\)/);
  assert.match(page, /setTodayLabel/);
});

test("tasks expose a practical editable description", () => {
  assert.match(page, /selectedTask/);
  assert.match(page, /Descripción práctica/);
  assert.match(firebase, /updateTaskDescription/);
});
