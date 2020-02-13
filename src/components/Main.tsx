import * as React from 'react';
import { observer } from 'mobx-react';
import Preview from './Preview';
import Button from './Button';
import MenuButton from './MenuButton';
import Buttons from './Buttons';
import styled, { createGlobalStyle } from 'styled-components';
import { funitureColors } from '../defs';
import { funitures, tatamiSize, selection, save } from '../stores/funitures';

const GlobalStyle = createGlobalStyle({
  '@font-face': {
    fontFamily: 'PixelMPlus',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: 'url("/PixelMplus12-Regular.ttf") format("truetype")'
  },
  body: {
    fontFamily: 'PixelMPlus',
    fontSize: '12px',
    lineHeight: '12px',
    color: '#000',
    overflow: 'hidden'
  }
});

type DOMProps = {
  className?: string;
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

const DOM = ({ className, addItem, selectedActions }: DOMProps) => (
  <div className={className}>
    <GlobalStyle />
    <Preview />
    <Buttons position="rightbottom">
      <Button onClick={addItem}>
        <i className="fas fa-2x fa-plus" />
      </Button>
    </Buttons>
    {selectedActions ? (
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
                  [
                    <Button half="top" onClick={() => selectedActions.editSize.addValue(+10, 0)}>
                      +10
                    </Button>,
                    <Button half="top" onClick={() => selectedActions.editSize.addValue(+1, 0)}>
                      +1
                    </Button>,
                    <div>{selectedActions.editSize.value.width + 'cm'}</div>,
                    <Button half="bottom" onClick={() => selectedActions.editSize.addValue(-1, 0)}>
                      -1
                    </Button>,
                    <Button half="bottom" onClick={() => selectedActions.editSize.addValue(-10, 0)}>
                      -10
                    </Button>
                  ],
                  [<div>×</div>],
                  [
                    <Button half="top" onClick={() => selectedActions.editSize.addValue(0, +10)}>
                      +10
                    </Button>,
                    <Button half="top" onClick={() => selectedActions.editSize.addValue(0, +1)}>
                      +1
                    </Button>,
                    <div>{selectedActions.editSize.value.height + 'cm'}</div>,
                    <Button half="bottom" onClick={() => selectedActions.editSize.addValue(0, -1)}>
                      -1
                    </Button>,
                    <Button half="bottom" onClick={() => selectedActions.editSize.addValue(0, -10)}>
                      -10
                    </Button>
                  ]
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
              ? selectedActions.editColor.values.map(c => [
                  <Button
                    onClick={() => selectedActions.editColor.setValue(c)}
                    style={{
                      background: c,
                      border: `2px solid ${selectedActions.editColor.value === c ? '#AAA' : '#FFF'}`
                    }}
                  ></Button>
                ])
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
    ) : (
      undefined
    )}
  </div>
);

const Styled = styled(DOM)({
  width: '100%',
  height: '100%',
  position: 'relative',

  '& i': {
    lineHeight: '40px'
  }
});

export default observer(Main);
function Main() {
  const index = selection.get()?.index;
  return (
    <Styled
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
        selection.set({ index: funitures.length - 1 });
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
                selection.set({ index: funitures.length - 1 });
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
