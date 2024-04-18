import {View} from 'react-native';
import {COLORS} from '../utils/theme';

export const Seperator = () => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: COLORS.COLOR_GRAY,
      }}
    />
  );
};
