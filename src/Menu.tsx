import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { items, save } from './Preview';
import Funiture from './Funiture';
import Button from './Button';
import FunitureEdit, { colors } from './FunitureEdit';

const Component = styled.div({
  position: 'absolute',
  right: 0,
  top: '35px',
  width: 'calc(100vw - 100vmin + 100px)',
  minWidth: '300px',
  height: 'calc(100vmin - 100px)',
  background: '#fee',

  '& svg > *': {
    transform: 'translate(0, 0)'
  },

  '@media (orientation: portrait)': {
    top: 'auto',
    bottom: 0,
    width: '100vw',
    height: 'calc(100% - 100vw - 35px)',
    minHeight: '140px'
  }
});
const FunitureList = styled.div({
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
const Svg = styled.svg({
  flex: '0 0 auto',
  width: '80px',
  height: '80px',
  padding: '3px',
  margin: '2px',
  background: '#FEE',

  '&:hover': { filter: 'brightness(0.9)' },
  '& > *': { transform: 'none' }
});
const Formatter = styled.div({
  width: '80px',
  height: 0,
  paddingLeft: '3px',
  paddingRight: '3px',
  marginLeft: '2px',
  marginRight: '2px',

  '@media (orientation: portrait)': {
    width: 0,
    padding: 0,
    margin: 0
  }
});
const Buttons = styled.div({
  display: 'flex',
  flexFlow: 'row nowrap',
  position: 'absolute',
  left: '10px',
  top: '5px',
  width: 'calc(100% - 20px)',

  '& > *': {
    flex: '1 1 auto',
    margin: '0 5px'
  },

  '@media (orientation: portrait)': {
    top: 'auto',
    bottom: '5px'
  }
});

export default observer(Menu);
function Menu() {
  const [index, select] = React.useState<null | number>(null);
  const [modal, setModal] = React.useState<null | JSX.Element>(null);

  return (
    <Component>
      <FunitureList>
        <div>
          {items.map((item, i) => (
            <Svg
              key={i}
              viewBox={`0 0 ${item.width} ${item.height}`}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={index === i ? { boxShadow: 'inset 0 0 0 3px #00000022' } : undefined}
              onClick={() => select(index === i ? null : i)}
            >
              {<Funiture funitureIndex={i} />}
            </Svg>
          ))}
          {Array.from(Array(20)).map((_, i) => (
            <Formatter key={'f' + i} />
          ))}
        </div>
      </FunitureList>
      <Buttons>
        {index === null ? (
          <Button
            onClick={() => {
              items.push({
                name: 'テーブル',
                color: colors[items.length % colors.length],
                x: 0,
                y: 0,
                width: 155,
                height: 65,
                rotateDeg: 0
              });

              setModal(
                <FunitureEdit
                  onClosed={() => {
                    select(null);
                    setModal(null);
                  }}
                  funitureIndex={items.length - 1}
                />
              );
            }}
          >
            ＋家具追加
          </Button>
        ) : (
          <>
            <Button
              onClick={() =>
                setModal(
                  <FunitureEdit
                    onClosed={() => {
                      select(null);
                      setModal(null);
                    }}
                    funitureIndex={index}
                  />
                )
              }
            >
              編集
            </Button>
            <Button onClick={() => items.push({ ...items[index] })}>コピー</Button>
            <Button
              buttonColor="danger"
              onClick={() => {
                items.remove(items[index]);
                select(null);
                save();
              }}
            >
              削除
            </Button>
          </>
        )}
      </Buttons>
      {modal}
    </Component>
  );
}
