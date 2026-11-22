import { strict as assert } from "node:assert";
import { test } from "node:test";
import { makeBinaryGrid, radialFalloff } from "../src/lib/binary-field";

test("binary grid is deterministic and stays within the canvas", () => {
  const digits = makeBinaryGrid(320, 240, 40);
  assert.ok(digits.length > 0);
  assert.deepEqual(makeBinaryGrid(320, 240, 40), digits);

  for (const digit of digits) {
    assert.ok(digit.x >= 0 && digit.x <= 320);
    assert.ok(digit.y >= 0 && digit.y <= 240);
    assert.ok(digit.value === "0" || digit.value === "1");
    assert.ok(digit.opacity >= 0.03 && digit.opacity <= 0.07);
  }
});

test("grid density is lower on mobile", () => {
  const dense = makeBinaryGrid(400, 800, 32);
  const sparse = makeBinaryGrid(400, 800, 40);
  assert.ok(sparse.length < dense.length);
});

test("illumination is smooth and reaches zero at the boundary", () => {
  assert.equal(radialFalloff(0, 155), 1);
  assert.equal(radialFalloff(155, 155), 0);
  assert.equal(radialFalloff(170, 155), 0);
  assert.equal(radialFalloff(50, 0), 0);
  assert.ok(radialFalloff(30, 155) > radialFalloff(90, 155));
  assert.ok(radialFalloff(90, 155) > radialFalloff(145, 155));
});

test("invalid grid dimensions do not create digits", () => {
  assert.deepEqual(makeBinaryGrid(0, 100, 40), []);
  assert.deepEqual(makeBinaryGrid(100, 100, 0), []);
});
