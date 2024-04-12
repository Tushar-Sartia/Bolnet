import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Landmark, ShieldAlert, UserCog, UserPlus } from 'lucide-react-native';
import { COLORS } from '../../utils/theme';
import SettingsLinks from '../../components/SettingsLinks';
import { ROUTES } from '../../utils/routes';
import Button from '../../components/Button';
import { deleteAccountApi } from '../../services/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/auth/authSlice';
import Toast from 'react-native-toast-message';
const Settings = () => {
  const { user } = useSelector(selectUser)
  const dispatch = useDispatch()
  const [links] = useState([
    {
      id: ROUTES.profileSettings,
      title: 'Update Profile',
      icon: UserCog,
    },
    {
      id: ROUTES.password,
      title: 'Change Password',
      icon: ShieldAlert,
    },
    {
      id: ROUTES.nominee,
      title: 'Nominee details',
      icon: UserPlus,
    },
    {
      id: ROUTES.bank,
      title: 'Bank Account Settings',
      icon: Landmark,
    },
  ]);
  const handleDeleteAccount = async () => {
    const res = await deleteAccountApi(user?.id)
    if (res.status) {
      Toast.show({
        type: 'success',
        text2: res.message,
        position: 'bottom',
      });
      dispatch(logout())
    } else {
      Toast.show({
        type: 'error',
        text2: res.message,
        position: 'bottom',
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <SettingsLinks links={links} />
      <View
        style={{
          padding: 10,
        }}>
        <Button title={'Delete my account'} onPress={() => handleDeleteAccount()} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
  },
});
export default Settings;
