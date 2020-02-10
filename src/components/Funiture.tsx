import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { FunitureAttrs } from '../defs';
import { funitures, save, tatamiSize, selectedIndex } from '../stores/funitures';
import * as matrix from '../defs/matrix';

type Props = {
  funitureIndex: number;
  draggable?: boolean;
};
type DOMProps = FunitureAttrs & {
  className?: string;
  dragStart?: (e: React.MouseEvent | React.TouchEvent) => void;
  rotateStart?: (e: React.MouseEvent | React.TouchEvent) => void;
};

const DOM = ({
  className,
  color,
  width,
  x,
  y,
  height,
  rotateDeg,
  name,
  dragStart,
  rotateStart
}: DOMProps) => (
  <g
    className={className}
    transform={`matrix(${matrix
      .toArray(matrix.transform(matrix.translate(x, y), matrix.rotate(rotateDeg)))
      .join(',')})`}
  >
    {rotateStart ? (
      <circle
        cx="0"
        cy={height / 2 + 5}
        r={3}
        fill={color}
        strokeWidth="1"
        stroke="#FFF"
        onMouseDown={rotateStart}
        onTouchStart={rotateStart}
      />
    ) : (
      undefined
    )}
    <g onMouseDown={dragStart} onTouchStart={dragStart}>
      <rect
        fill={color}
        x={-width / 2 + 0.5}
        y={-height / 2 + 0.5}
        width={width - 1}
        height={height - 1}
        strokeWidth="1"
        stroke="#FFF"
      />
      <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fill="#FFF">
        {name}
      </text>
    </g>
  </g>
);

const Styled = styled(DOM)({
  '& > circle + g > rect': {
    strokeDasharray: '3 1',
    animation: `selected 0.5s linear infinite`
  },
  '@keyframes selected': {
    to: { strokeDashoffset: 4 }
  }
});

export const base = Styled;

export default observer(Funiture);
function Funiture({ funitureIndex, draggable }: Props) {
  const item = funitures[funitureIndex];

  return (
    <Styled
      {...item}
      dragStart={
        draggable
          ? e =>
              dragStart(
                e,
                tatamiSize.get(),
                (svgBase, rate) => {
                  selectedIndex.set(funitureIndex);
                  const { clientX: startX, clientY: startY } = getPos(e.nativeEvent);

                  return (e: MouseEvent | TouchEvent) => {
                    const { clientX, clientY } = getPos(e);
                    funitures[funitureIndex] = {
                      ...item,
                      x: item.x - Math.round((startX - clientX) / rate),
                      y: item.y - Math.round((startY - clientY) / rate)
                    };
                  };
                },
                save
              )
          : undefined
      }
      rotateStart={
        draggable && selectedIndex.get() === funitureIndex
          ? e =>
              dragStart(
                e,
                tatamiSize.get(),
                (svgBase, rate) => {
                  selectedIndex.set(funitureIndex);
                  const centerX = svgBase.left + item.x * rate;
                  const centerY = svgBase.top + item.y * rate;

                  return (e: MouseEvent | TouchEvent) => {
                    const { clientX, clientY } = getPos(e);
                    const vectorX = clientX - centerX;
                    const vectorY = clientY - centerY;
                    const degree = (Math.atan2(vectorY, vectorX) * 180) / Math.PI - 90;
                    funitures[funitureIndex].rotateDeg = Math.round(degree);
                  };
                },
                save
              )
          : undefined
      }
    />
  );
}

function dragStart(
  e: React.TouchEvent | React.MouseEvent,
  tatamiSize: number,
  getDragHandler: (svgBase: DOMRect, rate: number) => (e: MouseEvent | TouchEvent) => void,
  save: () => void
) {
  const element = e.currentTarget;
  const svg = element.parentElement?.parentElement?.parentElement as Element;
  const svgBase = svg.getBoundingClientRect();

  // ブラウザ上のサイズ(px)とSVGのサイズの比率
  const rate = svgBase.width / (tatamiSize * 1.5);

  const drag = getDragHandler(svgBase, rate);

  const [target, moveEvent, endEvent] = (e as React.TouchEvent).touches
    ? [element, 'touchmove', 'touchend']
    : [document, 'mousemove', 'mouseup'];

  target.addEventListener(moveEvent, drag, { passive: true });
  const end = () => {
    target.removeEventListener(moveEvent, drag);
    target.removeEventListener(endEvent, end);
    save();
  };
  target.addEventListener(endEvent, end, { passive: true });
}
function getPos(e: MouseEvent | TouchEvent) {
  const { clientX, clientY } = (e as TouchEvent).touches
    ? (e as TouchEvent).touches[0]
    : (e as MouseEvent);
  return { clientX, clientY };
}
