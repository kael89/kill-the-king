import { THEME_NAME } from '../themes';
import { COLOR } from './chess';

const { WHITE } = COLOR;
const { LIGHT } = THEME_NAME;

const DEFAULT_THEME = 'defaultTheme';
const MAX_MOVES = 'maxMoves';
const STARTING_COLOR = 'startingColor';

/**
 * @enum {string}
 */
export const SETTING_KEY = {
  DEFAULT_THEME,
  MAX_MOVES,
  STARTING_COLOR,
};

export const DEFAULT_SETTINGS = {
  [DEFAULT_THEME]: LIGHT,
  [MAX_MOVES]: 2,
  [STARTING_COLOR]: WHITE,
};
