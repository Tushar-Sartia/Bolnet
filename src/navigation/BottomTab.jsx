import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {COLORS} from '../utils/theme';
import {ROUTES} from '../utils/routes';
import {Home, Plus, Shapes, ShoppingCart, User} from 'lucide-react-native';
const BottomTab = ({active = ROUTES.products}) => {
  const navigation = useNavigation();
  const [tabs, setTabs] = useState([
    {
      id: ROUTES.home,
      title: 'Home',
      icon: Home,
    },
    {
      id: ROUTES.products,
      title: 'Products',
      icon: Shapes,
    },
    {
      id: ROUTES.cart,
      title: 'Cart',
      icon: ShoppingCart,
    },
    {
      id: ROUTES.invest,
      title: 'Invest',
      icon: Plus,
    },
    {
      id: ROUTES.profile,
      title: 'Profile',
      icon: User,
    },
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <Pressable
              key={tab.id}
              style={{flex: 1}}
              onPress={() => navigation.navigate(tab.id)}>
              <View
                style={[
                  styles.tab,
                  {
                    backgroundColor:
                      active === tab.id
                        ? COLORS.PRIMARY_COLOR
                        : COLORS.BACKGROUND_COLOR_LIGHT,
                  },
                ]}>
                {
                  <Icon
                    color={
                      active === tab.id
                        ? COLORS.COLOR_WHITE
                        : COLORS.COLOR_BLACK
                    }
                    size={25}
                  />
                }
                <Text
                  style={{
                    color:
                      active === tab.id
                        ? COLORS.COLOR_WHITE
                        : COLORS.COLOR_BLACK,
                  }}>
                  {tab.title}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
  },
  tabs: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default BottomTab;
