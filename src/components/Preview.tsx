import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Tatami from './Tatami';
import TatamiPattern from './TatamiPattern';
import Funiture from './Funiture';
import { funitures, tatamiSize, selection, dragging } from '../stores/funitures';

type DOMProps = {
  className?: string;
  tatamiSize: number;
  children: JSX.Element[];
  onMouseDown: () => void;
};

const DOM = (p: DOMProps) => (
  <div className={p.className}>
    <svg
      viewBox={`0 0 ${p.tatamiSize * 1.5} ${p.tatamiSize * 1.5}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      onMouseDown={p.onMouseDown}
    >
      <rect x={0} y={0} width={p.tatamiSize * 1.5} height={p.tatamiSize * 1.5} fill="#90A500" />
      <TatamiPattern />
      <Tatami x={0.5} y={0.5} type="Half" />
      <Tatami x={0} y={0} type="Hori" />
      <Tatami x={1} y={0} type="Vert" />
      <Tatami x={0.5} y={1} type="Hori" />
      <Tatami x={0} y={0.5} type="Vert" />
      <g>{p.children}</g>
    </svg>
  </div>
);

const Styled = styled(DOM)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background:
    'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQoU2N89+7dfwYC4P379wyMowpxhRJpwXP37l2CAQ6yCQB4tj7nxBC6EgAAAABJRU5ErkJggg==) repeat',

  '& > svg': {
    width: '100vmin',
    height: '100vmin'
  }
});

export default observer(Preview);
function Preview() {
  return (
    <Styled
      tatamiSize={tatamiSize.get()}
      onMouseDown={() => (dragging ? undefined : selection.set(undefined))}
    >
      {funitures.map((f, i) => (
        <Funiture key={i} funitureIndex={i} />
      ))}
    </Styled>
  );
}
