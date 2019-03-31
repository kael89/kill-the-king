import { combineReducers } from 'redux';

import board from './modules/board';
import moveHistory from './modules/moveHistory';
import results from './modules/results';
import settings from './modules/settings';
import ui from './modules/ui';

export default combineReducers({ board, results, moveHistory, settings, ui });
