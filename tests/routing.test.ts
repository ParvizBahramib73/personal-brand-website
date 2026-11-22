import { strict as assert } from "node:assert";
import { test } from "node:test";
import { alternateLocale, assetPath, isLocale, localePath, site } from "../src/lib/site";

test("accepts only supported locales", () => {
  assert.equal(isLocale("en"), true);
  assert.equal(isLocale("fa"), true);
  assert.equal(isLocale("de"), false);
  assert.equal(isLocale(""), false);
});

test("language switcher is reversible", () => {
  assert.equal(alternateLocale("en"), "fa");
  assert.equal(alternateLocale(alternateLocale("fa")), "fa");
});

test("link paths work with the GitHub Pages base path", () => {
  assert.equal(localePath("en"), "/en/");
  assert.equal(localePath("fa", "details"), "/fa/details/");
  assert.equal(assetPath("parviz-photo.svg"), "/personal-brand-website/parviz-photo.svg");
  assert.equal(site.url.endsWith(site.basePath), true);
});
