import { observable } from 'mobx';
import { FunitureAttrs } from '../defs';

/** 畳の長辺の長さ(cm) */
export const tatamiSize = observable.box(88 * 2);

export const selection = observable.box<
  { index: number; edit?: 'text' | 'size' | 'color'; isNew?: boolean } | undefined
>();

function getFunituresFromQuery(): FunitureAttrs[] {
  const json = (location.search.match(/(?:json=)([^&]*)/) || [])[1];
  return json !== undefined ? JSON.parse(decodeURIComponent(json)) : [];
}

export const funitures = observable<FunitureAttrs>(getFunituresFromQuery());

export let dragging = false;
export const setDragging = (onoff: boolean) => {
  dragging = onoff;
};

export const save = () => {
  const json = encodeURIComponent(JSON.stringify(funitures.toJS()));
  const oldSearch = location.search;
  const newSearch =
    oldSearch.length === 0
      ? `?json=${json}`
      : oldSearch.match(/(^\?|\&)json=/)
      ? oldSearch.replace(/(^\?|\&)json=[^&]*/, '$1json=' + json)
      : oldSearch + `&json=${json}`;
  window.history.pushState(null, '', './' + newSearch);
};
window.onpopstate = (e: PopStateEvent) => {
  selection.set(undefined);
  funitures.replace(getFunituresFromQuery());
};
