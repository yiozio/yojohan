import { observable } from 'mobx';
import { FunitureAttrs } from '../defs';

/** 畳の長辺の長さ(cm) */
export const tatamiSize = observable.box(88 * 2);

export const selectedIndex = observable.box<number | undefined>();

const funituresJson = decodeURIComponent(location.search.substr(6));
export const funitures = observable<FunitureAttrs>(funituresJson ? JSON.parse(funituresJson) : []);

export const save = () => {
  const json = JSON.stringify(funitures.toJS());
  const newUrl = './?json=' + encodeURIComponent(json);
  window.history.pushState(null, '', newUrl);
};
