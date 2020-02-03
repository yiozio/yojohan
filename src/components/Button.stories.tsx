import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { base } from './Button';

const Button = styled(base)`
  width: calc(100% - 10px);
  margin: 5px;
`;

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }) as (a: any) => any)
  .add('default', () => (
    <Button
      onClick={action('clicked')}
      buttoncolor={select('Color', { Default: undefined, Danger: 'danger' }, undefined)}
    >
      {text('Text', 'sample')}
    </Button>
  ))
  .add('danger', () => (
    <Button onClick={action('clicked')} buttoncolor="danger">
      {text('Text', 'sample')}
    </Button>
  ));
