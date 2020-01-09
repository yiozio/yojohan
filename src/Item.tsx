import * as React from 'react';
import { observer } from 'mobx-react';

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
  return (
    <rect
      className="tatami"
      fill={color}
      x={x}
      y={y}
      width={width}
      height={height}
      rotate={rotateDeg + 'deg'}
    />
  );
}
