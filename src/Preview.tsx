import * as React from 'react';

const pattern = { V: 'tatamiV', H: 'tatamiH' };

/** 畳の長辺の長さ */
const tatamiLongerSide = 88 * 2;
export default function Preview() {
  return (
    <svg
      className="preview"
      viewBox={`0 0 ${tatamiLongerSide * 1.5} ${tatamiLongerSide * 1.5}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <pattern id={pattern['V']} x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="2" height="2" fill="#C3D825" />
          <path d="M-.5 1.5L1 .5L2.5 1.5" stroke="#B2C714" strokeWidth="0.5" fill="none" />
        </pattern>
        <pattern id={pattern['H']} x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="2" height="2" fill="#C3D825" />
          <path d="M1.5 -.5L.5 1L1.5 2.5" stroke="#B2C714" strokeWidth="0.5" fill="none" />
        </pattern>
      </defs>
      <Tatami x={0.5} y={0.5} type="Half" />
      <Tatami x={0} y={0} type="Hori" />
      <Tatami x={1} y={0} type="Vert" />
      <Tatami x={0.5} y={1} type="Hori" />
      <Tatami x={0} y={0.5} type="Vert" />
    </svg>
  );
}

interface TatamiProps {
  x: number;
  y: number;
  type: 'Vert' | 'Hori' | 'Half';
}
function Tatami({ x, y, type }: TatamiProps) {
  /** 畳縁の長さ */
  const strokeWidth = 2.8;
  /** 畳間の長さ */
  const space = 0.5;
  const adjust = strokeWidth + space;
  return (
    <rect
      className="tatami"
      fill={`url(#${type === 'Hori' ? pattern['H'] : pattern['V']})`}
      strokeWidth={strokeWidth}
      stroke="#A1B603"
      x={tatamiLongerSide * x + adjust / 2}
      y={tatamiLongerSide * y + adjust / 2}
      width={tatamiLongerSide * (type === 'Hori' ? 1 : 0.5) - adjust}
      height={tatamiLongerSide * (type === 'Vert' ? 1 : 0.5) - adjust}
    />
  );
}
