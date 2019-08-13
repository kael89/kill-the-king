import dark from './dark.json';
import light from './light.json';

/** @type {ThemeName} */
const DARK = 'dark';
/** @type {ThemeName} */
const LIGHT = 'light';

/**
 * @enum {ThemeName}
 */
export const THEME_NAME = {
  DARK,
  LIGHT,
};

export default {
  [DARK]: dark,
  [LIGHT]: light,
};
