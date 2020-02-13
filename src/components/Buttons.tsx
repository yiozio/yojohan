import * as React from 'react';
import styled from 'styled-components';

type Props = {
  children?: JSX.Element | JSX.Element[];
  position: 'lefttop' | 'leftbottom' | 'righttop' | 'rightbottom';
};
type DOMProps = Props & {
  className?: string;
};

const DOM = ({ className, children }: DOMProps) => <div {...{ className, children }} />;

const Styled = styled(DOM)(
  {
    position: 'absolute',

    '& > *': {
      margin: '10px'
    }
  },
  p => ({
    ...(p.position[0] === 'l' ? { left: '0' } : { right: '0' }),
    ...(p.position[p.position.length - 1] === 'p' ? { top: '0' } : { bottom: '0' })
  })
);

export const className = Styled;

export default function Buttons(p: Props) {
  return <Styled {...p} />;
}
