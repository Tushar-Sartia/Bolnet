import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {COLORS} from '../utils/theme';
import {
  BadgeHelp,
  FileKey,
  HeartHandshake,
  Info,
  LayoutDashboard,
  Package,
  Share2,
  UserCog,
  Wallet2,
} from 'lucide-react-native';
import {ROUTES} from '../utils/routes';
import Button from '../components/Button';
import SettingsLinks from '../components/SettingsLinks';
import {useDispatch} from 'react-redux';
import {logout} from '../features/auth/authSlice';
const Profile = () => {
  const dispatch = useDispatch();

  const [links] = useState([
    // {
    //   id: ROUTES.home,
    //   title: 'Dashboard',
    //   icon: LayoutDashboard,
    // },
    {
      id: ROUTES.settings,
      title: 'Account Settings',
      icon: UserCog,
    },
    {
      id: ROUTES.order,
      title: 'My Orders ',
      icon: Package,
    },
    {
      id: ROUTES.wallet,
      title: 'Investor Wallet',
      icon: Wallet2,
    },
    {
      id: ROUTES.help,
      title: 'Get Help',
      icon: BadgeHelp,
    },
    {
      id: ROUTES.about,
      title: 'About',
      icon: Info,
    },
    {
      id: ROUTES.terms,
      title: 'Terms & Condition',
      icon: HeartHandshake,
    },
    {
      id: ROUTES.privacy,
      title: 'Privacy Policy',
      icon: FileKey,
    },
    // {
    //   id: ROUTES.share,
    //   title: 'Share',
    //   icon: Share2,
    // },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <SettingsLinks links={links} />
      <View
        style={{
          padding: 10,
        }}>
        <Button title={'Logout'} onPress={() => dispatch(logout())} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.COLOR_GRAY_LIGHT,
  },
});
export default Profile;
