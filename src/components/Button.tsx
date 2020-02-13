import * as React from 'react';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
  children?: string | JSX.Element;
  half?: 'top' | 'bottom';
  appeal?: boolean;
  style?: React.HTMLAttributes<HTMLDivElement>['style'];
};
type DOMProps = Props & {
  className?: string;
};

const DOM = ({ className, onClick, children, style }: DOMProps) => (
  <div {...{ className, onClick, children, style }} />
);

const Styled = styled(DOM)(
  {
    width: '40px',
    height: '40px',
    lineHeight: '40px',
    borderRadius: '20px',
    textAlign: 'center',
    background: '#fff',
    color: '#000',
    boxShadow: '1px 1px 0 0 #00000055',
    boxSizing: 'border-box',

    '&:hover': {
      filter: 'brightness(0.9)'
    },
    '&:focus,&:active': {
      filter: 'brightness(0.9)',
      boxShadow: 'none',
      transform: 'translateY(1px)'
    },
    '@keyframes appeal': {
      '78%': { transform: 'rotate(0deg)' },
      '80%': { transform: 'rotate(30deg)' },
      '84%': { transform: 'rotate(-30deg)' },
      '88%': { transform: 'rotate(25deg)' },
      '92%': { transform: 'rotate(-25deg)' },
      '96%': { transform: 'rotate(20deg)' }
    }
  },
  p =>
    p.half
      ? {
          height: '20px',
          lineHeight: '20px',
          borderRadius: p.half === 'top' ? '20px 20px 0 0' : '0 0 20px 20px'
        }
      : undefined,
  p =>
    p.appeal
      ? {
          '& > i': { animation: `appeal 4s linear infinite` }
        }
      : undefined
);

export const className = Styled;

export default function Button(p: Props) {
  return <Styled {...p} />;
}
