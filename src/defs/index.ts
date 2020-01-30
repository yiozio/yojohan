/** 家具の取り得る配色一覧 */
export const funitureColors = ['#076572', '#008496', '#09AA91', '#44C876', '#CCE574'];
/** 背景となる畳図柄の向き */
export const tatamiPattern = { V: 'tatamiV', H: 'tatamiH' };
/** 家具の配置に必要なパラメータ */
export interface FunitureAttrs {
  name: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotateDeg: number;
}
