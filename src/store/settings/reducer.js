import { DEFAULT_SETTINGS } from '../../modules/settings';
import { SET_SETTING } from './actions';

export default (settings = DEFAULT_SETTINGS, action) => {
  switch (action.type) {
    case SET_SETTING: {
      const { setting } = action;
      const newSettings = { ...settings, ...setting };

      return newSettings;
    }
    default: {
      return settings;
    }
  }
};
