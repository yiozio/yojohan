import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import Button from './Button';
import Buttons from './Buttons';

const Base = styled(Buttons)`
  margin-bottom: 5px;
`;

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }) as (a: any) => any)
  .add('base', () => (
    <Base>
      {Array.from(Array(number('Number of buttons', 3))).map((_, i) => (
        <Button key={i} onClick={action(`btn${i} clicked`)}>{`btn${i}`}</Button>
      ))}
    </Base>
  ));
