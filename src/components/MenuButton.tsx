import * as React from 'react';
import styled from 'styled-components';

import Button from './Button';

type Props = {
  className?: string;
  children?: string | JSX.Element;
  menu?: JSX.Element[][];
  onClick: () => void;
};
type DOMProps = Props;

const DOM = ({ className, menu, onClick, children }: DOMProps) => (
  <div className={className}>
    <Button {...{ onClick, children }} />
    <div>
      {menu?.map((elements, i) => (
        <div key={i}>{elements}</div>
      ))}
    </div>
  </div>
);

const Styled = styled(DOM)({
  position: 'relative',
  textShadow: '1px 1px 0 #FFF, -1px 1px 0 #FFF, 1px -1px 0 #FFF, -1px -1px 0 #FFF;',

  '& > div:last-child': {
    position: 'absolute',
    left: '40px',
    top: '20px',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    '& > div > div': {
      margin: '5px',
      textAlign: 'center'
    }
  }
});

export const className = Styled;

export default function MenuButton(p: Props) {
  return <Styled {...p} />;
}
