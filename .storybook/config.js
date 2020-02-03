import * as React from 'react';
import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';

addDecorator(s => (
  <>
    <style>{`
      @font-face {
        font-family: PixelMPlus;
        font-style: normal;
        font-weight: normal;
        src: url("/PixelMplus12-Regular.ttf") format("truetype");
      }

      #story-root {
        font-family: PixelMPlus;
        font-size: 12px;
        line-height: 12px;
        color: #000;
        overflow: hidden;
      }

      #story-root * {
        user-select: none;
        -webkit-user-select: none;
      }

      #story-root input {
        user-select: auto;
        -webkit-user-select: auto;
      }
    `}</style>
    {s()}
  </>
));

// automatically import all files ending in *.stories.tsx in src/components
const req = require.context('../src/components', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
