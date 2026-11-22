import { strict as assert } from "node:assert";
import { test } from "node:test";
import { socialLinks } from "../src/content/social-links";
import { site } from "../src/lib/site";

test("social links include the owner's verified profiles", () => {
  assert.deepEqual(
    socialLinks.map((link) => link.platform),
    ["github", "linkedin", "instagram", "whatsapp", "email"],
  );
  assert.equal(socialLinks.find((link) => link.platform === "instagram")?.href, site.instagram);
  assert.equal(socialLinks.find((link) => link.platform === "whatsapp")?.href, site.whatsapp);
  assert.equal(new Set(socialLinks.map((link) => link.href)).size, socialLinks.length);
});

test("external links open safely, while email stays a mailto link", () => {
  for (const link of socialLinks) {
    assert.equal(link.external, link.platform !== "email");
    assert.ok(link.external ? link.href.startsWith("https://") : link.href.startsWith("mailto:"));
  }
});
