import * as React from 'react';
import styled from 'styled-components';

type Props = {
  children?: JSX.Element | JSX.Element[];
};
type DOMProps = Props & {
  className?: string;
};

const DOM = (props: DOMProps) => <div {...props} />;

const Styled = styled(DOM)({
  display: 'flex',
  flexFlow: 'row nowrap',

  '& > *': {
    flex: '1 1 auto',
    margin: '0 5px'
  }
});

export const className = Styled;

export default function Buttons(p: Props) {
  return <Styled {...p} />;
}
