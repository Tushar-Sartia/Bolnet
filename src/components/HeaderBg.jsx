import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../utils/theme';
const HeaderBg = () => {
  return <View style={styles.headerBg} />;
};
const styles = StyleSheet.create({
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: COLORS.PRIMARY_COLOR,
    height: 130,
    transform: [{ rotate: '-5deg' }, { translateY: -50 }, { translateX: -10 }],
    width: '110%',
  },
});
export default HeaderBg;
