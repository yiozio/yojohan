import * as React from 'react';
import { observer } from 'mobx-react';
import Draggable from 'react-draggable';
import { tatamiSize } from './Header';

export interface ItemAttrs {
  name: string;
  color: string;
  width: number;
  height: number;
  rotateDeg: number;
}

interface ItemProps {
  item: ItemAttrs;
}
export default observer(Item);
function Item({ item }: ItemProps) {
  const { color, width, height, rotateDeg } = item;
  const [rate, setRate] = React.useState<number | null>(null);
  return (
    <Draggable scale={rate ? rate : undefined}>
      <g
        ref={dom => {
          if (!dom || !dom.parentElement || !dom.parentElement.parentElement) return;
          setRate(dom.parentElement.parentElement.clientWidth / (tatamiSize.get() * 1.5));
        }}
      >
        <rect fill={color} width={width} height={height} rotate={rotateDeg + 'deg'} />
        <text
          x={width / 2}
          y={height / 2}
          text-anchor="middle"
          dominant-baseline="central"
          fill="#FFF"
        >
          {item.name}
        </text>
      </g>
    </Draggable>
  );
}
