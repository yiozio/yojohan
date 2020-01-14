import * as React from 'react';
import { observer } from 'mobx-react';
import { items } from './Preview';
import Item, { ItemAttrs } from './Item';

export default observer(Menu);
function Menu() {
  const [index, select] = React.useState<null | number>(null);
  const [modal, setModal] = React.useState<null | JSX.Element>(null);

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
              className={index === i ? 'select' : ''}
              onClick={() => select(index === i ? null : i)}
            >
              {<Item item={items[i]} />}
            </svg>
          ))}
          {Array.from(Array(20)).map((_, i) => (
            <div key={'f' + i} className="formatter" />
          ))}
        </div>
      </div>
      {index === null ? (
        <div
          className="button"
          onClick={() => {
            items.push({
              name: 'テーブル',
              color: colors[items.length % colors.length],
              x: 0,
              y: 0,
              width: 155,
              height: 65,
              rotateDeg: 0
            });

            setModal(
              <Modal
                onClosed={() => {
                  select(null);
                  setModal(null);
                }}
                item={items[items.length - 1]}
              />
            );
          }}
        >
          ＋家具追加
        </div>
      ) : (
        <div className="buttons">
          <div
            className="button"
            onClick={() =>
              setModal(
                <Modal
                  onClosed={() => {
                    select(null);
                    setModal(null);
                  }}
                  item={items[index]}
                />
              )
            }
          >
            編集
          </div>
          <div className="button" onClick={() => items.push({ ...items[index] })}>
            コピー
          </div>
          <div
            className="button"
            onClick={() => {
              items.remove(items[index]);
              select(null);
            }}
          >
            削除
          </div>
        </div>
      )}
      {modal}
    </div>
  );
}

const colors = ['#076572', '#008496', '#09AA91', '#44C876', '#CCE574'];
const Modal = observer(_Modal);
function _Modal({ item, onClosed }: { item: ItemAttrs; onClosed: () => void }) {
  return (
    <div className="modal">
      <div className="edit">
        <div>
          名称:
          <input type="text" value={item.name} onChange={e => (item.name = e.target.value)} />
        </div>
        <div>
          奥行:
          <input
            type="number"
            value={item.height}
            onChange={e => (item.height = Number(e.target.value))}
          />
          cm
        </div>
        <div>
          幅:&nbsp;&nbsp;
          <input
            type="number"
            value={item.width}
            onChange={e => (item.width = Number(e.target.value))}
          />
          cm
        </div>
        <div>
          <span
            style={{
              background: colors[0],
              boxShadow: item.color === colors[0] ? '0 0 0 2px inset #00000030' : ''
            }}
            onClick={() => (item.color = colors[0])}
          />
          <span
            style={{
              background: colors[1],
              boxShadow: item.color === colors[1] ? '0 0 0 2px inset #00000030' : ''
            }}
            onClick={() => (item.color = colors[1])}
          />
          <span
            style={{
              background: colors[2],
              boxShadow: item.color === colors[2] ? '0 0 0 2px inset #00000030' : ''
            }}
            onClick={() => (item.color = colors[2])}
          />
          <span
            style={{
              background: colors[3],
              boxShadow: item.color === colors[3] ? '0 0 0 2px inset #00000030' : ''
            }}
            onClick={() => (item.color = colors[3])}
          />
          <span
            style={{
              background: colors[4],
              boxShadow: item.color === colors[4] ? '0 0 0 2px inset #00000030' : ''
            }}
            onClick={() => (item.color = colors[4])}
          />
        </div>
        <div className="button" onClick={() => onClosed()}>
          決定
        </div>
      </div>
    </div>
  );
}
