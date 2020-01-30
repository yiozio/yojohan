import * as React from 'react';
import { tatamiSize } from './Header';
import { observer } from 'mobx-react';
import { tatamiPattern } from '../defs';

type Props = {
  x: number;
  y: number;
  type: 'Vert' | 'Hori' | 'Half';
};
type DOMProps = Props & {
  className?: string;
  tatamiSize: number;
  pattern: typeof tatamiPattern;
};

/** 畳縁の長さ(cm) */
const strokeWidth = 2.8;
/** 畳間の長さ(cm) */
const space = 0.5;
const adjust = strokeWidth + space;
const DOM = (p: DOMProps) => (
  <rect
    fill={`url(#${p.type === 'Hori' ? p.pattern['H'] : p.pattern['V']})`}
    strokeWidth={strokeWidth}
    stroke="#A1B603"
    x={p.tatamiSize * p.x + adjust / 2}
    y={p.tatamiSize * p.y + adjust / 2}
    width={p.tatamiSize * (p.type === 'Hori' ? 1 : 0.5) - adjust}
    height={p.tatamiSize * (p.type === 'Vert' ? 1 : 0.5) - adjust}
  />
);

const Styled = DOM;

export default observer(Tatami);
function Tatami(p: Props) {
  return <Styled tatamiSize={tatamiSize.get()} pattern={tatamiPattern} {...p} />;
}
