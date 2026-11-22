export type BinaryDigit = Readonly<{
  x: number;
  y: number;
  value: "0" | "1";
  opacity: number;
}>;

/** Deterministic texture: resize does not introduce animated visual noise. */
function noise(row: number, column: number, salt: number): number {
  const seed = Math.sin(row * 127.1 + column * 311.7 + salt * 74.7) * 43758.5453;
  return seed - Math.floor(seed);
}

export function makeBinaryGrid(width: number, height: number, spacing: number): BinaryDigit[] {
  if (width <= 0 || height <= 0 || spacing <= 0) return [];

  const digits: BinaryDigit[] = [];
  const columns = Math.ceil(width / spacing);
  const rows = Math.ceil(height / spacing);

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = (column + 0.5) * spacing + (noise(row, column, 1) - 0.5) * spacing * 0.32;
      const y = (row + 0.5) * spacing + (noise(row, column, 2) - 0.5) * spacing * 0.32;

      if (x < 0 || x > width || y < 0 || y > height) continue;

      digits.push({
        x,
        y,
        value: noise(row, column, 3) > 0.5 ? "1" : "0",
        opacity: 0.033 + noise(row, column, 4) * 0.026,
      });
    }
  }

  return digits;
}

/** Smooth edge with zero added illumination at and beyond the radius. */
export function radialFalloff(distance: number, radius: number): number {
  if (radius <= 0 || distance >= radius) return 0;
  const t = Math.max(0, 1 - Math.max(0, distance) / radius);
  return t * t * (3 - 2 * t);
}
