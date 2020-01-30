import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Input from './Input';
import Button from './Button';
import { funitures, save } from '../stores/funitures';
import { FunitureAttrs, funitureColors } from '../defs';

type Props = {
  funitureIndex?: number;
  onClosed: () => void;
};
type DOMProps = {
  className?: string;
  item: FunitureAttrs;
  setItem: (item: FunitureAttrs) => void;
  onClosed: () => void;
};

const DOM = ({ className, item, setItem, onClosed }: DOMProps) => (
  <div className={className}>
    <div>
      <div>
        名称:
        <Input
          type="text"
          value={item.name}
          onChange={e => setItem({ ...item, name: e.target.value })}
        />
      </div>
      <div>
        奥行:
        <Input
          type="number"
          value={item.height}
          onChange={e => setItem({ ...item, height: Number(e.target.value) })}
        />
        cm
      </div>
      <div>
        幅:&nbsp;&nbsp;
        <Input
          type="number"
          value={item.width}
          onChange={e => setItem({ ...item, width: Number(e.target.value) })}
        />
        cm
      </div>
      <div>
        {funitureColors.map((color, i) => (
          <span
            key={i}
            style={{
              background: color,
              boxShadow: item.color === color ? '0 0 0 2px inset #00000030' : ''
            }}
            onClick={() => setItem({ ...item, color })}
          />
        ))}
      </div>
      <Button
        onClick={() => {
          save();
          onClosed();
        }}
      >
        決定
      </Button>
    </div>
  </div>
);

const Styled = styled(DOM)({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  background: '#00000030',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& > div': { flex: '0 0 auto', padding: '10px', background: '#00000050', color: '#FEE' },
  '& > div > div': { margin: '4px 0' },
  '& > div > div:nth-child(2) > input, & > div > div:nth-child(3) > input': {
    width: '18px',
    textAlign: 'right',
    marginRight: '2px'
  },
  '& > div > div:nth-child(4)': {
    display: 'flex',
    height: '35px',
    flexFlow: 'row nowrap',
    justifyContent: 'space-around'
  },
  '& > div > div:nth-child(4) > span': { width: '35px', height: '35px', flex: '0 0 auto' }
});

export default observer(FunitureEdit);
function FunitureEdit({ funitureIndex, onClosed }: Props) {
  return (
    <Styled
      item={funitures[funitureIndex || funitures.length - 1]}
      setItem={item => (funitures[funitureIndex || funitures.length - 1] = item)}
      onClosed={onClosed}
    />
  );
}
