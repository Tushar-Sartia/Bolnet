import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, View, Text, RefreshControl, ScrollView } from 'react-native';
import { COLORS } from '../utils/theme';
import DashWidgets from '../components/DashWidgets';
import BottomTab from '../navigation/BottomTab';
import HeaderBg from '../components/HeaderBg';
import { dashboardApi } from '../services/userApi';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import { ROUTES } from '../utils/routes';
import ProductCard from '../components/ProductCard';
import PopularProduct from '../components/PopularProduct';
const Home = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const [data, setData] = useState([]);

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
  const productData = [
    {
      id: 1,
      title: 'Chimney',
      price: 12000,
      oldPrice: 18000,
      image: 'public/uploads/products/images/PRODUCTS PHOTO 54_page-0017(1).jpg',
      color: COLORS.COLOR_GREEN,
      data: {
        name: "Filterless Autoclean Chimney",
        qty: 1,
        details: "Powerful Suction Of 1,300 m³/h Which Keeps Your Kitchen Smoke & Odor Free.",
        warranty: 1,
        freeDelivery: true,
        replacementDuration: 30,
        features: [{
          id: 1,
          title: 'Low Maintenance Chimney With Heat Auto Clean'
        }, {
          id: 2,
          title: 'Filterless Technology And Durable Stainless Steel Large Oil Cup, Guarantee Top-Notch Filtration.'
        }, {
          id: 3,
          title: 'The 3-Speed Control Feature Provides Precise Airflow Adjustments For All Kinds Of Cooking'
        }
        ],
        specification: {
          productDimensions: '53D * 90W * 48H cm',
          color: 'Black',
          finishType: 'Black Powder coated Body with curved Class Design '
        },
        reviews: [{
          id: 1,
          name: 'Rajesh singh',
          icon: 'public/uploads/products/images/PRODUCTS PHOTO 54_page-0017(1).jpg',
          rating: 5,
          review: `Low Maintenance Chimney With Heat Auto Clean Filterless Technology And Durable Stainless Steel Large Oil Cup, Guarantee Top-Notch Filtration.`,
          date: '25 march 2024'
        },
        ],
      }
    },
    {
      id: 2,
      title: 'Table Fan',
      price: 5000,
      image: 'public/uploads/products/images/PRODUCTS PHOTO 54_page-0047(1).jpg',
      color: COLORS.COLOR_GREEN,
      data: {
        name: "Filterless Autoclean Chimney",
        qty: 1,
        details: "Powerful Suction Of 1,300 m³/h Which Keeps Your Kitchen Smoke & Odor Free.",
        warranty: 1,
        freeDelivery: true,
        replacementDuration: 30,
        features: [{
          id: 1,
          title: 'Low Maintenance Chimney With Heat Auto Clean'
        }, {
          id: 2,
          title: 'Filterless Technology And Durable Stainless Steel Large Oil Cup, Guarantee Top-Notch Filtration.'
        }, {
          id: 3,
          title: 'The 3-Speed Control Feature Provides Precise Airflow Adjustments For All Kinds Of Cooking'
        }
        ],
        specification: {
          productDimensions: '53D*90W*48H cm',
          color: 'Black',
          finishType: 'Black Powder coated Body with curved Body '
        },
        reviews: [{
          id: 1,
          name: 'Rajesh singh',
          rating: 5,
          review: 'Low Maintenance Chimney With Heat Auto Clean',
          date: '25 march 2024'
        },
        ]
      }
    },
    {
      id: 3,
      title: 'Gas Stove',
      price: 5000,
      oldPrice: 7000,
      image: 'public/uploads/products/images/PRODUCTS PHOTO 54_page-0020(1).jpg',
      color: COLORS.COLOR_GREEN,
      data: {
        name: "Filterless Autoclean Chimney",
        qty: 1,
        details: "Powerful Suction Of 1,300 m³/h Which Keeps Your Kitchen Smoke & Odor Free.",
        warranty: 1,
        freeDelivery: true,
        replacementDuration: 30,
        features: [{
          id: 1,
          title: 'Low Maintenance Chimney With Heat Auto Clean'
        }, {
          id: 2,
          title: 'Filterless Technology And Durable Stainless Steel Large Oil Cup, Guarantee Top-Notch Filtration.'
        }, {
          id: 3,
          title: 'The 3-Speed Control Feature Provides Precise Airflow Adjustments For All Kinds Of Cooking'
        }
        ],
        specification: {
          productDimensions: '53D*90W*48H cm',
          color: 'Black',
          finishType: 'Black Powder coated Body with curved Body '
        },
        reviews: [{
          id: 1,
          name: 'Rajesh singh',
          rating: 5,
          review: 'Low Maintenance Chimney With Heat Auto Clean',
          date: '25 march 2024'
        },
        ],
      }
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
  }, []);

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
            data={productData}
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
