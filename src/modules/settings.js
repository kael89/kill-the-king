import { THEME_NAME } from '../themes';
import { COLOR } from './chess';

const { WHITE } = COLOR;
const { LIGHT } = THEME_NAME;

/**
 * @type {Settings}
 */
export const DEFAULT_SETTINGS = {
  defaultTheme: LIGHT,
  maxMoves: 2,
  startingColor: WHITE,
};
