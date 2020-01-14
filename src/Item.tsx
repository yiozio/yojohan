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
  const pos = React.useRef<{ x: number; y: number } | null>(null);
  return (
    <Draggable
      scale={rate ? rate : undefined}
      position={{ x, y }}
      onStart={e => {
        pos.current = { x: 0, y: 0 };
      }}
      onDrag={(e: any) => {
        if (!pos.current) return;
        pos.current.x += e.movementX;
        pos.current.y += e.movementY;
      }}
      onStop={(e: any) => {
        if (pos.current === null || rate === null) return;
        item.x = Math.round(item.x + pos.current.x / rate);
        item.y = Math.round(item.y + pos.current.y / rate);
        pos.current = null;
      }}
    >
      <g
        className="item"
        ref={dom => {
          if (!dom || !dom.parentElement || !dom.parentElement.parentElement) return;
          setRate(dom.parentElement.parentElement.clientWidth / (tatamiSize.get() * 1.5));
        }}
      >
        <rect
          fill={color}
          x=".5"
          y=".5"
          width={width - 1}
          height={height - 1}
          rotate={rotateDeg + 'deg'}
          stroke-width="1"
          stroke="#FFF"
        />
        <text
          x={width / 2}
          y={height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#FFF"
        >
          {item.name}
        </text>
      </g>
    </Draggable>
  );
}
