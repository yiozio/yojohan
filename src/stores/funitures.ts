import { observable } from 'mobx';
import { FunitureAttrs } from '../defs';

export const selectedIndex = observable.box<number | undefined>();

const funituresJson = decodeURIComponent(location.search.substr(6));
export const funitures = observable<FunitureAttrs>(funituresJson ? JSON.parse(funituresJson) : []);

export const save = () => {
  const json = JSON.stringify(funitures.toJS());
  const newUrl = './?json=' + encodeURIComponent(json);
  window.history.pushState(null, '', newUrl);
};
