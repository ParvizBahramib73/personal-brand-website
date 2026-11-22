import { strict as assert } from "node:assert";
import { test } from "node:test";
import { makeBinaryGrid, mexicanWave, radialFalloff } from "../src/lib/binary-field";

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

test("Mexican wave rises and settles in sequence from left to right", () => {
  const width = 600;
  const height = 400;
  const arrival = (x: number, y: number) =>
    ((x + y * 0.12 + 165) / (width + height * 0.12 + 330)) * 8;
  const leftArrival = arrival(120, 80);
  const rightArrival = arrival(480, 80);

  assert.ok(leftArrival < rightArrival);
  assert.equal(mexicanWave(120, 80, leftArrival, width, height), 1);
  assert.equal(mexicanWave(480, 80, rightArrival, width, height), 1);
  assert.equal(mexicanWave(480, 80, leftArrival, width, height), 0);
  assert.equal(mexicanWave(120, 80, rightArrival, width, height), 0);
});

test("Mexican wave is bounded, smooth and has no visible loop seam", () => {
  const samples = Array.from({ length: 100 }, (_, i) =>
    mexicanWave(i * 6, 140, i * 0.08, 600, 400),
  );
  assert.ok(samples.every((value) => value >= 0 && value <= 1));
  assert.equal(mexicanWave(120, 80, 0, 600, 400), 0);
  assert.equal(mexicanWave(120, 80, 8, 600, 400), 0);
  assert.ok(
    Math.abs(mexicanWave(120, 80, 2.4, 600, 400) - mexicanWave(120, 80, 2.401, 600, 400)) <
      0.01,
  );
  assert.equal(mexicanWave(120, 80, 2, 0, 400), 0);
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
