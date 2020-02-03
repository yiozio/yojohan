import * as React from 'react';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
  buttoncolor?: 'danger';
  children?: string;
};
type DOMProps = Props & {
  className?: string;
};

const DOM = (props: DOMProps) => <div {...props} />;

const Styled = styled(DOM)(
  {
    width: '100%',
    height: '40px',
    lineHeight: '40px',
    textAlign: 'center',
    background: '#fee',
    color: '#000',
    boxShadow: '3px 3px 0 0 #00000055, inset 0 0 0 1px #00000022',

    '&:hover': {
      filter: 'brightness(0.9)'
    },
    '&:focus,&:active': {
      filter: 'brightness(0.9)',
      boxShadow: '1px 1px 0 0 #00000080',
      transform: 'translateY(1px)'
    }
  },
  p => (p.buttoncolor === 'danger' ? { background: '#f00' } : undefined),
  p => (p.buttoncolor ? { color: '#fee' } : undefined)
);

export const base = Styled;

export default function Button(p: Props) {
  return <Styled {...p} />;
}
