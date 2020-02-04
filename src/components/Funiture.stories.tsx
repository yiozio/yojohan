import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, number, text, boolean } from '@storybook/addon-knobs';
import { FunitureAttrs } from '../defs';
import * as stores from '../stores/funitures';

import Funiture from './Funiture';

const defaultFuniture: FunitureAttrs = {
  name: 'Sample',
  x: 0,
  y: 0,
  width: 130,
  height: 55,
  color: '#F80',
  rotateDeg: 0
};

storiesOf('Funiture', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }) as (a: any) => any)
  .add('base', () => {
    stores.tatamiSize.set(number('Tatami Size', stores.tatamiSize.get()));
    stores.funitures.replace([{ ...defaultFuniture }]);
    const funiture = stores.funitures[0];
    funiture.name = text('Name', funiture.name);
    funiture.width = number('Width', funiture.width);
    funiture.height = number('Height', funiture.height);
    funiture.color = text('Color', funiture.color);
    funiture.rotateDeg = number('Rotate Degree', funiture.rotateDeg);
    const draggable = boolean('Draggable', true);

    return (
      <svg
        viewBox={`0 0 ${stores.tatamiSize.get() * 1.5} ${stores.tatamiSize.get() * 1.5}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          background: `url("data:image/svg+xml;charset=utf-8,%3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='66' height='66' viewBox='0 0 2 2' preserveAspectRatio='none'%3e%3cpath fill='%23eee' d='M-1-1v4h4v-4z'/%3e%3cpath fill='%23ccc' d='M0 0H1V1H0zM1 1H2V2H1z'/%3e%3c/svg%3e")`
        }}
      >
        <Funiture funitureIndex={0} draggable={draggable} />
      </svg>
    );
  });
