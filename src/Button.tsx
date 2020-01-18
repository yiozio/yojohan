import styled from 'styled-components';

interface Props {
  buttonColor?: 'danger';
}

export default styled.div<Props>(
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
  ({ buttonColor }: Props) => (buttonColor === 'danger' ? { background: '#f00' } : undefined),
  ({ buttonColor }: Props) => (buttonColor ? { color: '#fee' } : undefined)
);
