import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Input from './Input';
import Button from './Button';
import { items, save } from './Preview';

const Component = styled.div({
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

export const colors = ['#076572', '#008496', '#09AA91', '#44C876', '#CCE574'];
export default observer(FunitureEdit);
function FunitureEdit({
  funitureIndex,
  onClosed
}: {
  funitureIndex: number;
  onClosed: () => void;
}) {
  const item = items[funitureIndex];

  return (
    <Component>
      <div>
        <div>
          名称:
          <Input type="text" value={item.name} onChange={e => (item.name = e.target.value)} />
        </div>
        <div>
          奥行:
          <Input
            type="number"
            value={item.height}
            onChange={e => (item.height = Number(e.target.value))}
          />
          cm
        </div>
        <div>
          幅:&nbsp;&nbsp;
          <Input
            type="number"
            value={item.width}
            onChange={e => (item.width = Number(e.target.value))}
          />
          cm
        </div>
        <div>
          <span
            style={{
              background: colors[0],
              boxShadow: item.color === colors[0] ? '0 0 0 2px inset #00000030' : ''
            }}
            onClick={() => (item.color = colors[0])}
          />
          <span
            style={{
              background: colors[1],
              boxShadow: item.color === colors[1] ? '0 0 0 2px inset #00000030' : ''
            }}
            onClick={() => (item.color = colors[1])}
          />
          <span
            style={{
              background: colors[2],
              boxShadow: item.color === colors[2] ? '0 0 0 2px inset #00000030' : ''
            }}
            onClick={() => (item.color = colors[2])}
          />
          <span
            style={{
              background: colors[3],
              boxShadow: item.color === colors[3] ? '0 0 0 2px inset #00000030' : ''
            }}
            onClick={() => (item.color = colors[3])}
          />
          <span
            style={{
              background: colors[4],
              boxShadow: item.color === colors[4] ? '0 0 0 2px inset #00000030' : ''
            }}
            onClick={() => (item.color = colors[4])}
          />
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
    </Component>
  );
}
