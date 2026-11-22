import { strict as assert } from "node:assert";
import { test } from "node:test";
import { jsonLd, pageMetadata, pageUrl, structuredProfile } from "../src/lib/seo";
import { locales, site } from "../src/lib/site";

test("canonical and hreflang are localized, unique and reciprocal", () => {
  for (const lang of locales) {
    for (const page of ["home", "details"] as const) {
      const url = pageUrl(lang, page);
      const metadata = pageMetadata(lang, page);
      assert.equal(metadata.alternates?.canonical, url);
      assert.equal(metadata.alternates?.languages?.en, pageUrl("en", page));
      assert.equal(metadata.alternates?.languages?.fa, pageUrl("fa", page));
      assert.ok(String(metadata.title).length > 8);
      assert.ok(String(metadata.description).length > 50);
    }
  }
});

test("Person structured data uses confirmed identity and public links", () => {
  const data = structuredProfile("en", "details");
  const person = data["@graph"].find((entry) => entry["@type"] === "Person");
  assert.ok(person && "sameAs" in person);
  assert.equal(person.name, "Parviz Bahrami");
  assert.deepEqual(person.sameAs, [site.linkedin, site.github, site.instagram]);
});

test("JSON-LD serialization neutralizes HTML-open brackets", () => {
  const safe = jsonLd({ value: "</script><script>alert(1)</script>" });
  assert.equal(safe.includes("<script>"), false);
  assert.ok(safe.includes("\\u003c"));
});
