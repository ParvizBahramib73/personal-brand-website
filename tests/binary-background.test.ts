import { strict as assert } from "node:assert";
import { test } from "node:test";
import { ambientWave, makeBinaryGrid, radialFalloff } from "../src/lib/binary-field";

test("binary grid is deterministic and stays within the canvas", () => {
  const digits = makeBinaryGrid(320, 240, 34);
  assert.ok(digits.length > 0);
  assert.deepEqual(makeBinaryGrid(320, 240, 34), digits);

  for (const digit of digits) {
    assert.ok(digit.x >= 0 && digit.x <= 320);
    assert.ok(digit.y >= 0 && digit.y <= 240);
    assert.ok(digit.value === "0" || digit.value === "1");
    assert.ok(digit.opacity >= 0.12 && digit.opacity <= 0.195);
    assert.ok(digit.driftX >= 0.6 && digit.driftX <= 1.4);
    assert.ok(digit.driftY >= 0.6 && digit.driftY <= 1.4);
  }
});

test("grid density is lower on mobile", () => {
  const dense = makeBinaryGrid(400, 800, 26);
  const sparse = makeBinaryGrid(400, 800, 34);
  assert.ok(sparse.length < dense.length);
});

test("ambient wave is bounded, time-dependent and smoothly changing", () => {
  const samples = Array.from({ length: 100 }, (_, i) => ambientWave(i * 27, 140, i * 0.15));
  assert.ok(samples.every((value) => value >= 0 && value <= 1));
  assert.notEqual(ambientWave(130, 180, 0), ambientWave(130, 180, 5));
  assert.ok(Math.abs(ambientWave(130, 180, 1) - ambientWave(130, 180, 1.001)) < 0.01);
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
