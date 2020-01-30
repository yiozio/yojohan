import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { FunitureAttrs } from './Funiture';
import { items } from './Preview';
import FunitureIcon from './FunitureIcon';

export const selectedIndex = observable.box<number | undefined>();

type DOMProps = {
  className?: string;
  items: FunitureAttrs[];
  index?: number;
  setIndex: (index?: number) => void;
};

const DOM = (p: DOMProps) => (
  <div className={p.className}>
    <div>
      {p.items.map((item, i) => (
        <FunitureIcon
          key={i}
          funitureIndex={i}
          isSelected={p.index === i}
          select={() => p.setIndex(p.index === i ? undefined : i)}
        />
      ))}
    </div>
  </div>
);

const Styled = styled(DOM)({
  position: 'absolute',
  left: 0,
  top: '55px',
  width: '100%',
  height: 'calc(100% - 55px)',
  overflowX: 'hidden',
  overflowY: 'scroll',
  margin: 0,

  '& > div': {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    margin: '5px 0'
  },

  '@media (orientation: portrait)': {
    top: 0,
    overflowX: 'scroll',
    overflowY: 'hidden',
    margin: 0,

    '& > div': { flexFlow: 'row nowrap', justifyContent: 'flex-start' }
  }
});

export default observer(Menu);
function Menu() {
  return (
    <Styled
      items={items.map(a => a)}
      index={selectedIndex.get()}
      setIndex={index => selectedIndex.set(index)}
    />
  );
}
