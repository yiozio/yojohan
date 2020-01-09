import * as React from 'react';
import { tatamiSize } from './Header';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Tatami from './Tatami';
import TatamiPattern from './TatamiPattern';
import Items from './Item';

export const items = observable<{
  name: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotateDeg: number;
}>([]);

export default observer(Preview);
function Preview() {
  const tatamiLongerSide = tatamiSize.get();
  return (
    <svg
      className="preview"
      viewBox={`0 0 ${tatamiLongerSide * 1.5} ${tatamiLongerSide * 1.5}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <TatamiPattern />
      <Tatami x={0.5} y={0.5} type="Half" />
      <Tatami x={0} y={0} type="Hori" />
      <Tatami x={1} y={0} type="Vert" />
      <Tatami x={0.5} y={1} type="Hori" />
      <Tatami x={0} y={0.5} type="Vert" />
      <g>
        {items.map((_, i) => (
          <Items key={i} index={i} />
        ))}
      </g>
    </svg>
  );
}
