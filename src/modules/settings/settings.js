import { COLOR } from 'Modules/chess';
import { THEME_NAME } from 'Themes';

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
