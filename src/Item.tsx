import * as React from 'react';
import { items } from './Preview';
import { observer } from 'mobx-react';

interface ItemProps {
  index: number;
}
export default observer(Item);
function Item({ index }: ItemProps) {
  const { color, x, y, width, height, rotateDeg } = items[index];
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
