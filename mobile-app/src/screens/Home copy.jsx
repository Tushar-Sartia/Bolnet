import React, { useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { COLORS } from '../utils/theme';
import DashWidgets from '../components/DashWidgets';
import BottomTab from '../navigation/BottomTab';
import HeaderBg from '../components/HeaderBg';
const Home = ({ navigation }) => {
  const [dashData, setDashData] = useState([
    { id: 'total earnings', value: 50000000, color: COLORS.COLOR_GREEN },
    { id: 'total invested', value: 50000, color: COLORS.COLOR_BLACK },
    { id: 'total products', value: 50, color: COLORS.COLOR_BLUE, isNumber: true },
    { id: "today's sale", value: 80000, color: COLORS.COLOR_BLUE },
    { id: "my today's profit", value: 40, color: COLORS.COLOR_GREEN },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBg />
      <FlatList
        data={dashData}
        keyExtractor={itm => itm.id}
        renderItem={({ item }) => (
          <DashWidgets
            title={item.id}
            value={item.value}
            color={item.color}
            isNumber={item.isNumber}
          />
        )}
      />
      <BottomTab />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.COLOR_GRAY_LIGHT,
  },
});
export default Home;
