import { APP_NAME, DefaultSettings } from '../../constants';
import { SettingKey } from '../../enums';

/* Actions */
const SET_SETTING = `${APP_NAME}/settings/SET_SETTING`;

const defaultSettings = {
  [SettingKey.MAX_MOVES]: DefaultSettings[SettingKey.MAX_MOVES],
  [SettingKey.STARTING_COLOR]: DefaultSettings[SettingKey.STARTING_COLOR],
};

/* Reducer */
export default function reducer(settings = defaultSettings, action) {
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
