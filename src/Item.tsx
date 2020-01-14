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
  draggable?: boolean;
}
export default observer(Item);
function Item({ item, draggable }: ItemProps) {
  const { color, x, y, width, height, rotateDeg } = item;
  const [rate, setRate] = React.useState<number | null>(null);
  const pos = React.useRef<{ x: number; y: number } | null>(null);
  const element = (
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
        strokeWidth="1"
        stroke="#FFF"
      />
      <text x={width / 2} y={height / 2} textAnchor="middle" dominantBaseline="central" fill="#FFF">
        {item.name}
      </text>
    </g>
  );

  return draggable ? (
    <Draggable
      scale={rate ? rate : undefined}
      position={{ x, y }}
      onStart={(e: any) => {
        if (e.touches) {
          pos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else {
          pos.current = { x: 0, y: 0 };
        }
      }}
      onDrag={(e: any) => {
        if (!pos.current || e.touches) return;
        pos.current.x += e.movementX;
        pos.current.y += e.movementY;
      }}
      onStop={(e: any) => {
        if (pos.current === null || rate === null) return;
        const move = e.touches
          ? {
              x: e.changedTouches[0].clientX - pos.current.x,
              y: e.changedTouches[0].clientY - pos.current.y
            }
          : pos.current;
        item.x = Math.round(item.x + move.x / rate);
        item.y = Math.round(item.y + move.y / rate);
        pos.current = null;
      }}
      children={element}
    />
  ) : (
    element
  );
}
