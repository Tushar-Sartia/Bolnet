import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, View, Text, RefreshControl, ScrollView } from 'react-native';
import { COLORS } from '../utils/theme';
import DashWidgets from '../components/DashWidgets';
import BottomTab from '../navigation/BottomTab';
import HeaderBg from '../components/HeaderBg';
import { dashboardApi, getPopularProducts } from '../services/userApi';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import { ROUTES } from '../utils/routes';
import ProductCard from '../components/ProductCard';
import PopularProduct from '../components/PopularProduct';
import { useIsFocused } from '@react-navigation/native';
const Home = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const [data, setData] = useState([]);
  const [popularProducts, setPopularProducts] = useState([])
  const isFocused = useIsFocused()
  const fetchPopularProducts = async (req, res) => {
    const popularProductRes = await getPopularProducts()
    if (popularProductRes?.status) {
      setPopularProducts(popularProductRes?.data)
    }
    else {
      setPopularProducts([])
    }
  }

  const dashData = [
    {
      id: 'total earnings',
      value: data?.total_earnings || 0,
      color: COLORS.COLOR_GREEN,
    },
    {
      id: 'total invested',
      value: data?.totalInvest || 0,
      color: COLORS.COLOR_BLACK,
    },
    {
      id: 'total products',
      value: data?.totalProduct || 0,
      color: COLORS.COLOR_BLUE,
      isNumber: true,
    },
    {
      id: "today's sale",
      value: data?.getSellValue || 0,
      color: COLORS.COLOR_BLUE,
    },
    {
      id: "my today's profit",
      value: data?.todayErning || 0,
      color: COLORS.COLOR_GREEN,
    },
  ];

  const fetchAllData = async () => {
    const res = await dashboardApi(user?.id);
    if (res.status) {
      setData(res.data);
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    fetchAllData();
    fetchPopularProducts()
  }, [isFocused]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <HeaderBg />
        <ScrollView>
          <FlatList
            data={dashData}
            keyExtractor={itm => itm.id}
            numColumns={2}
            renderItem={({ item }) => (
              <DashWidgets
                title={item.id}
                value={item.value}
                color={item.color}
                isNumber={item.isNumber}
              />
            )}
          />
          <Text style={styles.titleStyle}>Popular Products</Text>
          <FlatList
            data={popularProducts}
            keyExtractor={itm => itm.id}
            renderItem={({ item, index }) => <PopularProduct item={item} idx={index} navigation={navigation} />}
            refreshControl={<></>
              // <RefreshControl refreshing={isLoading} onRefresh={fetchAllProducts} />
            }
          />
        </ScrollView>
        <BottomTab active={ROUTES.home} />
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.COLOR_GRAY_LIGHT,
  },
  titleStyle: {
    marginTop: 10,
    fontSize: 18,
    color: COLORS.COLOR_BLACK,
    marginLeft: 10,
    fontWeight: '500'
  }
});
export default Home;
