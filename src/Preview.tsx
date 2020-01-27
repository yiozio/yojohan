import * as React from 'react';
import styled from 'styled-components';
import { tatamiSize } from './Header';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Tatami from './Tatami';
import TatamiPattern from './TatamiPattern';
import Funiture, { FunitureAttrs } from './Funiture';

const itemsJson = decodeURIComponent(location.search.substr(6));
export const items = observable<FunitureAttrs>(itemsJson ? JSON.parse(itemsJson) : []);

export const save = () => {
  const json = JSON.stringify(items.toJS());
  const newUrl = './?json=' + encodeURIComponent(json);
  window.history.pushState(null, '', newUrl);
};

const Component = styled.svg({
  position: 'absolute',
  left: 0,
  top: '35px',
  width: 'calc(100vmin - 100px)',
  maxWidth: 'calc(100vw - 300px)',
  height: 'calc(100vmin - 100px)',
  maxHeight: 'calc(100vw - 300px)',
  background: '#90A500',

  '@media (orientation: portrait)': {
    width: '100vw',
    maxWidth: '100vw',
    height: '100vw',
    maxHeight: '100vw'
  }
});

export default observer(Preview);
function Preview() {
  const tatamiLongerSide = tatamiSize.get();
  return (
    <Component
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
          <Funiture key={i} funitureIndex={i} draggable />
        ))}
      </g>
    </Component>
  );
}
