import { APP_NAME, DefaultSettings } from '../../constants';
import { SettingKey } from '../../enums';

/* Actions */
const SET_SETTING = `${APP_NAME}/settings/SET_SETTING`;

/* Reducer */
export default function reducer(settings = DefaultSettings, action) {
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
