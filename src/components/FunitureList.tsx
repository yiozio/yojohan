import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import FunitureIcon from './FunitureIcon';
import { funitures } from '../stores/funitures';

type DOMProps = {
  className?: string;
  children: JSX.Element[];
};

const DOM = (p: DOMProps) => (
  <div className={p.className}>
    <div>{p.children}</div>
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

export default observer(FunitureList);
function FunitureList() {
  return (
    <Styled>
      {funitures.map((f, i) => (
        <FunitureIcon key={i} funitureIndex={i} />
      ))}
    </Styled>
  );
}
