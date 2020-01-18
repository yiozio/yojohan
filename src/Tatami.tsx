import * as React from 'react';
import { tatamiSize } from './Header';
import { observer } from 'mobx-react';
import { pattern } from './TatamiPattern';

interface TatamiProps {
  x: number;
  y: number;
  type: 'Vert' | 'Hori' | 'Half';
}
export default observer(Tatami);
function Tatami({ x, y, type }: TatamiProps) {
  const tatamiLongerSide = tatamiSize.get();
  /** 畳縁の長さ(cm) */
  const strokeWidth = 2.8;
  /** 畳間の長さ(cm) */
  const space = 0.5;
  const adjust = strokeWidth + space;
  return (
    <rect
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
