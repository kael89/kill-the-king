import { APP_NAME } from '../../constants';
import { DEFAULT_SETTINGS } from '../../modules/settings';

/* Actions */
const SET_SETTING = `${APP_NAME}/settings/SET_SETTING`;

/* Reducer */
export default function reducer(settings = DEFAULT_SETTINGS, action) {
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
}

/* Action Creators */
export const setSetting = setting => ({
  setting,
  type: SET_SETTING,
});
