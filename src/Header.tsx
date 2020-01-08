import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

/** 畳の長辺の長さ(cm) */
export const tatamiSize = observable.box(88 * 2);

export default observer(Header);
function Header() {
  return (
    <div className="header">
      畳サイズ:
      <input
        type="number"
        value={tatamiSize.get()}
        onChange={v => tatamiSize.set(Number(v.target.value))}
      />
      cm
    </div>
  );
}
