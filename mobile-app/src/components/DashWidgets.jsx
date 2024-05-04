import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { moneyFormat, numberFormat } from '../utils/formatter';
import { COLORS } from '../utils/theme';
const DashWidgets = ({ color, title, value, isNumber = false }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.earningContainer}>
      <View style={styles.earningBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.earningText, { color }]}>
          {isNumber ? numberFormat(value) : moneyFormat(value)}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  earningContainer: {
    flex: 1,
  },
  earningBox: {
    backgroundColor: COLORS.COLOR_WHITE,
    margin: 10,
    alignItems: 'center',
    paddingVertical: 50,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.0,
    elevation: 4,
    borderRadius: 10,
  },
  title: {
    textTransform: 'capitalize',
  },
  earningText: {
    fontWeight: 'bold',
    color: COLORS.COLOR_GREEN,
    fontSize: 30,
    alignItems: 'center',
    textAlign: 'center',
  },
});
export default DashWidgets;
