import * as React from 'react';
import { observer } from 'mobx-react';
import { items } from './Preview';
import Item from './Item';

export default observer(Menu);
function Menu() {
  return (
    <div className="menu">
      <div className="list">
        <div>
          {items.map((item, i) => (
            <svg
              key={i}
              viewBox={`0 0 ${item.width} ${item.height}`}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              {<Item index={i} />}
            </svg>
          ))}
          {Array.from(Array(20)).map((_, i) => (
            <div key={'f' + i} className="formatter" />
          ))}
        </div>
      </div>
      <div
        className="button"
        onClick={() => {
          items.push({
            name: '',
            color: ['blue', 'red'][items.length % 2],
            x: 10 * items.length,
            y: 10 * items.length,
            width: 30,
            height: 50,
            rotateDeg: 0
          });
        }}
      >
        ＋家具追加
      </div>
    </div>
  );
}
