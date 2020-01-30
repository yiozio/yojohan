import styled from 'styled-components';
import * as React from 'react';

type Props = React.ComponentPropsWithRef<'input'>;
type DOMProps = Props;

const DOM = (p: DOMProps) => <input {...p} />;

const Styled = styled(DOM)({
  '&[type="number"]': {
    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
      margin: 0,
      appearance: 'none'
    }
  }
});

export default function Input(p: Props) {
  return <Styled {...p} />;
}
