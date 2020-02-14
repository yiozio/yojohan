import * as React from 'react';
import { observer } from 'mobx-react';
import Button from './Button';
import MenuButton from './MenuButton';
import Buttons from './Buttons';
import styled from 'styled-components';
import { funitureColors } from '../defs';
import { funitures, selection, tatamiSize, save } from '../stores/funitures';

type DOMProps = {
  className?: string;
  zeroItem?: boolean;
  addItem: () => void;
  selectedActions?: {
    editText: () => void;
    editSize: {
      enable: boolean;
      toggle: () => void;
      value: { width: number; height: number };
      addValue: (addWidth: number, addHeight: number) => void;
    };
    editColor: {
      enable: boolean;
      toggle: () => void;
      values: string[];
      value: string;
      setValue: (color: string) => void;
    };
    copy: () => void;
    remove: () => void;
  };
};

const DOM = ({ className, zeroItem, addItem, selectedActions }: DOMProps) => (
  <div className={className}>
    <Buttons position="rightbottom">
      <Button onClick={addItem} appeal={zeroItem}>
        <i className="fas fa-2x fa-plus" />
      </Button>
    </Buttons>
    {selectedActions === undefined ? (
      undefined
    ) : (
      <Buttons position="leftbottom">
        <Button onClick={selectedActions.editText}>
          <i className="fas fa-2x fa-font" />
        </Button>
        <MenuButton
          className={className}
          onClick={selectedActions.editSize.toggle}
          menu={
            selectedActions.editSize.enable
              ? [
                  <>
                    <Button half="top" onClick={() => selectedActions.editSize.addValue(+10, 0)}>
                      +10
                    </Button>
                    <Button half="top" onClick={() => selectedActions.editSize.addValue(+1, 0)}>
                      +1
                    </Button>
                    <div>{selectedActions.editSize.value.width + 'cm'}</div>
                    <Button half="bottom" onClick={() => selectedActions.editSize.addValue(-1, 0)}>
                      -1
                    </Button>
                    <Button half="bottom" onClick={() => selectedActions.editSize.addValue(-10, 0)}>
                      -10
                    </Button>
                  </>,
                  <div>×</div>,
                  <>
                    <Button half="top" onClick={() => selectedActions.editSize.addValue(0, +10)}>
                      +10
                    </Button>
                    <Button half="top" onClick={() => selectedActions.editSize.addValue(0, +1)}>
                      +1
                    </Button>
                    <div>{selectedActions.editSize.value.height + 'cm'}</div>
                    <Button half="bottom" onClick={() => selectedActions.editSize.addValue(0, -1)}>
                      -1
                    </Button>
                    <Button half="bottom" onClick={() => selectedActions.editSize.addValue(0, -10)}>
                      -10
                    </Button>
                  </>
                ]
              : undefined
          }
        >
          <i className="fas fa-2x fa-expand-arrows-alt" />
        </MenuButton>
        <MenuButton
          onClick={selectedActions.editColor.toggle}
          menu={
            selectedActions.editColor.enable
              ? selectedActions.editColor.values.map(c => (
                  <Button
                    onClick={() => selectedActions.editColor.setValue(c)}
                    style={{
                      background: c,
                      border: `2px solid ${selectedActions.editColor.value === c ? '#AAA' : '#FFF'}`
                    }}
                  ></Button>
                ))
              : undefined
          }
        >
          <i className="fas fa-2x fa-palette" />
        </MenuButton>
        <Button onClick={selectedActions.copy}>
          <i className="fas fa-2x fa-clone" />
        </Button>
        <Button onClick={selectedActions.remove}>
          <i className="fas fa-2x fa-trash-alt" />
        </Button>
      </Buttons>
    )}
  </div>
);

const Styled = styled(DOM)({
  '& i': {
    lineHeight: '40px'
  }
});

export default observer(FunitureEdit);
function FunitureEdit() {
  const index = selection.get()?.index;
  return (
    <Styled
      zeroItem={funitures.length === 0}
      addItem={() => {
        funitures.push({
          name: 'テーブル',
          color: funitureColors[funitures.length % funitureColors.length],
          x: (tatamiSize.get() * 1.5) / 2,
          y: (tatamiSize.get() * 1.5) / 2,
          width: 155,
          height: 65,
          rotateDeg: 0
        });
        selection.set({ index: funitures.length - 1, isNew: true });
        save();
      }}
      selectedActions={
        index === undefined
          ? undefined
          : {
              editText: () => {
                if (selection.get()?.edit === 'text') {
                  selection.set({ index });
                } else {
                  selection.set({ index, edit: 'text' });
                }
              },
              editSize: {
                enable: selection.get()?.edit === 'size',
                toggle: () => {
                  if (selection.get()?.edit === 'size') {
                    selection.set({ index });
                  } else {
                    selection.set({ index, edit: 'size' });
                  }
                },
                value: {
                  width: funitures[index].width,
                  height: funitures[index].height
                },
                addValue: (w, h) => {
                  funitures[index].width += w;
                  funitures[index].height += h;
                  save();
                }
              },
              editColor: {
                enable: selection.get()?.edit === 'color',
                toggle: () => {
                  if (selection.get()?.edit === 'color') {
                    selection.set({ index });
                  } else {
                    selection.set({ index, edit: 'color' });
                  }
                },
                values: funitureColors,
                value: funitures[index].color,
                setValue: c => {
                  funitures[index].color = c;
                  save();
                }
              },
              copy: () => {
                funitures.push({ ...funitures[index] });
                selection.set({ index: funitures.length - 1, isNew: true });
                save();
              },
              remove: () => {
                funitures.remove(funitures[index]);
                selection.set(undefined);
                save();
              }
            }
      }
    />
  );
}
