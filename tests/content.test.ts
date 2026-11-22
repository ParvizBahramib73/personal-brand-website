import { strict as assert } from "node:assert";
import { test } from "node:test";
import { messages } from "../src/content/messages";
import { coreSkills, experience, selectedProjects } from "../src/content/profile";
import { locales, site } from "../src/lib/site";

test("all supported languages have the content needed by both pages", () => {
  for (const lang of locales) {
    assert.ok(messages[lang].home.role.length > 0);
    assert.ok(messages[lang].home.about.length > 0);
    assert.ok(messages[lang].details.intro.length > 0);
    assert.ok(messages[lang].details.contactBody.length > 0);
    assert.ok(site.name[lang].length > 0);
  }
});

test("professional records stay uniquely identified and bilingual", () => {
  assert.equal(new Set(experience.map((role) => role.id)).size, experience.length);
  for (const role of experience) {
    assert.ok(role.position.en && role.position.fa);
    assert.ok(role.period.en && role.period.fa);
  }
});

test("only named projects and real skills are listed", () => {
  assert.ok(selectedProjects.includes("Jumbula Dashboard"));
  assert.ok(coreSkills.includes("Angular"));
  assert.equal(new Set(selectedProjects).size, selectedProjects.length);
});
