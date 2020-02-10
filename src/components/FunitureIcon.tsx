import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Funiture from './Funiture';
import { funitures } from '../stores/funitures';

type Props = {
  funitureIndex: number;
  isSelected: boolean;
  select: () => void;
};
type DOMProps = {
  className?: string;
  index: number;
  width: number;
  height: number;
  isSelected: boolean;
  select: () => void;
};

const DOM = (p: DOMProps) => (
  <svg
    className={p.className}
    viewBox={`${-p.width / 2} ${-p.height / 2} ${p.width} ${p.height}`}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={p.isSelected ? { boxShadow: 'inset 0 0 0 3px #00000022' } : undefined}
    onClick={p.select}
  >
    {<Funiture funitureIndex={p.index} />}
  </svg>
);

const Styled = styled(DOM)({
  flex: '0 0 auto',
  width: '80px',
  height: '80px',
  padding: '3px',
  margin: '2px',
  background: '#FEE',

  '&:hover': { filter: 'brightness(0.9)' },
  '& > *': { transform: 'none' },
  '& > g > circle': { display: 'none' }
});

export default observer(FunitureIcon);
function FunitureIcon(p: Props) {
  const item = funitures[p.funitureIndex];

  return (
    <Styled
      index={p.funitureIndex}
      width={item.width}
      height={item.height}
      isSelected={p.isSelected}
      select={p.select}
    />
  );
}
