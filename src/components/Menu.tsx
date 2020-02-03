import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Button from './Button';
import FunitureEdit from './FunitureEdit';
import FunitureList from './FunitureList';
import Buttons, { className as buttonsClass } from './Buttons';
import { FunitureAttrs, funitureColors } from '../defs';
import { funitures, save, selectedIndex } from '../stores/funitures';

type DOMProps = {
  className?: string;
  selectedIndex?: number;
  modal?: JSX.Element;
  setModal: (modal?: JSX.Element) => void;
  reset: () => void;
  items: FunitureAttrs[];
  addItem: () => void;
  removeItem: () => void;
};

const DOM = (p: DOMProps) => (
  <div className={p.className}>
    <FunitureList />
    {p.selectedIndex === undefined ? (
      <Buttons>
        <Button
          onClick={() => {
            p.addItem();
            p.setModal(<FunitureEdit onClosed={p.reset} funitureIndex={funitures.length - 1} />);
          }}
        >
          ＋家具追加
        </Button>
      </Buttons>
    ) : (
      <Buttons>
        <Button
          onClick={() =>
            p.setModal(<FunitureEdit onClosed={p.reset} funitureIndex={p.selectedIndex || 0} />)
          }
        >
          編集
        </Button>
        <Button onClick={() => funitures.push({ ...funitures[p.selectedIndex || 0] })}>
          コピー
        </Button>
        <Button
          buttoncolor="danger"
          onClick={() => {
            funitures.remove(funitures[p.selectedIndex || 0]);
            p.reset();
          }}
        >
          削除
        </Button>
      </Buttons>
    )}
    {p.modal}
  </div>
);

const Styled = styled(DOM)({
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

  [`& > ${buttonsClass}`]: {
    position: 'absolute',
    left: '10px',
    top: '5px',
    width: 'calc(100% - 20px)',

    '@media (orientation: portrait)': {
      top: 'auto',
      bottom: '5px'
    }
  },

  '@media (orientation: portrait)': {
    top: 'auto',
    bottom: 0,
    width: '100vw',
    height: 'calc(100% - 100vw - 35px)',
    minHeight: '140px'
  }
});

export default observer(Menu);
function Menu() {
  const [modal, setModal] = React.useState<JSX.Element | undefined>(undefined);

  return (
    <Styled
      selectedIndex={selectedIndex.get()}
      modal={modal}
      setModal={setModal}
      reset={() => {
        selectedIndex.set(undefined);
        setModal(undefined);
        save();
      }}
      items={funitures}
      addItem={(item?: FunitureAttrs) =>
        funitures.push(
          item || {
            name: 'テーブル',
            color: funitureColors[funitures.length % funitureColors.length],
            x: 0,
            y: 0,
            width: 155,
            height: 65,
            rotateDeg: 0
          }
        )
      }
      removeItem={() => funitures.remove(funitures[selectedIndex.get() || 0])}
    />
  );
}
