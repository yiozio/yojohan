import * as React from 'react';
import { observer } from 'mobx-react';
import Draggable from 'react-draggable';
import { tatamiSize } from './Header';

export interface ItemAttrs {
  name: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotateDeg: number;
}

interface ItemProps {
  item: ItemAttrs;
}
export default observer(Item);
function Item({ item }: ItemProps) {
  const { color, x, y, width, height, rotateDeg } = item;
  const [rate, setRate] = React.useState<number | null>(null);
  return (
    <Draggable scale={rate ? rate : undefined}>
      <rect
        className="tatami"
        fill={color}
        x={x}
        y={y}
        ref={dom => {
          if (!dom || !dom.parentElement || !dom.parentElement.parentElement) return;
          setRate(dom.parentElement.parentElement.clientWidth / (tatamiSize.get() * 1.5));
        }}
        width={width}
        height={height}
        rotate={rotateDeg + 'deg'}
      />
    </Draggable>
  );
}
