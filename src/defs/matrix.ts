type Matrix = {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
};
interface SinCos {
  sin: number;
  cos: number;
}

export function toArray(matrix: Matrix): number[] {
  return [matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f];
}

export function transform(...matrixes: Matrix[]): Matrix {
  const multiply = (m1: Matrix, m2: Matrix): Matrix => {
    return {
      a: m1.a * m2.a + m1.c * m2.b,
      b: m1.b * m2.a + m1.d * m2.b,
      c: m1.a * m2.c + m1.c * m2.d,
      d: m1.b * m2.c + m1.d * m2.d,
      e: m1.a * m2.e + m1.c * m2.f + m1.e,
      f: m1.b * m2.e + m1.d * m2.f + m1.f
    };
  };
  switch (matrixes.length) {
    case 0:
      throw new Error('no matrices provided.');
    case 1:
      return matrixes[0];
    case 2:
      return multiply(matrixes[0], matrixes[1]);
    default:
      const [m1, m2, ...rest] = matrixes;
      const m = multiply(m1, m2);
      return transform(m, ...rest);
  }
}
function getSinCos(degree: number): SinCos {
  const radian = (degree * Math.PI) / 180;
  const sin = Math.sin(radian);
  const cos = Math.cos(radian);
  return { sin, cos };
}
export function rotate(degree: number, x?: number, y?: number): Matrix {
  if (x === undefined && y === undefined) {
    const angle = getSinCos(degree);
    return { a: angle.cos, b: angle.sin, c: -angle.sin, d: angle.cos, e: 0, f: 0 };
  } else {
    return transform(
      translate(x as number, y as number),
      rotate(degree),
      translate(-(x as number), -(y as number))
    );
  }
}
export function scale(sx: number, sy: number): Matrix {
  return { a: sx, b: 0, c: 0, d: sy, e: 0, f: 0 };
}
export function translate(x: number, y: number): Matrix {
  return { a: 1, b: 0, c: 0, d: 1, e: x, f: y };
}
