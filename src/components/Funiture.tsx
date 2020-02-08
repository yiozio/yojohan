import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { FunitureAttrs } from '../defs';
import { funitures, save, tatamiSize } from '../stores/funitures';
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
    <g onMouseDownCapture={dragStart} onTouchStartCapture={dragStart}>
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
  </g>
);

const Styled = styled(DOM)({});

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
              moveStart(
                e,
                tatamiSize.get(),
                item.x,
                item.y,
                x => (item.x = x),
                y => (item.y = y),
                save
              )
          : undefined
      }
      rotateStart={
        draggable
          ? e =>
              rotateStart(
                e,
                tatamiSize.get(),
                item.x,
                item.y,
                item.width,
                item.height,
                r => (item.rotateDeg = r),
                save
              )
          : undefined
      }
    />
  );
}

function moveStart(
  e: React.TouchEvent | React.MouseEvent,
  tatamiSize: number,
  x: number,
  y: number,
  setX: (x: number) => void,
  setY: (y: number) => void,
  save?: () => void
) {
  const element = e.currentTarget as Element;
  const svgBase = element.parentElement?.parentElement?.parentElement as Element;

  const getPos = (e: MouseEvent | TouchEvent) => {
    const { clientX, clientY } = (e as TouchEvent).touches
      ? (e as TouchEvent).touches[0]
      : (e as MouseEvent);
    return { clientX, clientY };
  };

  // ブラウザ上のサイズ(px)とSVGのサイズの比率
  const rate = svgBase.clientWidth / (tatamiSize * 1.5);

  const { clientX: startX, clientY: startY } = getPos(e.nativeEvent);

  function move(e: MouseEvent | TouchEvent) {
    const { clientX, clientY } = getPos(e);
    setX(x - Math.round((startX - clientX) / rate));
    setY(y - Math.round((startY - clientY) / rate));
  }

  if ((e as React.TouchEvent).touches) {
    element.addEventListener('touchmove', move, { passive: true });
    const end = () => {
      element.removeEventListener('touchmove', move);
      element.removeEventListener('touchend', end);
      save && save();
    };
    element.addEventListener('touchend', end, { passive: true });
  } else {
    document.addEventListener('mousemove', move, { passive: true });
    const end = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', end);
      save && save();
    };
    document.addEventListener('mouseup', end, { passive: true });
  }
}
function rotateStart(
  e: React.TouchEvent | React.MouseEvent,
  tatamiSize: number,
  x: number,
  y: number,
  width: number,
  height: number,
  setRotate: (rotate: number) => void,
  save?: () => void
) {
  const element = e.currentTarget;
  const svg = element.parentElement?.parentElement?.parentElement as Element;
  const svgBase = svg.getBoundingClientRect();

  const getPos = (e: MouseEvent | TouchEvent) => {
    const { clientX, clientY } = (e as TouchEvent).touches
      ? (e as TouchEvent).touches[0]
      : (e as MouseEvent);
    return { clientX, clientY };
  };

  // ブラウザ上のサイズ(px)とSVGのサイズの比率
  const rate = svgBase.width / (tatamiSize * 1.5);

  const centerX = svgBase.left + x * rate;
  const centerY = svgBase.top + y * rate;

  function move(e: MouseEvent | TouchEvent) {
    const { clientX, clientY } = getPos(e);
    const vectorX = clientX - centerX;
    const vectorY = clientY - centerY;
    const degree = (Math.atan2(vectorY, vectorX) * 180) / Math.PI - 90;
    setRotate(Math.round(degree));
  }

  if ((e as React.TouchEvent).touches) {
    element.addEventListener('touchmove', move, { passive: true });
    const end = () => {
      element.removeEventListener('touchmove', move);
      element.removeEventListener('touchend', end);
      save && save();
    };
    element.addEventListener('touchend', end, { passive: true });
  } else {
    document.addEventListener('mousemove', move, { passive: true });
    const end = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', end);
      save && save();
    };
    document.addEventListener('mouseup', end, { passive: true });
  }
}
