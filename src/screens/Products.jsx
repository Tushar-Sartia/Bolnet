import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../utils/theme';
import HeaderBg from '../components/HeaderBg';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../services/userApi';
import BottomTab from '../navigation/BottomTab';
import { ROUTES } from '../utils/routes';
const Products = ({ navigation }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchAllProducts = async () => {
    setIsLoading(true);
    const res = await getAllProducts();
    if (res.status) {
      setAllProducts(res.data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBg />{console.log(allProducts)}
      <FlatList
        data={allProducts}
        keyExtractor={itm => itm.id}
        renderItem={({ item, index }) => <ProductCard item={item} idx={index} navigation={navigation} />}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchAllProducts} />
        }
      />
      <BottomTab active={ROUTES.products} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
  },
});
export default Products;
