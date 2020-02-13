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
    },
    '@keyframes bottomtoup': {
      from: { transform: 'translateY(100%)' },
      to: { transform: 'translateY(0)' }
    },
    '@keyframes uptobottom': {
      from: { transform: 'translateY(-100%)' },
      to: { transform: 'translateY(0)' }
    }
  },
  p => ({
    ...(p.position[0] === 'l' ? { left: '0' } : { right: '0' }),
    ...(p.position[p.position.length - 1] === 'p'
      ? { top: '0', animation: 'uptobottom .5s' }
      : { bottom: '0', animation: 'bottomtoup .5s' })
  })
);

export const className = Styled;

export default function Buttons(p: Props) {
  return <Styled {...p} />;
}
