import * as React from 'react';
import { observer } from 'mobx-react';
import Preview from './Preview';
import FunitureEdit from './FunitureEdit';
import styled, { createGlobalStyle } from 'styled-components';

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
};

const DOM = ({ className }: DOMProps) => (
  <div className={className}>
    <GlobalStyle />
    <Preview />
    <FunitureEdit />
  </div>
);

const Styled = styled(DOM)({
  width: '100%',
  height: '100%',
  position: 'relative'
});

export default observer(Main);
function Main() {
  return <Styled />;
}
